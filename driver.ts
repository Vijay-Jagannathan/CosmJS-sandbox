import { IndexedTx, StargateClient } from "@cosmjs/stargate"
import { constants } from "./constants"
import { rpcClientConnection } from "./rpcClientConnection"
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { Any } from "cosmjs-types/google/protobuf/any"
import { readFile } from "fs/promises"
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing"
import { rpcSigningClientConnection } from "./rpcSigningClientConnection"


const runAll = async(): Promise<void> => {
    const rpcClient = await rpcClientConnection.getClient()
    console.log("Chain Details, chain id: ", await rpcClient.getChainId(), ",height: ", await rpcClient.getHeight())

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

    const vijaySigner: OfflineDirectSigner = await getVijaySignerFromMnemonic()

    const vijayAddress = (await vijaySigner.getAccounts())[0].address
    console.log("Vijay's address from signer: ", vijayAddress)

    const rpcSigningClient = await rpcSigningClientConnection.getClient(vijaySigner)
    console.log("Chain Details, chain id: ", await rpcSigningClient.getChainId(), ", height: ", await rpcSigningClient.getHeight())
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

// Get signer from mnemonic key
async function getVijaySignerFromMnemonic() {
    return DirectSecp256k1HdWallet.fromMnemonic((await readFile("./testnet.vijay.mnemonic.key")).toString(), {
        prefix: "cosmos",
    })
}

runAll()