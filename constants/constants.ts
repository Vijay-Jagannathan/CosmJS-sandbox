export class constants {
    // RPC port of the blockchain that we need to connect
    static rpcPort = "rpc.sentry-01.theta-testnet.polypore.xyz:26657"

    // Personal wallet address to interact with the testnet
    static address = "cosmos1f58assyq9k9vqg094qff96yzs9pc66sg3tv3y6"

    // Hash of the faucest that sent free tokens 
    static faucetHash = "C847A37EC0509FC9F7AF0059FABA68E277F14E03E95C8D88AE080F9B87349A33"

    // Testnet faucet to personal address transaction - https://explorer.theta-testnet.polypore.xyz/transactions/C847A37EC0509FC9F7AF0059FABA68E277F14E03E95C8D88AE080F9B87349A33

    // Denomination to be transferred
    static denomination = "uatom"

    // Amount to be transferred
    static amount = "100000"

    // Gas amount
    static gasAmount = "500"

    // Gas limit
    static gasLimit = "200000"
    
    // Message type
    static typeUrlForSendMsg = "/cosmos.bank.v1beta1.MsgSend"

    // For broadcastTx
    static timeoutMs = 60_000

    // For broadcastTx
    static pollIntervalMs = 3_000
}
