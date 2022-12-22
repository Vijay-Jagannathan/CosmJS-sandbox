import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import { constants } from "../constants/constants";

// Get deserialized message
export function getDeserializedMessage(decodedMessages: Any[]) {
    return MsgSend.decode(decodedMessages[0].value)
}

// Get decoded message
export function getDecodedMessage(decodedTx: Tx) {
    return decodedTx.body!.messages
}

// Get faucet address
export function getFaucetAddress(deserializedMessage: MsgSend) {
    return deserializedMessage.fromAddress
}

// Get message for broadcasting transaction
export function getMessage(senderAddress: string, receiverAddress: string, coin: Coin[]) {
    return {
        typeUrl: constants.typeUrlForSendMsg,
        value: {
            fromAddress: senderAddress,
            toAddress: receiverAddress,
            amount: coin,
        },
    }
}
