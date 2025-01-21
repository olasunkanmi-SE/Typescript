import * as crypto from "crypto";
import * as https from "https";

const url: string =
  "https://api.coinstore.com/api/v2/public/config/spot/symbols";
const api_key: string = "";
const secret_key: string = "";

const expires: number = Math.floor(Date.now() / 30000);
const expires_key: string = expires.toString();
const key: string = crypto
  .createHmac("sha256", secret_key)
  .update(expires_key)
  .digest("hex");
const payload: string = JSON.stringify({});
const signature: string = crypto
  .createHmac("sha256", key)
  .update(payload)
  .digest("hex");

console.log(signature);
console.log(key);

const headers: { [key: string]: string } = {
  "X-CS-APIKEY": api_key,
  "X-CS-SIGN": signature,
  "X-CS-EXPIRES": expires.toString(),
  "exch-language": "en_US",
  "Content-Type": "application/json",
  Accept: "*/*",
  // 'Host': 'https://api.coinstore.com',
  Connection: "keep-alive",
};

const options: https.RequestOptions = {
  hostname: "api.coinstore.com",
  port: 443,
  path: "https://api.coinstore.com/api/spot/accountList",
  method: "POST",
  headers: headers,
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
