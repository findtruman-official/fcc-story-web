import {
  ChainType,
  WalletAutoConnectType,
  WalletEvents,
  WalletProvider,
  WalletType,
} from '@/wallets/index';
import {
  getPublicKey,
  isAllowed,
  isConnected,
  requestAccess,
  setAllowed,
  signBlob,
  signTransaction,
} from '@stellar/freighter-api';
import { message } from 'antd';
import BigNumber from 'bignumber.js';
import { Buffer } from 'buffer';
import { Base64 } from 'js-base64';
import * as _ from 'lodash';
import { Client as NftClient, networks as nftNetworks } from 'nft_contract';
import { Client, networks, StoryNftInfo } from 'story_factory';

const Network = process.env.NODE_ENV === 'production' ? 'PUBLIC' : 'TESTNET';
const RpcUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://rpc.ankr.com/stellar_soroban/55fa8acd4f07f9e87a2ffea1bb912a574a7c6d68daa1292af4cfd688b5e171df'
    : 'https://soroban-testnet.stellar.org:443';

export class FreighterWalletProvider implements WalletProvider {
  providerType: WalletType = WalletType.Freighter;
  chainType: ChainType = ChainType.Stellar;
  provider: any;
  // web3?: Web3;
  contract?: Client;
  // findsContract?: Contract;
  account: string = '';
  factoryAddress: string = '';
  findsMintAddress: string = '';

  onConnect?: (payload: { address: string; pubKey?: string }) => void;
  onDisconnect?: () => void;
  onAccountChanged?: (payload: { address: string; pubKey?: string }) => void;
  onChainChanged?: (chainId: string) => void;

  constructor(
    { onConnect, onDisconnect, onAccountChanged, onChainChanged }: WalletEvents,
    factoryAddress: string,
    findsMintAddress: string,
  ) {
    this.factoryAddress = factoryAddress;
    this.findsMintAddress = findsMintAddress;
    // this.provider = this.getProvider<any>();
    this.onConnect = onConnect || (() => {});
    this.onDisconnect = onDisconnect || (() => {});
    this.onAccountChanged = onAccountChanged || (() => {});
    this.onChainChanged = onChainChanged || (() => {});
  }

  getProvider<T>(): T | undefined {
    return undefined;
  }

  async isAvailable() {
    return await isConnected();
  }

  openWebsite() {
    window.open('https://www.freighter.app/', '_blank', 'noreferrer noopener');
  }

  setAutoConnect(autoConnect: WalletAutoConnectType) {
    localStorage.setItem('FREIGHTER_AUTO_CONNECT', autoConnect);
  }

  getAutoConnect(): boolean {
    const storage = localStorage.getItem('FREIGHTER_AUTO_CONNECT');
    return storage ? storage === WalletAutoConnectType.True : false;
  }

  async silentConnect(): Promise<string | undefined> {
    try {
      const pubKey = await getPublicKey();
      if (pubKey) {
        this.account = pubKey;
        this.contract = new Client({
          ...networks.testnet,
          networkPassphrase: 'Public Global Stellar Network ; September 2015',
          contractId: this.factoryAddress,
          rpcUrl: RpcUrl,
          publicKey: pubKey,
        });
        this.onConnect!({ address: pubKey });
      }
      return pubKey;
    } catch (e) {}
  }

  async connect() {
    if ((await isAllowed()) || (await setAllowed())) {
      try {
        const pubKey = await requestAccess();
        this.onConnect!({ address: pubKey });
        this.account = pubKey;
        this.contract = new Client({
          ...networks.testnet,
          networkPassphrase: 'Public Global Stellar Network ; September 2015',
          contractId: this.factoryAddress,
          rpcUrl: RpcUrl,
          publicKey: pubKey,
        });
        this.setAutoConnect(WalletAutoConnectType.True);
        return pubKey;
      } catch (error) {
        message.error((error as any).message);
      }
    }
  }

  async disconnect() {
    this.setAutoConnect(WalletAutoConnectType.False);
    this.onDisconnect?.();
  }

  async signMessage(message: string) {
    const buffer: any = await signBlob(Base64.encode(message));
    return JSON.stringify(buffer.data);
  }

  async updateStory(id: string, cid: string) {
    const tx = await this.contract!.update_story({
      from: this.account,
      story_id: Number(id),
      cid,
    });
    await tx.signAndSend({ signTransaction });
  }
  async publishStory(cid: string) {
    const tx = await this.contract!.publish_story({
      from: this.account,
      cid,
    });
    const { result } = await tx.signAndSend({ signTransaction });
    return `${Number(result.value)}`;
  }

  async getMintDecimals() {
    return 7;
  }

