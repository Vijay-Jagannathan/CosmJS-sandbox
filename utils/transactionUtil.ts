import { IndexedTx, SigningStargateClient, StargateClient } from "@cosmjs/stargate"
import { Tx, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { EncodeObject } from "@cosmjs/proto-signing"
import { StdFee } from "@cosmjs/amino"

// Get transaction
export async function getTransaction(client: StargateClient, transactionHash: string) {
    return (await client.getTx(transactionHash))!
}

// Get signed transaction
export async function getSignedTransaction(client: SigningStargateClient, transactionHash: string) {
    return (await client.getTx(transactionHash))!
}

// Deserialize transaction
export function getDeserializedTransaction(transaction: IndexedTx) {
    return Tx.decode(transaction.tx)
}

// Encode raw transaction
export async function getEncodedTransaction(txRaw: TxRaw) {
    return TxRaw.encode(txRaw).finish()
}

// Helper function which sends token to a receiver address with the necessary amount, gas fee, etc.
export async function sendToken(rpcSigningClient: SigningStargateClient, vijayAddress: string, receiverAddress: string) {
    return await rpcSigningClient.sendTokens(
        vijayAddress, 
        receiverAddress, 
        [{ denom: "uatom", amount: "100000" }], 
        {
            amount: [{ denom: "uatom", amount: "500" }],
            gas: "200000",
        },
    )
}

// Helper function to build and return transaction
export function getCoinAmount(denomination: string, transactionAmount: string) {
    return [{ denom: denomination, amount: transactionAmount}]
}

// Helper function to build and return gas fee
export function getGasFee(denomination: string, gasAmount: string, gasLimit: string) {
    return {
        amount: [{ denom: denomination, amount: gasAmount}],
        gas: gasLimit,
    }
}

// Helper to sign transaction
export async function signTx(client: SigningStargateClient, signerAddress: string, sendMessage: EncodeObject[], fee: StdFee) {
    return await client.sign(signerAddress, sendMessage, fee, "")
}

// Helper to broadcast transaction
export async function broadcastTx(client: SigningStargateClient, tx: Uint8Array, timeoutMs: number, pollIntervalMs: number) {
    return await client.broadcastTx(tx, timeoutMs, pollIntervalMs)
}

// Helper function which signs and broadcasts the transaction message
// This is the recommended way to send and broadcast tokens instead of using the sendTokens method
export async function signAndBroadcast(client: SigningStargateClient, senderAddress: string, sendMessage: EncodeObject[], fee: StdFee) {
    return await client.signAndBroadcast(senderAddress, sendMessage, fee, "")
}
