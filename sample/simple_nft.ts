import dotenv from "dotenv";
dotenv.config();

import { 
    AptosClient, 
    AptosAccount, 
    FaucetClient, 
    TokenClient, 
    CoinClient 
} from "aptos";
import { 
    NODE_URL, 
    FAUCET_URL 
} from "./common";

(async () => {
    // Create API and faucet clients.
    const client = new AptosClient(NODE_URL);
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); 

    // Create client for working with the token module.
    const tokenClient = new TokenClient(client); 
    // Create a coin client for checking account balances.
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
    await faucetClient.fundAccount(bob.address(), 100_000_000); 

    console.log("=== Initial Coin Balances ===");
    console.log(`Alice: ${await coinClient.checkBalance(alice)}`);
    console.log(`Bob: ${await coinClient.checkBalance(bob)}`);
    console.log("");

    console.log("=== Creating Collection and Token ===");

    const collectionName = "Alice's";
    const tokenName = "Alice's first token";
    const tokenPropertyVersion = 0;

    const tokenId = {
        token_data_id: {
            creator: alice.address().hex(),
            collection: collectionName,
            name: tokenName,
        },
        property_version: `${tokenPropertyVersion}`,
    };

    // Create the collection.
    const txnHash1 = await tokenClient.createCollection(
        alice,
        collectionName,
        "Alice's simple collection",
        "https://alice.com",
    ); 
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash1, { 
        checkSuccess: true 
    });

    // Create a token in that collection.
    const txnHash2 = await tokenClient.createToken(
        alice,
        collectionName,
        tokenName,
        "Alice's simple token",
        1,
        "https://aptos.dev/img/nyan.jpeg",
    ); 
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash2, { 
        checkSuccess: true 
    });

    // get the collection data.
    const collectionData = await tokenClient.getCollectionData(alice.address(), collectionName);
    console.log(`Alice's collection: ${JSON.stringify(collectionData, null, 4)}`);

    // Get the token balance.
    const aliceBalance1 = await tokenClient.getToken(
        alice.address(),
        collectionName,
        tokenName,
        `${tokenPropertyVersion}`,
    );
    console.log(`Alice's token balance: ${aliceBalance1["amount"]}`);

    // Get the token data.
    const tokenData = await tokenClient.getTokenData(
        alice.address(), 
        collectionName, 
        tokenName
    );
    console.log(`Alice's token data: ${JSON.stringify(tokenData, null, 4)}`); // <:!:section_8

    // Alice offers one token to Bob.
    console.log("\n=== Transferring the token to Bob ===");
    
    // transfer
    const txnHash3 = await tokenClient.offerToken(
        alice,
        bob.address(),
        alice.address(),
        collectionName,
        tokenName,
        1,
        tokenPropertyVersion,
    ); 
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash3, { 
        checkSuccess: true 
    });

    // Bob claims the token Alice offered him.
    const txnHash4 = await tokenClient.claimToken(
        bob,
        alice.address(),
        alice.address(),
        collectionName,
        tokenName,
        tokenPropertyVersion,
    ); 
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash4, { 
        checkSuccess: true 
    });

    // get token data
    const aliceBalance2 = await tokenClient.getToken(
        alice.address(),
        collectionName,
        tokenName,
        `${tokenPropertyVersion}`,
    );
    // get balance
    const bobBalance2 = await tokenClient.getTokenForAccount(bob.address(), tokenId);

    console.log(`Alice's token balance: ${aliceBalance2["amount"]}`);
    console.log(`Bob's token balance: ${bobBalance2["amount"]}`);

    console.log("\n=== Transferring the token back to Alice using MultiAgent ===");

    // transfer token
    let txnHash5 = await tokenClient.directTransferToken(
        bob,
        alice,
        alice.address(),
        collectionName,
        tokenName,
        1,
        tokenPropertyVersion,
    ); 
    // Waiting for transaction resolution
    await client.waitForTransaction(txnHash5, { 
        checkSuccess: true 
    });

    // get token data
    const aliceBalance3 = await tokenClient.getToken(
        alice.address(),
        collectionName,
        tokenName,
        `${tokenPropertyVersion}`,
    );
    // get balance
    const bobBalance3 = await tokenClient.getTokenForAccount(bob.address(), tokenId);

    console.log(`Alice's token balance: ${aliceBalance3["amount"]}`);
    console.log(`Bob's token balance: ${bobBalance3["amount"]}`);
})();