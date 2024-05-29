import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  ContractClient,
  ContractClientOptions,
} from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk'
export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAIMSGUIWUIAEDEQ2Z2CA6U5VK5OUUHWTLKLNJJBM3HTIKN6YJERDIAQ",
  }
} as const


export interface Story {
  author: string;
  cid: string;
  next_task_id: u64;
  story_id: u64;
}


export interface StoryFactory {
  next_sid: u64;
  stories: Map<u64, Story>;
  story_nft: Map<u64, StoryNftInfo>;
  story_task: Map<string, Task>;
  task_submit: Map<string, Submit>;
}


export interface StoryNftInfo {
  author: string;
  author_claimed: i32;
  author_reserve: i32;
  description: string;
  image: string;
  name: string;
  nft_addr: string;
  price: i128;
  sold: i32;
  story_id: u64;
  total: i32;
  uri_prefix: string;
}


export interface Task {
  cid: string;
  creator: string;
  id: u64;
  next_submit_id: u64;
  nft_address: string;
  reward_nfts: u32;
  status: string;
}


export interface Submit {
  cid: string;
  creator: string;
  id: u64;
  status: string;
}

export const Errors = {
  1: {message:""},
  2: {message:""},
  3: {message:""},
  4: {message:""},
  5: {message:""},
  6: {message:""},
  7: {message:""}
}
export type Processing = readonly [string];

