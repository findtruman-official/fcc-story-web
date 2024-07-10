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

import {
  getBuyAssetXDR,
  getClaimReservedAssetXDR,
  getCreateTaskTransferXDR,
  getPublishAssetXDR,
  getStellarAssetSale,
} from '@/services/stellar';
import { sleep } from '@/utils/utils';
import * as StellarSdk from '@stellar/stellar-sdk';
import {
  Asset,
  Operation,
  Transaction,
  TransactionBuilder,
} from '@stellar/stellar-sdk';
import { message } from 'antd';
import BigNumber from 'bignumber.js';
import { Base64 } from 'js-base64';
import { Client } from 'story_factory';

const useMainnet = process.env.NODE_ENV === 'production';

const Network = useMainnet ? 'PUBLIC' : 'TESTNET';
// const RpcUrl =
//   process.env.NODE_ENV === 'production'
//     ? 'https://rpc.ankr.com/stellar_soroban/55fa8acd4f07f9e87a2ffea1bb912a574a7c6d68daa1292af4cfd688b5e171df'
//     : 'https://soroban-testnet.stellar.org:443';
const RpcUrl = useMainnet
  ? '/story/stellar-rpc'
  : 'https://soroban-testnet.stellar.org';
const networkPassphrase = useMainnet
  ? 'Public Global Stellar Network ; September 2015'
  : 'Test SDF Network ; September 2015';
