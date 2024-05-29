import { ContractSpec } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { ContractClient, } from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk';
export * from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk/lib/rust_types/index.js';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAIMSGUIWUIAEDEQ2Z2CA6U5VK5OUUHWTLKLNJJBM3HTIKN6YJERDIAQ",
    }
};
export const Errors = {
    1: { message: "" },
    2: { message: "" },
    3: { message: "" },
    4: { message: "" },
    5: { message: "" },
    6: { message: "" },
    7: { message: "" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAABVN0b3J5AAAAAAAABAAAAAAAAAAGYXV0aG9yAAAAAAATAAAAAAAAAANjaWQAAAAAEAAAAAAAAAAMbmV4dF90YXNrX2lkAAAABgAAAAAAAAAIc3RvcnlfaWQAAAAG",
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
            "AAAAAAAAAAAAAAAJZ2V0X3N0YXRlAAAAAAAAAAAAAAEAAAfQAAAADFN0b3J5RmFjdG9yeQ=="]), options);
        this.options = options;
    }
    fromJSON = {
        publish_story: (this.txFromJSON),
        update_story: (this.txFromJSON),
        publish_nft: (this.txFromJSON),
        mint_nft: (this.txFromJSON),
        claim_author_reserved_nft: (this.txFromJSON),
        create_task: (this.txFromJSON),
        update_task: (this.txFromJSON),
        cancel_task: (this.txFromJSON),
        create_task_submit: (this.txFromJSON),
        withdraw_task_submit: (this.txFromJSON),
        mark_task_done: (this.txFromJSON),
        get_state: (this.txFromJSON)
    };
}
