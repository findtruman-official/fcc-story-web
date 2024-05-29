import { contract } from '@stellar/stellar-sdk';
// import type { Option, u32 } from '@stellar/stellar-sdk/lib/contract_client';
// import {
//   AssembledTransaction,
//   ContractClient,
//   ContractClientOptions,
// } from '@stellar/stellar-sdk/lib/contract_client/index.js';
import {
  AssembledTransaction,
  Option,
  Result,
  u32,
} from '@stellar/stellar-sdk/lib/contract';
// import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
import { Buffer } from 'buffer';
const { Spec, Client: ContractClient } = contract;
// export * from '@stellar/stellar-sdk'
// export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
// export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}

export const networks = {
  testnet: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    contractId: 'CCNBPCJICOWYVXHO5FPDO6BMFTB62LDYN6PFU5DU6HQRX6ATFWYH3K5R',
  },
} as const;

export type Admin = { tag: 'User'; values: void };

export type DataKey =
  | { tag: 'Balance'; values: readonly [string] }
  | { tag: 'TokenOwner'; values: readonly [u32] }
  | { tag: 'Approved'; values: readonly [u32] }
  | { tag: 'Operator'; values: readonly [string, string] };

export type DatakeyMetadata =
  | { tag: 'Name'; values: void }
  | { tag: 'Symbol'; values: void }
  | { tag: 'Uri'; values: readonly [u32] };

export type DataKeyEnumerable =
  | { tag: 'OwnedTokenIndices'; values: void }
  | { tag: 'TokenIdToIndex'; values: void }
  | { tag: 'OwnerOwnedTokenIds'; values: readonly [string] };

export const Errors = {
  0: { message: '' },
  1: { message: '' },
  2: { message: '' },
  4: { message: '' },
  300: { message: '' },
  301: { message: '' },
  302: { message: '' },
  303: { message: '' },
};
// export const Errors = {
//
// };

export interface InitializeEvent {
  admin: string;
  name: string;
  symbol: string;
}

export interface TransferFromEvent {
  from: string;
  spender: string;
  to: string;
  token_id: u32;
}

export interface ApprovalEvent {
  caller: string;
  token_id: u32;
  ttl: u32;
}

export interface ApprovalForAllEvent {
  approved: boolean;
  caller: string;
  operator: string;
  owner: string;
  ttl: u32;
}

export interface SetAdminEvent {
  new_admin: string;
}

export interface MintEvent {
  to: string;
  token_id: u32;
  uri: string;
}

