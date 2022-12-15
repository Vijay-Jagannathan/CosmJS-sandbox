import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { constants } from "./constants";

export class rpcSigningClientConnection {
    private client: Promise<SigningStargateClient>
    private static instance: rpcSigningClientConnection

    private constructor(vijaySigner: OfflineDirectSigner) {
        this.client = SigningStargateClient.connectWithSigner(constants.rpcPort, vijaySigner)
    }

    public static getClient(vijaySigner: OfflineDirectSigner) {
        if (!rpcSigningClientConnection.instance) {
            rpcSigningClientConnection.instance = new rpcSigningClientConnection(vijaySigner)
        }

        return this.instance.client
    }
}