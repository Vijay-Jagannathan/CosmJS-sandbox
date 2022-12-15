import { IndexedTx, StargateClient } from "@cosmjs/stargate"
import { constants } from "./constants"
import { rpcConnection } from "./rpcConnection"
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { Any } from "cosmjs-types/google/protobuf/any"


const runAll = async(): Promise<void> => {
    const rpcClient = await rpcConnection.getClient()
    console.log("Chain Details, chain id:", await rpcClient.getChainId(), ",\n height:", await rpcClient.getHeight())

    const balance = await getBalance(rpcClient, constants.address)
    console.log("Vijay's balances: ", balance)

    const faucetTx = await getFaucetTransaction(rpcClient)
    console.log("Faucet Tx: ", faucetTx)

    const decodedTx = getDeserializedTransaction(faucetTx)
    console.log("Deserialized Tx: ", decodedTx)

    const decodedMessages = decodedTx.body!.messages
    console.log("Decoded messages: ", decodedMessages)

    const deserializedMessage = getDeserializedMessage(decodedMessages)
    console.log("Sent message: ", deserializedMessage)

    const faucetAddress = getFaucetAddress(deserializedMessage)
    console.log("Faucet address: ", faucetAddress)
}

// 1. Get balance for a specific account
function getBalance(client: StargateClient, address: string) {
    return client.getAllBalances(address)
}

// 2. Get faucet address
async function getFaucetTransaction(client: StargateClient) {
    return (await client.getTx(constants.faucetHash,))!
}

// 3. Deserialize transaction
function getDeserializedTransaction(faucetTx: IndexedTx) {
    return Tx.decode(faucetTx.tx)
}

// 4. Get deserialized message
function getDeserializedMessage(decodedMessages: Any[]) {
    return MsgSend.decode(decodedMessages[0].value)
}

// 5. Get faucet address
function getFaucetAddress(deserializedMessage: MsgSend) {
    return deserializedMessage.fromAddress
}

runAll()