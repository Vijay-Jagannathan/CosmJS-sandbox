import { IndexedTx, SigningStargateClient, StargateClient } from "@cosmjs/stargate"
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
