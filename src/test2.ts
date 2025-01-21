import * as https from "https";
import * as crypto from "crypto";

const url = "https://api.coinstore.com/api/spot/accountList";
const apiKey = "";
// const secretKey = '6d0a41c40b5dbcc017a40e52be84914f';

const secretKey: Buffer = Buffer.from(
  "3f86d3951ade016b6a147b84cde97535",
  "utf-8"
);

const expires: number = Math.floor(Date.now() / 1000) * 1000;
const expiresKey: string = Math.floor(expires / 30000).toString();
const expiresKeyBuffer: Buffer = Buffer.from(expiresKey, "utf-8");
const key: string = crypto
  .createHmac("sha256", secretKey)
  .update(expiresKeyBuffer)
  .digest("hex");
const payload: Buffer = Buffer.from(JSON.stringify({}));
const signature: string = crypto
  .createHmac("sha256", key)
  .update(payload)
  .digest("hex");

//create a generic method for this 2

const headers = {
  "X-CS-APIKEY": apiKey,
  "X-CS-SIGN": signature,
  "X-CS-EXPIRES": expires.toString(),
  "exch-language": "en_US",
  "Content-Type": "application/json",
  Accept: "*/*",
  Connection: "keep-alive",
};

const options = {
  hostname: "api.coinstore.com",
  path: "/api/spot/accountList",
  method: "POST",
  headers: headers,
};
console.log(options);

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response:", data);
  });
});

req.on("error", (error) => {
  console.log("🚀🚀 ~ UsersService ~ coinstoreData ~ error---> ", error);
  console.error("Error:", error);
});

req.write(payload);
req.end();
