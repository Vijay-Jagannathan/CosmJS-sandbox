import { SigningStargateClient, StargateClient } from "@cosmjs/stargate"

// Get balance for a specific account
export function getBalance(client: StargateClient, address: string) {
    return client.getAllBalances(address)
}

// Helper function to check balances of both
export async function checkPersonalAndFaucetBalance(rpcSigningClient: SigningStargateClient, vijayAddress: string, faucetAddress: string) {
    console.log("Alice balance before:", await rpcSigningClient.getAllBalances(vijayAddress))
    console.log("Faucet balance before:", await rpcSigningClient.getAllBalances(faucetAddress))
}
