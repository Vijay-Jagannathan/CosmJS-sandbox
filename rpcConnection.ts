import { StargateClient } from "@cosmjs/stargate"
import { constants } from "./constants";

// Class to create connection with RPC ndoe
export class rpcConnection {
    private client: Promise<StargateClient>;
    private static instance: rpcConnection;

    private constructor() {
        this.client = StargateClient.connect(constants.rpcPort);
    }

    public static async getClient() {
        if (!rpcConnection.instance) {
            rpcConnection.instance = new rpcConnection();
        }

        return this.instance.client
    }
}