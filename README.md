# CosmJS-sandbox

[CosmJS](https://tutorials.cosmos.network/tutorials/7-cosmjs/) is a typescript library used to build application specific blockchains on top of the Cosmos network. This sandbox repo is an attempt to play around with this library and explore the different features.

This repo is not exhaustive by any means and simply tries to send a transaction and broadcast it (and any pre-requisites like creating a signing client, etc). For all other features that CosmJS allows us to, please refer to [Appendix](https://github.com/Vijay-Jagannathan/CosmJS-sandbox/blob/bf2f484d8023db3e9fcfcf41f853120f1a8a01c8/README.md#L33) for more information.


## How to use this repository ?

*Disclaimer: All the steps mentioned below and purely from the point of running this package. If you need help with a given method that this repo uses or wrt datatypes and things like that or wrt why something is done a certain way, please refer to the links in appendix for more information*

#### Step 1 
* First thing you would need to do is to create a key for yourself 
* Use the `generate_mnemonic.ts` file in `utils` folder and run the following command:

    `npx ts-node generate_mnemonic.ts > testnet.<your-name>.mnemonic.key`

* This command will basically generate a 24 word mnemonic which you will use to create a wallet address on the testnet
* The output of this command will be your wallet address (Also notice that you'll have a new file called `testnet.<your-name>.mnemonic.key`)


#### Step 2
* Once you have the address and everything ready, you can use the package to run the driver script. 
* Keep in mind that this script assumes that the address and other details are correct. For example: you need to change the address and other details to correpond to your key/address. So please double check before running your driver script.

#### Step 3
* Before sending a transaction, you would first need to get some test tokens to send around. For that purpose, you would need to request tokens from a [discord group](https://discord.gg/cosmosnetwork).
* After you've verified your profile, go to the faucet channel and send the following in the chatbox:

    `$request [Your wallet address] theta`
* For more details, check [this](https://tutorials.cosmos.network/tutorials/7-cosmjs/2-first-steps.html#get-a-balance)

#### Step 4
* Once everything looks good, all you need to do is run the following:

    `npm run driver`

* This is again assuming that you will be using the driver script to run your commands. If you intend to rename the file or use another file to run your scripts, make sure to change the config under `scripts` in the `package.json` file.

## Appendix

For more information on Cosmos - https://cosmos.network/

For more information on CosmJS - https://github.com/cosmos/cosmjs

For examples on using CosmJS - https://tutorials.cosmos.network/tutorials/7-cosmjs/

Signing Stargate client - https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html
