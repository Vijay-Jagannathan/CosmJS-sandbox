import { constants } from "./constants/constants"
import { rpcClientConnection } from "./client/rpcClientConnection"
import { OfflineDirectSigner } from "@cosmjs/proto-signing"
import { rpcSigningClientConnection } from "./client/rpcSigningClientConnection"
import { checkPersonalAndFaucetBalance, getBalance } from "./utils/balanceUtil"
import { getDeserializedTransaction, getFaucetTransaction, sendToken } from "./utils/transactionUtil"
import { getDecodedMessage, getDeserializedMessage, getFaucetAddress } from "./utils/messageUtil"
import { getVijayAddress, getVijaySignerFromMnemonic } from "./utils/signerUtil"

const runAll = async(): Promise<void> => {
    const rpcClient = await rpcClientConnection.getClient()
    console.log("Chain Details, chain id: ", await rpcClient.getChainId(), ",height: ", await rpcClient.getHeight())

    const balance = await getBalance(rpcClient, constants.address)
    console.log("Vijay's balances: ", balance)

    const faucetTx = await getFaucetTransaction(rpcClient)
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

    // ################################################################ //
    //                            Send Tokens
    // ################################################################ //

    // Check Gas fee and limit
    console.log("Gas fee: ", decodedTx.authInfo!.fee!.amount)
    console.log("Gas limit: ", decodedTx.authInfo!.fee!.gasLimit.toString(10))

    // Check all balances
    checkPersonalAndFaucetBalance(rpcSigningClient, vijayAddress, faucetAddress)

    // Send token to faucet address and check balance after
    const sendTokenResult = await sendToken(rpcSigningClient, vijayAddress, faucetAddress)

    // Example transaction that went through - https://explorer.theta-testnet.polypore.xyz/transactions/1A55A8DF01F5AB5AA5719118A9302BBE9F7CD989A5A869B38246917CA54432C6
    console.log("Transfer result: ", sendTokenResult)
    checkPersonalAndFaucetBalance(rpcSigningClient, vijayAddress, faucetAddress)
}

runAll()
