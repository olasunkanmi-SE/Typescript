const { createHmac } = require("node:crypto");

import axios from "axios";

const url = "https://api.coinstore.com/api/v2/public/config/spot/symbols";
const api_key = "your api_key";
const secret_key = "your secret_key";
const expires = Math.floor(Date.now() / 30000);
const expires_key = expires.toString();
const key = createHmac("sha256", secret_key).update(expires_key).digest("hex");
const payload = JSON.stringify({});
const signature = createHmac("sha256", key).update(payload).digest("hex");

const headers = {
  "X-CS-APIKEY": api_key,
  "X-CS-SIGN": signature,
  "X-CS-EXPIRES": expires,
  "exch-language": "en_US",
  "Content-Type": "application/json",
  Accept: "*/*",
  Connection: "keep-alive",
};

axios
  .post(url, payload, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
