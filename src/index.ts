import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import { IKeyPair } from "./blockchain.interface";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

class SolanoPlayGround {
  connection: Connection;
  senderPublicKey: string;
  receiverPublicKey: string;
  constructor() {
    this.connection = new Connection(clusterApiUrl("devnet"));
    const senderWallet = process.env.SENDER_PUBLIC_KEY;
    const receiverWallet = process.env.RECEIVER_PUBLIC_KEY;
    if (!(senderWallet && receiverWallet)) {
      throw new Error("provide the sender and receiver wallet address");
    }
    this.senderPublicKey = senderWallet;
    this.receiverPublicKey = receiverWallet;
  }
  protected generateKeyPair(): IKeyPair | undefined {
    try {
      const key = Keypair.generate();
      const publicKey = key.publicKey.toBase58();
      const privateKey = key.secretKey;
      this.airDrop(publicKey);
      console.log({ publicKey, privateKey });
      return { publicKey, privateKey };
    } catch (error) {
      console.error("unable to generate key pair.", error);
    }
  }

  protected async airDrop(publicKey: string) {
    const airdrop = await this.connection.requestAirdrop(
      new PublicKey(publicKey),
      LAMPORTS_PER_SOL * 2
    );
    if (airdrop) {
      console.log(`airdrop success ${airdrop}`);
    }
    return airdrop;
  }

  protected async getBalance(publicKey: string): Promise<number | undefined> {
    try {
      const address: PublicKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(address);
      const sol = balance / LAMPORTS_PER_SOL;
      return sol;
    } catch (error) {
      console.error("unable to get balance", error);
    }
  }

  getSenderPublicKey(): string {
    return this.senderPublicKey;
  }

  getReceiverPublicKey(): string {
    return this.receiverPublicKey;
  }

  private getPublicKeyFromSecretKey(key: string): PublicKey {
    return getKeypairFromEnvironment(key).publicKey;
  }

  private getSecretKey(key: string): Uint8Array {
    return getKeypairFromEnvironment(key).secretKey;
  }

  protected async creditWallet() {
    const senderWallet = this.getSenderPublicKey();
    const receiverWallet = this.getReceiverPublicKey();
    const senderSecretKey = this.getSecretKey("SENDER_SECRET_KEY");
    const senderPublicKey = this.getPublicKeyFromSecretKey("SENDER_SECRET_KEY");
    try {
      const senderBalanceBefore = await this.getBalance(
        this.getSenderPublicKey()
      );

      console.log(`Sender's balance before: ${senderBalanceBefore} SOL`);

      const lamportsToSend = 5000;
      console.log("Initiating transaction");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: new PublicKey(receiverWallet),
          lamports: lamportsToSend,
        })
      );

      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [{ publicKey: new PublicKey(senderWallet), secretKey: senderSecretKey }]
      );

      console.log(
        `💸 Finished! Sent ${lamportsToSend} to the address ${senderWallet} with this signature ${signature}`
      );

      // Check the balance after the transaction
      const senderBalanceAfter = await this.getBalance(
        this.getSenderPublicKey()
      );
      console.log(`Sender's balance after: ${senderBalanceAfter} SOL`);

      return senderBalanceAfter;
    } catch (error) {
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
  async drop(): Promise<string> {
    const publicKey = this.getSenderPublicKey();
    const airDrop = await this.airDrop(publicKey);
    return airDrop;
  }
}
const test = new Test();
const credit = async () => {
  return await test.balance();
};
// balance();
credit();
