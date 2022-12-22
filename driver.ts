import { constants } from "./constants/constants"
import { rpcClientConnection } from "./client/rpcClientConnection"
import { OfflineDirectSigner } from "@cosmjs/proto-signing"
import { rpcSigningClientConnection } from "./client/rpcSigningClientConnection"
import { checkPersonalAndFaucetBalance, getBalance } from "./utils/balanceUtil"
import { getGasFee, getCoinAmount, getDeserializedTransaction, getTransaction, signAndBroadcast } from "./utils/transactionUtil"
import { getDecodedMessage, getDeserializedMessage, getFaucetAddress, getMessage } from "./utils/messageUtil"
import { getVijayAddress, getVijaySignerFromMnemonic } from "./utils/signerUtil"

const runAll = async(): Promise<void> => {
    const rpcClient = await rpcClientConnection.getClient()
    console.log("Chain Details, chain id: ", await rpcClient.getChainId(), ",height: ", await rpcClient.getHeight())

    const balance = await getBalance(rpcClient, constants.address)
    console.log("Vijay's balances: ", balance)

    const faucetTx = await getTransaction(rpcClient, constants.faucetHash)
    console.log("Faucet Tx: ", faucetTx)

    const decodedTx = getDeserializedTransaction(faucetTx)
    console.log("Deserialized Tx: ", decodedTx)

    const decodedMessages = getDecodedMessage(decodedTx)
    console.log("Decoded messages: ", decodedMessages)

    const deserializedMessage = getDeserializedMessage(decodedMessages)
    console.log("Sent message: ", deserializedMessage)

    const faucetAddress = getFaucetAddress(deserializedMessage)
    console.log("Faucet address: ", faucetAddress)

    const vijaySigner: OfflineDirectSigner = await getVijaySignerFromMnemonic()

    const vijayAddress = await getVijayAddress(vijaySigner)
    console.log("Vijay's address from signer: ", vijayAddress)

    const rpcSigningClient = await rpcSigningClientConnection.getClient(vijaySigner)
    console.log("Chain Details, chain id: ", await rpcSigningClient.getChainId(), ", height: ", await rpcSigningClient.getHeight())

    // Check Gas fee and limit
    console.log("Gas fee: ", decodedTx.authInfo!.fee!.amount)
    console.log("Gas limit: ", decodedTx.authInfo!.fee!.gasLimit.toString(10))

    // Check all balances
    checkPersonalAndFaucetBalance(rpcSigningClient, vijayAddress, faucetAddress)

    // ################################################################ //
    //                     Sign & Broadcast transaction
    // ################################################################ //

    // Transaction building
    const coin = getCoinAmount(constants.denomination, constants.amount)
    const fee = getGasFee(constants.denomination, constants.gasAmount, constants.gasLimit)

    // Compose send message using the transaction amount and broadcast transaction
    const sendMessage = getMessage(vijayAddress, faucetAddress, coin)
    const broadcastResult = await signAndBroadcast(rpcSigningClient, vijayAddress, [sendMessage], fee)
     
    console.log("Transfer result: ", broadcastResult)
    console.log("Check your transaction in: https://explorer.theta-testnet.polypore.xyz/transactions/" + broadcastResult.transactionHash)

    // Check all balances
    checkPersonalAndFaucetBalance(rpcSigningClient, vijayAddress, faucetAddress)
}
    
runAll()
