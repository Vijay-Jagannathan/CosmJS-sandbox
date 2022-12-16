import { StargateClient } from "@cosmjs/stargate"
import { constants } from "../constants/constants";

// Class to create connection with RPC ndoe
export class rpcClientConnection {
    private client: Promise<StargateClient>
    private static instance: rpcClientConnection

    private constructor() {
        this.client = StargateClient.connect(constants.rpcPort)
    }

    public static getClient() {
        if (!rpcClientConnection.instance) {
            rpcClientConnection.instance = new rpcClientConnection()
        }

        return this.instance.client
    }
}
