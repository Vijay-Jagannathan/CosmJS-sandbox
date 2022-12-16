import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { readFile } from "fs/promises";

// Get signer from mnemonic key
export async function getVijaySignerFromMnemonic() {
    return DirectSecp256k1HdWallet.fromMnemonic((await readFile("./testnet.vijay.mnemonic.key")).toString(), {
        prefix: "cosmos",
    })
}

// Get vijay address
export async function getVijayAddress(vijaySigner: OfflineDirectSigner) {
    return (await vijaySigner.getAccounts())[0].address
}
