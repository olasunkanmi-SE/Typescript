// Solution 1: Using dynamic import
async function initializePipeline(): Promise<any> {
  try {
    const { pipeline } = await import("@xenova/transformers");

    const pipe = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const result = await pipe("Hello World", {
      pooling: "mean",
      normalize: true,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

initializePipeline();
