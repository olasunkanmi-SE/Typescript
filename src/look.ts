import * as crypto from "crypto";
import * as https from "https";

interface ApiConfig {
  apiKey: string;
  secretKey: string;
  apiUrl: string;
}

class CoinStoreApi {
  private config: ApiConfig;
  private crypto: typeof crypto;

  constructor(config: ApiConfig) {
    this.config = config;
    this.crypto = crypto;
  }

  private generateExpires(): string {
    return Math.floor(Date.now() / 30000).toString();
  }

  private generateKey(expires: string): string {
    return this.crypto
      .createHmac("sha256", this.config.secretKey)
      .update(expires)
      .digest("hex");
  }

  private generateSignature(payload: string, key: string): string {
    return this.crypto.createHmac("sha256", key).update(payload).digest("hex");
  }

  async fetchCurrency(payload: string): Promise<any> {
    const expires = this.generateExpires();
    const key = this.generateKey(expires);
    const signature = this.generateSignature(payload, key);

    const headers = {
      "X-CS-APIKEY": this.config.apiKey,
      "X-CS-SIGN": signature,
      "X-CS-EXPIRES": expires,
      "Content-Type": "application/json",
    };

    const url = `${this.config.apiUrl}?${payload}`;
    // Make API request using the generated headers
    // ...
  }
}

const apiConfig: ApiConfig = {
  apiKey: "your api_key",
  secretKey: "your secret_key",
  apiUrl: "https://api.coinstore.com/api/fi/v1/common/currency",
};

const coinStoreApi = new CoinStoreApi(apiConfig);
coinStoreApi.fetchCurrency("currencyCode=ETH");