  async publishStoryNft(
    id: string,
    price: number,
    total: number,
    reserved: number,
    metadata: {
      name: string;
      desc: string;
      img: string;
    },
    uriPrefix: string,
  ) {
    const decimals = await this.getMintDecimals();
    const _price = new BigNumber(price)
      .times(new BigNumber(10).pow(new BigNumber(decimals)))
      .toNumber();
    const tx = await this.contract!.publish_nft({
      from: this.account,
      story_id: Number(id),
      name: metadata.name,
      image: metadata.img,
      description: metadata.desc,
      uri_prefix: uriPrefix,
      price: _price,
      total: total,
      author_reserve: reserved,
      wasm_hash: Buffer.from(this.findsMintAddress, 'hex'),
    });
    await tx.signAndSend({ signTransaction });
  }

  async mintStoryNft(
    id: string,
    author: string,
    price: string,
    nftSaleAddr: string,
    onInsufficientFinds?: (account: string, amount: string) => void,
  ) {
    const tx = await this.contract!.mint_nft({
      from: this.account,
      story_id: Number(id),
    });
    await tx.signAndSend({ signTransaction });
  }

  async getStoryNftInfo(storyId: number | string): Promise<StoryNftInfo> {
    const { result } = await this.contract!.get_state();
    const data = result.story_nft.find(
      (e: any) => Number(e[0]) === Number(storyId),
    );
    return data?.[1];
  }

  async balanceOfStoryNft(account: string, nftName: string, storyId: string) {
    const nftContract = await this.getStoryNftContract(storyId);
    const { result } = await nftContract.balance_of({
      owner: account,
    });
    return Number(result);
  }

  async restOfStoryNftOnChain(nftName: string, storyId: string) {
    const storyInfo = await this.getStoryNftInfo(storyId);
    if (storyInfo) {
      const { author_reserve, total, sold } = storyInfo;
      return total - author_reserve - sold;
    }
    return 0;
  }

  async getNftAddress(storyId: string) {
    const nftInfo = await this.getStoryNftInfo(storyId);
    if (nftInfo) {
      return nftInfo.nft_addr;
    }
    return '';
  }

  async getStoryNftContract(storyId: string): Promise<NftClient> {
    const nftAddr = await this.getNftAddress(storyId);
    return new NftClient({
      ...nftNetworks.testnet,
      networkPassphrase: 'Public Global Stellar Network ; September 2015',
      contractId: nftAddr,
      rpcUrl: RpcUrl,
    });
  }

  async createTask(
    storyId: string,
    cid: string,
    nftAddress: string,
    rewards: number[],
  ) {
    const tx = await this.contract!.create_task({
      from: this.account,
      story_id: Number(storyId),
      cid,
      nft_address: nftAddress || this.factoryAddress,
      reward_nfts: rewards?.[0] ?? 0,
    });
    await tx.signAndSend({ signTransaction });
  }

  async updateTask(storyId: string, taskId: string, cid: string) {
    const tx = await this.contract!.update_task({
      from: this.account,
      story_id: Number(storyId),
      task_id: Number(taskId),
      cid,
    });
    await tx.signAndSend({ signTransaction });
  }

  async cancelTask(storyId: string, taskId: number) {
    const tx = await this.contract!.cancel_task({
      from: this.account,
      story_id: Number(storyId),
      task_id: Number(taskId),
    });
    await tx.signAndSend({ signTransaction });
  }

  async createTaskSubmit(storyId: string, taskId: number, cid: string) {
    const tx = await this.contract!.create_task_submit({
      from: this.account,
      story_id: Number(storyId),
      task_id: Number(taskId),
      cid,
    });
    await tx.signAndSend({ signTransaction });
  }

  async withdrawTaskSubmit(storyId: string, taskId: number, submitId: number) {
    const tx = await this.contract!.withdraw_task_submit({
      from: this.account,
      story_id: Number(storyId),
      task_id: Number(taskId),
      submit_id: submitId,
    });
    await tx.signAndSend({ signTransaction });
  }

  async markTaskDone(storyId: string, taskId: number, submitId: number) {
    const tx = await this.contract!.mark_task_done({
      from: this.account,
      story_id: Number(storyId),
      task_id: Number(taskId),
      submit_id: submitId,
    });
    await tx.signAndSend({ signTransaction });
  }

  async authorReservedNftRest(storyId: string) {
    const storyInfo = await this.getStoryNftInfo(storyId);
    if (storyInfo) {
      const { author_reserve, author_claimed } = storyInfo;
      return author_reserve - author_claimed;
    }
    return 0;
  }

  async claimAuthorReservedNft(storyId: string, amount: number) {
    const tx = await this.contract!.claim_author_reserved_nft({
      from: this.account,
      story_id: Number(storyId),
      mint_num: amount,
    });
    await tx.signAndSend({ signTransaction });
  }

  async tokenIdOfStoryNft(account: string, nftName: string, storyId: string) {
    const nftContract = await this.getStoryNftContract(storyId);
    const { result: balance } = await nftContract.balance_of({
      owner: account,
    });
    const indexList = _.range(balance);
    const token = [];
    for (const idx of indexList) {
      const { result: tokenId } = await nftContract.token_of_owner_by_index({
        owner: account,
        index: idx,
      });
      token.push(tokenId);
    }
    return token;
  }
}