export interface Client {
  /**
   * Construct and simulate a balance_of transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  balance_of: (
    { owner }: { owner: string },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<u32>>;

  /**
   * Construct and simulate a owner_of transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  owner_of: (
    { token_id }: { token_id: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<Result<string>>>;

  /**
   * Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer_from: (
    {
      spender,
      from,
      to,
      token_id,
    }: { spender: string; from: string; to: string; token_id: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<Result<void>>>;

  /**
   * Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  approve: (
    {
      caller,
      operator,
      token_id,
      ttl,
    }: { caller: string; operator: Option<string>; token_id: u32; ttl: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<Result<void>>>;

  /**
   * Construct and simulate a set_approval_for_all transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_approval_for_all: (
    {
      caller,
      owner,
      operator,
      approved,
      ttl,
    }: {
      caller: string;
      owner: string;
      operator: string;
      approved: boolean;
      ttl: u32;
    },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<Result<void>>>;

  /**
   * Construct and simulate a get_approved transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_approved: (
    { token_id }: { token_id: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<Option<string>>>;

  /**
   * Construct and simulate a is_approval_for_all transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_approval_for_all: (
    { owner, operator }: { owner: string; operator: string },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<boolean>>;

  /**
   * Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  name: (options?: {
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
  }) => Promise<AssembledTransaction<string>>;

  /**
   * Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  symbol: (options?: {
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
  }) => Promise<AssembledTransaction<string>>;

  /**
   * Construct and simulate a token_uri transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  token_uri: (
    { token_id }: { token_id: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<string>>;

  /**
   * Construct and simulate a total_supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  total_supply: (options?: {
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
  }) => Promise<AssembledTransaction<u32>>;

  /**
   * Construct and simulate a token_by_index transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  token_by_index: (
    { index }: { index: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<u32>>;

  /**
   * Construct and simulate a token_of_owner_by_index transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  token_of_owner_by_index: (
    { owner, index }: { owner: string; index: u32 },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<u32>>;

  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: (
    { admin, name, symbol }: { admin: string; name: string; symbol: string },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<null>>;

  /**
   * Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  admin: (options?: {
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
  }) => Promise<AssembledTransaction<string>>;

  /**
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_admin: (
    { addr }: { addr: string },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<null>>;

  /**
   * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint: (
    { to, token_id, uri }: { to: string; token_id: u32; uri: string },
    options?: {
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
    },
  ) => Promise<AssembledTransaction<null>>;
}

// @ts-ignore
export class Client extends contract.Client {
  constructor(public readonly options) {
    super(
      new Spec([
        'AAAAAgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAAAAAAABFVzZXI=',
        'AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAEAAAAAAAAAB0JhbGFuY2UAAAAAAQAAABMAAAABAAAAAAAAAApUb2tlbk93bmVyAAAAAAABAAAABAAAAAEAAAAAAAAACEFwcHJvdmVkAAAAAQAAAAQAAAABAAAAAAAAAAhPcGVyYXRvcgAAAAIAAAATAAAAEw==',
        'AAAAAgAAAAAAAAAAAAAAD0RhdGFrZXlNZXRhZGF0YQAAAAADAAAAAAAAAAAAAAAETmFtZQAAAAAAAAAAAAAABlN5bWJvbAAAAAAAAQAAAAAAAAADVXJpAAAAAAEAAAAE',
        'AAAAAgAAAAAAAAAAAAAAEURhdGFLZXlFbnVtZXJhYmxlAAAAAAAAAwAAAAAAAAAAAAAAEU93bmVkVG9rZW5JbmRpY2VzAAAAAAAAAAAAAAAAAAAOVG9rZW5JZFRvSW5kZXgAAAAAAAEAAAAAAAAAEk93bmVyT3duZWRUb2tlbklkcwAAAAAAAQAAABM=',
        'AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABAAAAAAAAAAITm90T3duZXIAAAAAAAAAAAAAAAZOb3RORlQAAAAAAAEAAAAAAAAADU5vdEF1dGhvcml6ZWQAAAAAAAACAAAAAAAAAAtPdXRPZkJvdW5kcwAAAAAE',
        'AAAABAAAAAAAAAAAAAAADVN0b3J5TkZURXJyb3IAAAAAAAAEAAAAAAAAAAhOb3RPd25lcgAAASwAAAAAAAAABk5vdE5GVAAAAAABLQAAAAAAAAANTm90QXV0aG9yaXplZAAAAAAAAS4AAAAAAAAAC091dE9mQm91bmRzAAAAAS8=',
        'AAAAAQAAAAAAAAAAAAAAD0luaXRpYWxpemVFdmVudAAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAZzeW1ib2wAAAAAABA=',
        'AAAAAQAAAAAAAAAAAAAAEVRyYW5zZmVyRnJvbUV2ZW50AAAAAAAABAAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAACHRva2VuX2lkAAAABA==',
        'AAAAAQAAAAAAAAAAAAAADUFwcHJvdmFsRXZlbnQAAAAAAAADAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAACHRva2VuX2lkAAAABAAAAAAAAAADdHRsAAAAAAQ=',
        'AAAAAQAAAAAAAAAAAAAAE0FwcHJvdmFsRm9yQWxsRXZlbnQAAAAABQAAAAAAAAAIYXBwcm92ZWQAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAACG9wZXJhdG9yAAAAEwAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAN0dGwAAAAABA==',
        'AAAAAQAAAAAAAAAAAAAADVNldEFkbWluRXZlbnQAAAAAAAABAAAAAAAAAAluZXdfYWRtaW4AAAAAAAAT',
        'AAAAAQAAAAAAAAAAAAAACU1pbnRFdmVudAAAAAAAAAMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAAAAAAAA3VyaQAAAAAQ',
        'AAAAAAAAAAAAAAAKYmFsYW5jZV9vZgAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAQAAAAQ=',
        'AAAAAAAAAAAAAAAIb3duZXJfb2YAAAABAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAABAAAD6QAAABMAAAfQAAAADVN0b3J5TkZURXJyb3IAAAA=',
        'AAAAAAAAAAAAAAANdHJhbnNmZXJfZnJvbQAAAAAAAAQAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1TdG9yeU5GVEVycm9yAAAA',
        'AAAAAAAAAAAAAAAHYXBwcm92ZQAAAAAEAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAACG9wZXJhdG9yAAAD6AAAABMAAAAAAAAACHRva2VuX2lkAAAABAAAAAAAAAADdHRsAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1TdG9yeU5GVEVycm9yAAAA',
        'AAAAAAAAAAAAAAAUc2V0X2FwcHJvdmFsX2Zvcl9hbGwAAAAFAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAIb3BlcmF0b3IAAAATAAAAAAAAAAhhcHByb3ZlZAAAAAEAAAAAAAAAA3R0bAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANU3RvcnlORlRFcnJvcgAAAA==',
        'AAAAAAAAAAAAAAAMZ2V0X2FwcHJvdmVkAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAA+gAAAAT',
        'AAAAAAAAAAAAAAATaXNfYXBwcm92YWxfZm9yX2FsbAAAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACG9wZXJhdG9yAAAAEwAAAAEAAAAB',
        'AAAAAAAAAAAAAAAEbmFtZQAAAAAAAAABAAAAEA==',
        'AAAAAAAAAAAAAAAGc3ltYm9sAAAAAAAAAAAAAQAAABA=',
        'AAAAAAAAAAAAAAAJdG9rZW5fdXJpAAAAAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAABA=',
        'AAAAAAAAAAAAAAAMdG90YWxfc3VwcGx5AAAAAAAAAAEAAAAE',
        'AAAAAAAAAAAAAAAOdG9rZW5fYnlfaW5kZXgAAAAAAAEAAAAAAAAABWluZGV4AAAAAAAABAAAAAEAAAAE',
        'AAAAAAAAAAAAAAAXdG9rZW5fb2Zfb3duZXJfYnlfaW5kZXgAAAAAAgAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVpbmRleAAAAAAAAAQAAAABAAAABA==',
        'AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAGc3ltYm9sAAAAAAAQAAAAAA==',
        'AAAAAAAAAAAAAAAFYWRtaW4AAAAAAAAAAAAAAQAAABM=',
        'AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAEYWRkcgAAABMAAAAA',
        'AAAAAAAAAAAAAAAEbWludAAAAAMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAAAAAAAA3VyaQAAAAAQAAAAAA==',
      ]),
      options,
    );
  }
  public readonly fromJSON = {
    balance_of: this.txFromJSON<u32>,
    owner_of: this.txFromJSON<Result<string>>,
    transfer_from: this.txFromJSON<Result<void>>,
    approve: this.txFromJSON<Result<void>>,
    set_approval_for_all: this.txFromJSON<Result<void>>,
    get_approved: this.txFromJSON<Option<string>>,
    is_approval_for_all: this.txFromJSON<boolean>,
    name: this.txFromJSON<string>,
    symbol: this.txFromJSON<string>,
    token_uri: this.txFromJSON<string>,
    total_supply: this.txFromJSON<u32>,
    token_by_index: this.txFromJSON<u32>,
    token_of_owner_by_index: this.txFromJSON<u32>,
    initialize: this.txFromJSON<null>,
    admin: this.txFromJSON<string>,
    set_admin: this.txFromJSON<null>,
    mint: this.txFromJSON<null>,
  };
}
