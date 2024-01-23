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
import { constants } from "./keys";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

class SolanoPlayGround {
  connection: Connection;
  constructor() {
    this.connection = new Connection(clusterApiUrl("devnet"));
  }
  protected generateKeyPair(): IKeyPair | undefined {
    try {
      const publicKey = Keypair.generate().publicKey.toBase58();
      const privateKey = Keypair.generate().secretKey;
      console.log({ publicKey, privateKey });
      return { publicKey, privateKey };
    } catch (error) {
      console.error("erro", error);
    }
  }

  protected async getBalance(publicKey: string): Promise<number | undefined> {
    try {
      const address: PublicKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(address);
      const sol = balance / LAMPORTS_PER_SOL;
      return sol;
    } catch (error) {
      console.error(error);
    }
  }

  private getPublicKey(): PublicKey {
    return new PublicKey(constants.senderPublicKey);
  }

  private getSecretKey(key: string): Uint8Array {
    return getKeypairFromEnvironment(key).secretKey;
  }

  protected async creditWallet() {
    try {
      const lamporportToSend = 500000;
      console.log("initiating transaction");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(constants.senderPublicKey),
          toPubkey: new PublicKey(constants.receiverPublicKey),
          lamports: lamporportToSend,
        })
      );
      const senderPublicKey = this.getPublicKey();
      const senderSecretKey = this.getSecretKey("SENDER_SECRET_KEY");
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [{ publicKey: senderPublicKey, secretKey: senderSecretKey }]
      );
      console.log(
        `💸 Finished! Sent ${lamporportToSend} to the address ${senderPublicKey}. with this signature ${signature}`
      );
      return this.getBalance(constants.senderPublicKey);
    } catch (error) {
      console.error(error);
    }
  }
}

class Test extends SolanoPlayGround {
  generate() {
    return this.generateKeyPair();
  }
  async balance() {
    const balance = await this.getBalance(constants.senderPublicKey);
    console.log(balance);
    return balance;
  }
  async credit() {
    return await this.creditWallet();
  }
}
const test = new Test();
const credit = async () => {
  return await test.credit();
};
// balance();
credit();
