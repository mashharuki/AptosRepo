import dotenv from "dotenv";
dotenv.config();

import { 
    AptosClient, 
    AptosAccount, 
    CoinClient,
    FaucetClient 
} from "aptos";
import { 
    NODE_URL, 
    FAUCET_URL 
} from "./common";


(async () => {
    // Create API and faucet clients.
    const client = new AptosClient(NODE_URL);
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); 

    // Create client for working with the coin module.
    const coinClient = new CoinClient(client); 

    // Create accounts.
    const alice = new AptosAccount();
    const bob = new AptosAccount(); 

    // Print out account addresses.
    console.log("=== Addresses ===");
    console.log(`Alice: ${alice.address()}`);
    console.log(`Bob: ${bob.address()}`);
    console.log("");

    // Fund accounts.
    await faucetClient.fundAccount(alice.address(), 100_000_000);
    await faucetClient.fundAccount(bob.address(), 0); 

    // Print out initial balances.
    console.log("=== Initial Balances ===");
    console.log(`Alice: ${await coinClient.checkBalance(alice)}`);
    console.log(`Bob: ${await coinClient.checkBalance(bob)}`); 
    console.log("");

    // Have Alice send Bob some AptosCoins. (transfer)
    let txnHash = await coinClient.transfer(alice, bob, 1_000, { 
        gasUnitPrice: BigInt(100) 
    }); 
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash); 

    // Print out intermediate balances.
    console.log("=== Intermediate Balances ===");
    console.log(`Alice: ${await coinClient.checkBalance(alice)}`);
    console.log(`Bob: ${await coinClient.checkBalance(bob)}`);
    console.log("");

    // Have Alice send Bob some more AptosCoins.
    txnHash = await coinClient.transfer(alice, bob, 1_000, { 
        gasUnitPrice: BigInt(100) 
    });
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash, { checkSuccess: true });

    // Print out final balances.
    console.log("=== Final Balances ===");
    console.log(`Alice: ${await coinClient.checkBalance(alice)}`);
    console.log(`Bob: ${await coinClient.checkBalance(bob)}`);
    console.log("");
})();