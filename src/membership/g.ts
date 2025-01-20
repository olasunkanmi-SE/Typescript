import { replaceNullWithEmptyString } from "./membership";

interface DataItem extends Array<string> {
  0: string; // key
  [index: number]: string;
}

export async function groupMemberDataByMembershipId(): Promise<
  Map<string, string[][]>
> {
  try {
    // Pre-allocate the Map with an estimated size if possible
    const groupedMap = new Map<string, string[][]>();

    const data = await replaceNullWithEmptyString();

    // Early validation
    if (!Array.isArray(data) || data.length === 0) {
      return groupedMap;
    }

    // Process data in chunks for better memory management
    const CHUNK_SIZE = 1000;
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE);

      // Process each chunk
      for (const item of chunk) {
        // Type guard and validation
        if (!Array.isArray(item) || item.length === 0 || !item[0]) {
          continue;
        }

        const [key, ...values] = item;

        // Use has() + get() instead of nullish coalescing for better performance
        if (groupedMap.has(key)) {
          groupedMap.get(key)!.push(values);
        } else {
          groupedMap.set(key, [values]);
        }
      }
    }

    return groupedMap;
  } catch (error) {
    // Proper error handling with custom error
    const customError =
      error instanceof Error
        ? error
        : new Error("Unknown error in groupMemberDataByMembershipId");

    console.error("Error grouping member data:", {
      error: customError.message,
      stack: customError.stack,
    });

    throw customError;
  }
}
