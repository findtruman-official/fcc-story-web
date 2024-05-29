import { Buffer } from "buffer";
import { AssembledTransaction, ContractClient, ContractClientOptions } from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type { u32, i32, u64, i128 } from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk';
export * from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk/lib/rust_types/index.js';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CAIMSGUIWUIAEDEQ2Z2CA6U5VK5OUUHWTLKLNJJBM3HTIKN6YJERDIAQ";
    };
};
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
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
    6: {
        message: string;
    };
    7: {
        message: string;
    };
};
export type Processing = readonly [string];
export interface Client {
    /**
     * Construct and simulate a publish_story transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    publish_story: ({ from, cid }: {
        from: string;
        cid: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a update_story transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_story: ({ from, story_id, cid }: {
        from: string;
        story_id: u64;
        cid: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a publish_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    publish_nft: ({ from, story_id, name, image, description, uri_prefix, price, total, author_reserve, wasm_hash }: {
        from: string;
        story_id: u64;
        name: string;
        image: string;
        description: string;
        uri_prefix: string;
        price: i128;
        total: i32;
        author_reserve: i32;
        wasm_hash: Buffer;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a mint_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    mint_nft: ({ from, story_id }: {
        from: string;
        story_id: u64;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a claim_author_reserved_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    claim_author_reserved_nft: ({ from, story_id, mint_num }: {
        from: string;
        story_id: u64;
        mint_num: i32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a create_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    create_task: ({ from, story_id, cid, nft_address, reward_nfts }: {
        from: string;
        story_id: u64;
        cid: string;
        nft_address: string;
        reward_nfts: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a update_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_task: ({ from, story_id, task_id, cid }: {
        from: string;
        story_id: u64;
        task_id: u64;
        cid: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a cancel_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    cancel_task: ({ from, story_id, task_id }: {
        from: string;
        story_id: u64;
        task_id: u64;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a create_task_submit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    create_task_submit: ({ from, story_id, task_id, cid }: {
        from: string;
        story_id: u64;
        task_id: u64;
        cid: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a withdraw_task_submit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    withdraw_task_submit: ({ from, story_id, task_id, submit_id }: {
        from: string;
        story_id: u64;
        task_id: u64;
        submit_id: u64;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a mark_task_done transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    mark_task_done: ({ from, story_id, task_id, submit_id }: {
        from: string;
        story_id: u64;
        task_id: u64;
        submit_id: u64;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
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
    }) => Promise<AssembledTransaction<StoryFactory>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        publish_story: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        update_story: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        publish_nft: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        mint_nft: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        claim_author_reserved_nft: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        create_task: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        update_task: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        cancel_task: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        create_task_submit: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        withdraw_task_submit: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        mark_task_done: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        get_state: (json: string) => AssembledTransaction<StoryFactory>;
    };
}
