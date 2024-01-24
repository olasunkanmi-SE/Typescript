"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
require("dotenv/config");
const node_helpers_1 = require("@solana-developers/node-helpers");
class SolanoPlayGround {
    connection;
    senderPublicKey;
    receiverPublicKey;
    constructor() {
        this.connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
        const senderWallet = process.env.SENDER_PUBLIC_KEY;
        const receiverWallet = process.env.RECEIVER_PUBLIC_KEY;
        if (!(senderWallet && receiverWallet)) {
            throw new Error("provide the sender and receiver wallet address");
        }
        this.senderPublicKey = senderWallet;
        this.receiverPublicKey = receiverWallet;
    }
    generateKeyPair() {
        try {
            const key = web3_js_1.Keypair.generate();
            const publicKey = key.publicKey.toBase58();
            const privateKey = key.secretKey;
            this.airDrop(publicKey);
            console.log({ publicKey, privateKey });
            return { publicKey, privateKey };
        }
        catch (error) {
            console.error("unable to generate key pair.", error);
        }
    }
    async airDrop(publicKey) {
        const airdrop = await this.connection.requestAirdrop(new web3_js_1.PublicKey(publicKey), web3_js_1.LAMPORTS_PER_SOL * 2);
        if (airdrop) {
            console.log(`airdrop success ${airdrop}`);
        }
        return airdrop;
    }
    async getBalance(publicKey) {
        try {
            const address = new web3_js_1.PublicKey(publicKey);
            const balance = await this.connection.getBalance(address);
            const sol = balance / web3_js_1.LAMPORTS_PER_SOL;
            return sol;
        }
        catch (error) {
            console.error("unable to get balance", error);
        }
    }
    getSenderPublicKey() {
        return this.senderPublicKey;
    }
    getReceiverPublicKey() {
        return this.receiverPublicKey;
    }
    getPublicKeyFromSecretKey(key) {
        return (0, node_helpers_1.getKeypairFromEnvironment)(key).publicKey;
    }
    getSecretKey(key) {
        return (0, node_helpers_1.getKeypairFromEnvironment)(key).secretKey;
    }
    async creditWallet() {
        const senderWallet = this.getSenderPublicKey();
        const receiverWallet = this.getReceiverPublicKey();
        const senderSecretKey = this.getSecretKey("SENDER_SECRET_KEY");
        const x = this.getPublicKeyFromSecretKey("SENDER_SECRET_KEY");
        try {
            // Check the balance before initiating the transaction
            const senderBalanceBefore = await this.getBalance(this.getSenderPublicKey());
            console.log(`Sender's balance before: ${senderBalanceBefore} SOL`);
            const lamportsToSend = 5000;
            console.log("Initiating transaction");
            const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                fromPubkey: x,
                toPubkey: new web3_js_1.PublicKey(receiverWallet),
                lamports: lamportsToSend,
            }));
            const signature = await (0, web3_js_1.sendAndConfirmTransaction)(this.connection, transaction, [{ publicKey: new web3_js_1.PublicKey(senderWallet), secretKey: senderSecretKey }]);
            console.log(`💸 Finished! Sent ${lamportsToSend} to the address ${senderWallet} with this signature ${signature}`);
            // Check the balance after the transaction
            const senderBalanceAfter = await this.getBalance(this.getSenderPublicKey());
            console.log(`Sender's balance after: ${senderBalanceAfter} SOL`);
            return senderBalanceAfter;
        }
        catch (error) {
            console.error("Unable to credit wallet", error);
        }
    }
}
class Test extends SolanoPlayGround {
    generate() {
        return this.generateKeyPair();
    }
    async balance() {
        const balance = await this.getBalance(this.getSenderPublicKey());
        console.log(balance);
        return balance;
    }
    async credit() {
        return await this.creditWallet();
    }
    async drop() {
        const publicKey = this.getSenderPublicKey();
        return await this.airDrop(publicKey);
    }
}
const test = new Test();
const credit = async () => {
    return await test.balance();
};
// balance();
credit();