const horizonApi = useMainnet
  ? 'https://horizon.stellar.org'
  : 'https://horizon-testnet.stellar.org';

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
  horizonServer: StellarSdk.Horizon.Server;
  sorobanServer: StellarSdk.SorobanRpc.Server;

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
    this.horizonServer = new StellarSdk.Horizon.Server(horizonApi, {
      allowHttp: true,
    });
    this.sorobanServer = new StellarSdk.SorobanRpc.Server(RpcUrl, {
      allowHttp: true,
    });
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
          networkPassphrase,
          contractId: this.factoryAddress,
          rpcUrl: RpcUrl,
          publicKey: pubKey,
          allowHttp: true,
        });
        this.onConnect!({ address: pubKey });
      }
      return pubKey;
    } catch (e) {}
  }

  async connect() {
    if ((await isAllowed()) || (await setAllowed())) {
      try {
        let pubKey = await requestAccess();
        if (!pubKey) {
          pubKey = await requestAccess();
        }
        this.onConnect!({ address: pubKey });
        this.account = pubKey;
        this.contract = new Client({
          networkPassphrase,
          contractId: this.factoryAddress,
          rpcUrl: RpcUrl,
          publicKey: pubKey,
          allowHttp: true,
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
    const xdr = await getPublishAssetXDR({
      publicKey: this.account,
      story_id: id,
      code: metadata.name,
      name: metadata.name,
      description: metadata.desc,
      imageCID: metadata.img,
      total: new BigNumber(total).div(1e7).toString(),
      price: `${price}`,
      authorReserved: new BigNumber(reserved).div(1e7).toString(),
    });
    const envelop = await signTransaction(xdr, {
      networkPassphrase,
      network: Network,
      accountToSign: this.account,
    });
    const result = await this.horizonServer.submitTransaction(
      new Transaction(envelop, networkPassphrase),
    );
    console.log('publishStoryNft', result);
  }

  async mintStoryNft(
    id: string,
    author: string,
    price: string,
    nftSaleAddr: string,
    onInsufficientFinds?: (account: string, amount: string) => void,
  ) {
    const restNft = await this.restOfStoryNftOnChain('', id);
    const xdr = await getBuyAssetXDR({
      publicKey: this.account,
      story_id: id,
      buyNum: '0.0000001',
      story_author: author,
    });
    const envelop = await signTransaction(xdr, {
      networkPassphrase,
      network: Network,
      accountToSign: this.account,
    });
    const result = await this.horizonServer.submitTransaction(
      new Transaction(envelop, networkPassphrase),
    );
    console.log('mintStoryNft', result);
    const hasStoryNftRestUpdated = async () => {
      const _restNft = await this.restOfStoryNftOnChain('', id);
      return _restNft !== restNft;
    };
    let updated = await hasStoryNftRestUpdated();
    while (!updated) {
      await sleep(1000);
      updated = await hasStoryNftRestUpdated();
    }
  }

  async getStoryNftInfo(storyId: number | string): Promise<API.StellarAsset> {
    return await getStellarAssetSale(storyId as string);
  }

  async balanceOfStoryNft(account: string, nftName: string, storyId: string) {
    const { code, issuer } = await getStellarAssetSale(storyId);
    const _account = await this.horizonServer.loadAccount(this.account);
    const asset = _account.balances.find(
      (e: any) => e.asset_code === code && e.asset_issuer === issuer,
    );
    return asset
      ? new BigNumber(asset.balance).multipliedBy(1e7).toNumber()
      : 0;
  }

  async restOfStoryNftOnChain(nftName: string, storyId: string) {
    const storyInfo = await this.getStoryNftInfo(storyId);
    if (storyInfo) {
      const { authorReserved, total, sold } = storyInfo;
      return total - authorReserved - sold;
    }
    return 0;
  }

  async getNftAddress(storyId: string) {
    const { contractId } = await getStellarAssetSale(storyId);
    return contractId;
  }

  // async getStoryNftContract(storyId: string): Promise<NftClient> {
  //   const nftAddr = await this.getNftAddress(storyId);
  //   return new NftClient({
  //     networkPassphrase,
  //     contractId: nftAddr,
  //     rpcUrl: RpcUrl,
  //     allowHttp: true,
  //   });
  // }

  async createTask(
    storyId: string,
    cid: string,
    nftAddress: string,
    rewards: number,
  ) {
    if (rewards > 0) {
      const xdr = await getCreateTaskTransferXDR({
        publicKey: this.account,
        story_id: storyId,
        cid,
        nft_address: nftAddress,
        reward_nfts: new BigNumber(rewards).dividedBy(1e7).toString(),
      });
      const envelop = await signTransaction(xdr, {
        networkPassphrase,
        network: Network,
        accountToSign: this.account,
      });
      const result = await this.horizonServer.submitTransaction(
        new Transaction(envelop, networkPassphrase),
      );
      console.log('createTaskTransfer', result);
    }

    try {
      const tx = await this.contract!.create_task({
        from: this.account,
        story_id: Number(storyId),
        cid,
        nft_address: nftAddress || this.factoryAddress,
        reward_nfts: rewards,
      });
      await tx.signAndSend({ signTransaction });
    } catch (e) {
      console.log(e);
    }
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

  async createTaskSubmit(
    storyId: string,
    taskId: number,
    cid: string,
    nftAmount: number,
    asset?: {
      code: string;
      issuer: string;
      total: number;
    },
  ) {
    if (asset) {
      const account = await this.horizonServer.loadAccount(this.account);
      const trustTx = new TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase,
      })
        .addOperation(
          Operation.changeTrust({
            asset: new Asset(asset.code, asset.issuer),
            limit: new BigNumber(asset.total).div(1e7).toString(),
            source: this.account,
          }),
        )
        .setTimeout(300)
        .build();
      const xdr = trustTx.toXDR();
      const envelop = await signTransaction(xdr, {
        networkPassphrase,
        network: Network,
        accountToSign: this.account,
      });
      const result = await this.horizonServer.submitTransaction(
        new Transaction(envelop, networkPassphrase),
      );
      console.log('changeTrust', result);
    }

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
      const { authorReserved, authorClaimed } = storyInfo;
      return authorReserved - authorClaimed;
    }
    return 0;
  }

  async claimAuthorReservedNft(storyId: string, amount: number) {
    const { authorClaimed } = await getStellarAssetSale(storyId);
    const xdr = await getClaimReservedAssetXDR({
      publicKey: this.account,
      story_id: storyId,
      buyNum: new BigNumber(amount).div(1e7).toString(),
    });
    const envelop = await signTransaction(xdr, {
      networkPassphrase,
      network: Network,
      accountToSign: this.account,
    });
    const result = await this.horizonServer.submitTransaction(
      new Transaction(envelop, networkPassphrase),
    );
    const hasReservedUpdated = async () => {
      const { authorClaimed: _authorClaimed } = await getStellarAssetSale(
        storyId,
      );
      return _authorClaimed !== authorClaimed;
    };
    let updated = await hasReservedUpdated();
    while (!updated) {
      await sleep(1000);
      updated = await hasReservedUpdated();
    }
  }

  async tokenIdOfStoryNft(account: string, nftName: string, storyId: string) {
    const balance = await this.balanceOfStoryNft(account, nftName, storyId);
    return new Array(balance).fill(0).map((_, i) => i);
  }
}
