import { IndexedTx, SigningStargateClient, StargateClient } from "@cosmjs/stargate"
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin"
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { constants } from "../constants/constants"

// Get faucet address
export async function getFaucetTransaction(client: StargateClient) {
    return (await client.getTx(constants.faucetHash,))!
}

// Deserialize transaction
export function getDeserializedTransaction(faucetTx: IndexedTx) {
    return Tx.decode(faucetTx.tx)
}

// Helper function which sends token to a particular faucet address with the necessary amount, gas fee, etc.
export async function sendToken(rpcSigningClient: SigningStargateClient, vijayAddress: string, faucetAddress: string) {
    return await rpcSigningClient.sendTokens(
        vijayAddress, 
        faucetAddress, 
        [{ denom: "uatom", amount: "100000" }], 
        {
            amount: [{ denom: "uatom", amount: "500" }],
            gas: "200000",
        },
    )
}

// Helper function to build and return transaction
export function buildAndGetTransactionAmount(denomination: string, transactionAmount: string) {
    return [{ denom: denomination, amount: transactionAmount}]
}

// Helper function to build gas fee and return
export function buildAndGetGasFee(denomination: string, gasAmount: string, gasLimit: string) {
    return {
        amount: [{ denom: denomination, amount: gasAmount}],
        gas: gasLimit,
    }
}