export interface Client {
  /**
   * Construct and simulate a publish_story transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  publish_story: ({from, cid}: {from: string, cid: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a update_story transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_story: ({from, story_id, cid}: {from: string, story_id: u64, cid: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a publish_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  publish_nft: ({from, story_id, name, image, description, uri_prefix, price, total, author_reserve, wasm_hash}: {from: string, story_id: u64, name: string, image: string, description: string, uri_prefix: string, price: i128, total: i32, author_reserve: i32, wasm_hash: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a mint_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint_nft: ({from, story_id}: {from: string, story_id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a claim_author_reserved_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  claim_author_reserved_nft: ({from, story_id, mint_num}: {from: string, story_id: u64, mint_num: i32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a create_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_task: ({from, story_id, cid, nft_address, reward_nfts}: {from: string, story_id: u64, cid: string, nft_address: string, reward_nfts: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a update_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_task: ({from, story_id, task_id, cid}: {from: string, story_id: u64, task_id: u64, cid: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a cancel_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cancel_task: ({from, story_id, task_id}: {from: string, story_id: u64, task_id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a create_task_submit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_task_submit: ({from, story_id, task_id, cid}: {from: string, story_id: u64, task_id: u64, cid: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a withdraw_task_submit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_task_submit: ({from, story_id, task_id, submit_id}: {from: string, story_id: u64, task_id: u64, submit_id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a mark_task_done transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mark_task_done: ({from, story_id, task_id, submit_id}: {from: string, story_id: u64, task_id: u64, submit_id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a get_state transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_state: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<StoryFactory>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAABVN0b3J5AAAAAAAABAAAAAAAAAAGYXV0aG9yAAAAAAATAAAAAAAAAANjaWQAAAAAEAAAAAAAAAAMbmV4dF90YXNrX2lkAAAABgAAAAAAAAAIc3RvcnlfaWQAAAAG",
        "AAAAAQAAAAAAAAAAAAAADFN0b3J5RmFjdG9yeQAAAAUAAAAAAAAACG5leHRfc2lkAAAABgAAAAAAAAAHc3RvcmllcwAAAAPsAAAABgAAB9AAAAAFU3RvcnkAAAAAAAAAAAAACXN0b3J5X25mdAAAAAAAA+wAAAAGAAAH0AAAAAxTdG9yeU5mdEluZm8AAAAAAAAACnN0b3J5X3Rhc2sAAAAAA+wAAAAQAAAH0AAAAARUYXNrAAAAAAAAAAt0YXNrX3N1Ym1pdAAAAAPsAAAAEAAAB9AAAAAGU3VibWl0AAA=",
        "AAAAAQAAAAAAAAAAAAAADFN0b3J5TmZ0SW5mbwAAAAwAAAAAAAAABmF1dGhvcgAAAAAAEwAAAAAAAAAOYXV0aG9yX2NsYWltZWQAAAAAAAUAAAAAAAAADmF1dGhvcl9yZXNlcnZlAAAAAAAFAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAAVpbWFnZQAAAAAAABAAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAhuZnRfYWRkcgAAABMAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAEc29sZAAAAAUAAAAAAAAACHN0b3J5X2lkAAAABgAAAAAAAAAFdG90YWwAAAAAAAAFAAAAAAAAAAp1cmlfcHJlZml4AAAAAAAQ",
        "AAAAAQAAAAAAAAAAAAAABFRhc2sAAAAHAAAAAAAAAANjaWQAAAAAEAAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAAAAAAJpZAAAAAAABgAAAAAAAAAObmV4dF9zdWJtaXRfaWQAAAAAAAYAAAAAAAAAC25mdF9hZGRyZXNzAAAAABMAAAAAAAAAC3Jld2FyZF9uZnRzAAAAAAQAAAAAAAAABnN0YXR1cwAAAAAAEA==",
        "AAAAAQAAAAAAAAAAAAAABlN1Ym1pdAAAAAAABAAAAAAAAAADY2lkAAAAABAAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAACaWQAAAAAAAYAAAAAAAAABnN0YXR1cwAAAAAAEA==",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABwAAAAAAAAAJTm90QXV0aG9yAAAAAAAAAQAAAAAAAAANTm90Rm91bmRTdG9yeQAAAAAAAAIAAAAAAAAAEE5vdEZvdW5kU3RvcnlOZnQAAAADAAAAAAAAAA9TdG9yeU5mdFNvbGRPdXQAAAAABAAAAAAAAAARTm90Rm91bmRTdG9yeVRhc2sAAAAAAAAFAAAAAAAAAA1TdG9yeVRhc2tEb25lAAAAAAAABgAAAAAAAAASTm90Rm91bmRUYXNrU3VibWl0AAAAAAAH",
        "AAAAAQAAAAAAAAAAAAAAClByb2Nlc3NpbmcAAAAAAAEAAAAAAAAAATAAAAAAAAAQ",
        "AAAAAAAAAAAAAAANcHVibGlzaF9zdG9yeQAAAAAAAAIAAAAAAAAABGZyb20AAAATAAAAAAAAAANjaWQAAAAAEAAAAAEAAAPpAAAABgAAAAM=",
        "AAAAAAAAAAAAAAAMdXBkYXRlX3N0b3J5AAAAAwAAAAAAAAAEZnJvbQAAABMAAAAAAAAACHN0b3J5X2lkAAAABgAAAAAAAAADY2lkAAAAABAAAAABAAAD6QAAAAYAAAAD",
        "AAAAAAAAAAAAAAALcHVibGlzaF9uZnQAAAAACgAAAAAAAAAEZnJvbQAAABMAAAAAAAAACHN0b3J5X2lkAAAABgAAAAAAAAAEbmFtZQAAABAAAAAAAAAABWltYWdlAAAAAAAAEAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAKdXJpX3ByZWZpeAAAAAAAEAAAAAAAAAAFcHJpY2UAAAAAAAALAAAAAAAAAAV0b3RhbAAAAAAAAAUAAAAAAAAADmF1dGhvcl9yZXNlcnZlAAAAAAAFAAAAAAAAAAl3YXNtX2hhc2gAAAAAAAPuAAAAIAAAAAEAAAPpAAAABgAAAAM=",
        "AAAAAAAAAAAAAAAIbWludF9uZnQAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAIc3RvcnlfaWQAAAAGAAAAAQAAA+kAAAAGAAAAAw==",
        "AAAAAAAAAAAAAAAZY2xhaW1fYXV0aG9yX3Jlc2VydmVkX25mdAAAAAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAhzdG9yeV9pZAAAAAYAAAAAAAAACG1pbnRfbnVtAAAABQAAAAEAAAPpAAAABgAAAAM=",
        "AAAAAAAAAAAAAAALY3JlYXRlX3Rhc2sAAAAABQAAAAAAAAAEZnJvbQAAABMAAAAAAAAACHN0b3J5X2lkAAAABgAAAAAAAAADY2lkAAAAABAAAAAAAAAAC25mdF9hZGRyZXNzAAAAABMAAAAAAAAAC3Jld2FyZF9uZnRzAAAAAAQAAAABAAAD6QAAAAYAAAAD",
        "AAAAAAAAAAAAAAALdXBkYXRlX3Rhc2sAAAAABAAAAAAAAAAEZnJvbQAAABMAAAAAAAAACHN0b3J5X2lkAAAABgAAAAAAAAAHdGFza19pZAAAAAAGAAAAAAAAAANjaWQAAAAAEAAAAAEAAAPpAAAABgAAAAM=",
        "AAAAAAAAAAAAAAALY2FuY2VsX3Rhc2sAAAAAAwAAAAAAAAAEZnJvbQAAABMAAAAAAAAACHN0b3J5X2lkAAAABgAAAAAAAAAHdGFza19pZAAAAAAGAAAAAQAAA+kAAAAGAAAAAw==",
        "AAAAAAAAAAAAAAASY3JlYXRlX3Rhc2tfc3VibWl0AAAAAAAEAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAIc3RvcnlfaWQAAAAGAAAAAAAAAAd0YXNrX2lkAAAAAAYAAAAAAAAAA2NpZAAAAAAQAAAAAQAAA+kAAAAGAAAAAw==",
        "AAAAAAAAAAAAAAAUd2l0aGRyYXdfdGFza19zdWJtaXQAAAAEAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAIc3RvcnlfaWQAAAAGAAAAAAAAAAd0YXNrX2lkAAAAAAYAAAAAAAAACXN1Ym1pdF9pZAAAAAAAAAYAAAABAAAD6QAAAAYAAAAD",
        "AAAAAAAAAAAAAAAObWFya190YXNrX2RvbmUAAAAAAAQAAAAAAAAABGZyb20AAAATAAAAAAAAAAhzdG9yeV9pZAAAAAYAAAAAAAAAB3Rhc2tfaWQAAAAABgAAAAAAAAAJc3VibWl0X2lkAAAAAAAABgAAAAEAAAPpAAAABgAAAAM=",
        "AAAAAAAAAAAAAAAJZ2V0X3N0YXRlAAAAAAAAAAAAAAEAAAfQAAAADFN0b3J5RmFjdG9yeQ==" ]),
      options
    )
  }
  public readonly fromJSON = {
    publish_story: this.txFromJSON<Result<u64>>,
        update_story: this.txFromJSON<Result<u64>>,
        publish_nft: this.txFromJSON<Result<u64>>,
        mint_nft: this.txFromJSON<Result<u64>>,
        claim_author_reserved_nft: this.txFromJSON<Result<u64>>,
        create_task: this.txFromJSON<Result<u64>>,
        update_task: this.txFromJSON<Result<u64>>,
        cancel_task: this.txFromJSON<Result<u64>>,
        create_task_submit: this.txFromJSON<Result<u64>>,
        withdraw_task_submit: this.txFromJSON<Result<u64>>,
        mark_task_done: this.txFromJSON<Result<u64>>,
        get_state: this.txFromJSON<StoryFactory>
  }
}