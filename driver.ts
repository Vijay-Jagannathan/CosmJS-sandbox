import { IndexedTx, StargateClient } from "@cosmjs/stargate"
import { constants } from "./constants"
import { rpcConnection } from "./rpcConnection"
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"

const runAll = async(): Promise<void> => {
    const rpcClient = await rpcConnection.getClient()
    console.log("Chain Details, chain id:", await rpcClient.getChainId(), ",\n height:", await rpcClient.getHeight())

    const balance = await getBalance(rpcClient)
    console.log("Vijay's balances: ", balance)

    const faucetTx = await getFaucetAddress(rpcClient)
    console.log("Faucet Tx: ", faucetTx)

    const decodedTx = getDeserializedTransaction(faucetTx)
    console.log("Deserialized Tx: ", decodedTx)
}

// 1. Get balance for a specific account
function getBalance(client: StargateClient) {
    return client.getAllBalances(constants.address)
}

// 2. Get faucet address
async function getFaucetAddress(client: StargateClient) {
    return (await client.getTx(constants.faucetHash,))!
}

// 3. Deserialize transaction
function getDeserializedTransaction(faucetTx: IndexedTx) {
    return Tx.decode(faucetTx.tx)
}

runAll()