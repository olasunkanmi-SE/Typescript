import { MyBidUserManagerSdk } from "@rgxsdk/user-manager";
import dotenv from "dotenv";

dotenv.config();

class MySDKClient {
  private sdk: MyBidUserManagerSdk;

  constructor() {
    this.sdk = new MyBidUserManagerSdk({
      serverUrl: "mybidv1.regovitservices.com",
      port: Number(process.env.PORT) || 3000,
    });
  }

  async start(): Promise<void> {
    try {
      await this.sdk.start();
      console.log("SDK started successfully");
    } catch (error) {
      console.error("Failed to start SDK:", error);
    }
  }

  async generateAuthToken(): Promise<any> {
    const userManager = this.sdk.getUserManager();
    const x = await userManager.generateAuthToken({
      clientId: "default9d11946e37080d0761f455d85c738e13A",
      clientSecret:
        "default608cdcfe0b7a40cf8408495a68ea23b4a382e2eefb6c3b308fcf64e6b50f707cA",
    });
    console.log(x);
  }

  async createUser() {
    const userManager = this.sdk.getUserManager();
    const user = await userManager.createUser(
      {
        name: "testnormalllaza",
        mobileNumber: "0302342",
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRlZmF1bHQ5ZDExOTQ2ZTM3MDgwZDA3NjFmNDU1ZDg1YzczOGUxM0EiLCJjbGllbnRTZWNyZXQiOiJkZWZhdWx0NjA4Y2RjZmUwYjdhNDBjZjg0MDg0OTVhNjhlYTIzYjRhMzgyZTJlZWZiNmMzYjMwOGZjZjY0ZTZiNTBmNzA3Y0EiLCJpYXQiOjE3MjM2OTI2NTAsImV4cCI6MTcyMzY5MzU1MH0.c78rDUGcMkiX3BOKcGaKCQPhDfx_aDNweeIb-p_3z2s"
    );
    console.log(user);
  }
}

const client = new MySDKClient();

client.start();
client.generateAuthToken();
client.createUser();
