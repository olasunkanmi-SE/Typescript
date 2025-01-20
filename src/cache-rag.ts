// import * as faiss from "faiss";
// import { promisify } from "util";
// import { createClient } from "redis";
// import { Index, Vector } from "faiss";

// const redisClient = createClient();
// const redisGetAsync = promisify(redisClient.get).bind(redisClient);
// const redisSetAsync = promisify(redisClient.set).bind(redisClient);

// export class SemanticCache {
//   private index: Index;
//   private encoder: faiss.VectorEncoders;
//   private euclideanThreshold: number;
//   private cache: {
//     questions: string[];
//     embeddings: number[][];
//     answers: object[];
//     response_text: string[];
//   };
//   private jsonFile: string;

//   constructor(
//     jsonFile: string = "cache_file.json",
//     euclideanThreshold: number = 0.35
//   ) {
//     this.index = faiss.indexFactory(128, "Flat", faiss.METRIC_L2);
//     this.encoder = faiss.vectorEncoders.fromJSON(
//       JSON.stringify({
//         dim: 128,
//         key: "average_pooling",
//         parameters: { ncentroids: 128 },
//       })
//     );
//     this.euclideanThreshold = euclideanThreshold;
//     this.jsonFile = jsonFile;
//     this.cache = retrieveCache(this.jsonFile);
//   }

//   retrieve(question: string): string | undefined {
//     try {
//       const embedding = this.encoder.encode([question]);
//       this.index.setNumProbes(8);
//       const [distances, indices] = this.index.search(embedding, 1);
//       if (distances[0] >= 0 && distances[0] <= this.euclideanThreshold) {
//         const rowId = indices[0][0];
//         console.log(
//           `Answer recovered from Cache. Distance: ${distances[0]}\nRow: ${rowId}`
//         );
//         return this.cache.response_text[rowId];
//       }
//       return undefined;
//     } catch (e) {
//       console.error("Error during 'retrieve' method:", e);
//     }
//   }

//   add(question: string, answer: string) {
//     try {
//       const embedding = this.encoder.encode([question]);
//       this.index.add(embedding);
//       this.cache.questions.push(question);
//       this.cache.embeddings.push(embedding[0].tolist());
//       this.cache.answers.push(answer);
//       this.cache.response_text.push(answer);
//       storeCache(this.jsonFile, this.cache);
//     } catch (e) {
//       console.error("Error during 'add' method:", e);
//     }
//   }
// }

// function retrieveCache(jsonFile: string) {
//   try {
//     const cache = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
//     return cache;
//   } catch (e) {
//     console.error("Error during 'retrieveCache' method:", e);
//     return {
//       questions: [],
//       embeddings: [],
//       answers: [],
//       response_text: [],
//     };
//   }
// }

// function storeCache(jsonFile: string, cache: object) {
//   try {
//     fs.writeFileSync(jsonFile, JSON.stringify(cache));
//   } catch (e) {
//     console.error("Error during 'storeCache' method:", e);
//   }
// }
