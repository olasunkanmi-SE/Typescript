import axios from "axios";
import * as crypto from "crypto";

function getCoinStoreAccountsData() {
  // const url = 'https://api.coinstore.com/api/spot/accountList';
  // const url = 'https://api.coinstore.com/api/v2/trade/order/active';
  const url =
    "https://api.coinstore.com/api/trade/match/accountMatches?symbol=MBIDUSDT";
  // const url = 'https://api.coinstore.com/api/v2/public/config/spot/symbols';
  // const url = 'https://api.coinstore.com/api/v1/ticker/price';
  // Paul's API key
  const apiKey = "a6a3f0cd3cc62e8d049e114d36c98cbb";
  // my api key
  // const apiKey = 'bc4c54f4009dee671eae5cdf1500b447';
  // const secretKey = '6d0a41c40b5dbcc017a40e52be84914f';
  // my secret key
  // const sKey = '3f86d3951ade016b6a147b84cde97535';
  // Paul's secret key
  const sKey = "53d87296985381ae04e7a5d186bf59c9";
  const secretKey = Buffer.from(sKey, "utf-8");
  const expires = Math.floor(Date.now() / 1000) * 1000;
  const expiresKey = Math.floor(expires / 30000).toString();
  const expiresKeyBuffer = Buffer.from(expiresKey, "utf-8");
  const key = crypto
    .createHmac("sha256", secretKey)
    .update(expiresKeyBuffer)
    .digest("hex");
  // const payload = Buffer.from(JSON.stringify({"symbol": "MBIDUSDT"}));
  const payload = Buffer.from("symbol=MBIDUSDT", "utf-8");
  // const payload = Buffer.from('');
  // const payload = 'symbol=MBIDUSDT';
  const signature = crypto
    .createHmac("sha256", key)
    .update(payload)
    .digest("hex");
  const headers = {
    "X-CS-APIKEY": apiKey,
    "X-CS-SIGN": signature,
    "X-CS-EXPIRES": expires.toString(),
    "exch-language": "en_US",
    "Content-Type": "application/json",
    Accept: "*/*",
    Connection: "keep-alive",
  };
  axios
    .get(url, { headers })
    .then((response: { data: any }) => {
      console.log("Response", response.data);
    })
    .catch((error: any) => {
      console.log(
        ":rocket::rocket: ~ UsersService ~ coinstoreData ~ error---> ",
        error
      );
      console.error("Error:", error);
    });
}

getCoinStoreAccountsData();
