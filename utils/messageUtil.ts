import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";

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
