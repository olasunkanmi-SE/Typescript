import * as https from "https";

export class HttpsClient {
  static async get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            try {
              const contentType = res.headers["content-type"] || res.headers["Content-Type"] || "";
              if (contentType.includes("application/json")) {
                resolve(JSON.parse(data));
              } else {
                // This can be further taken care of with the use of urlSearchParams() if the receive data is a form Data.
                // we will be focusing on application/json for this application
                resolve(data as unknown as T);
              }
            } catch (error) {
              reject(error instanceof Error ? error : new Error(String(error)));
            }
          });
        })
        .on("error", (error) => {
          reject(error instanceof Error ? error : new Error(String(error)));
        });
    });
  }
}
