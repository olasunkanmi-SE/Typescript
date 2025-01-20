// Define types for better code organization and type safety
type CategoryKey = "membership" | "profile" | "education" | "professional";
type Record = { [key: string]: string };

export interface GroupedData {
  membership: Record;
  profile: Record;
  education: Record;
  professional: Record;
}

// Predefined category patterns for better maintenance and performance
const CATEGORY_PATTERNS: { [key in CategoryKey]: RegExp } = {
  membership: /^m/i,
  profile: /^u/i,
  education: /^e/i,
  professional: /^p/i,
};

export function groupDataByCategories(
  data: Map<string, Record[]>
): Map<string, GroupedData[]> {
  // Input validation
  if (!data || !(data instanceof Map)) {
    throw new Error("Invalid input: Expected a Map instance");
  }

  // Pre-allocate the result map with expected size
  const newMap = new Map<string, GroupedData[]>();

  try {
    // Process entries in parallel for large datasets
    const entries = Array.from(data.entries());

    // Using for...of instead of entries() for better performance
    for (const [key, records] of entries) {
      if (!Array.isArray(records)) {
        throw new Error(`Invalid records format for key: ${key}`);
      }

      // Process records in chunks for better memory management
      const CHUNK_SIZE = 1000;
      const groupedRecords: GroupedData[] = [];

      for (let i = 0; i < records.length; i += CHUNK_SIZE) {
        const chunk = records.slice(i, i + CHUNK_SIZE);

        const processedChunk = chunk.map((record) => {
          const grouped: GroupedData = {
            membership: {},
            profile: {},
            education: {},
            professional: {},
          };

          // Cache Object.entries result
          const entries = Object.entries(record);

          for (const [field, value] of entries) {
            // Use pre-compiled RegExp patterns for matching
            if (CATEGORY_PATTERNS.membership.test(field.toLocaleLowerCase())) {
              grouped.membership[field] = value;
            } else if (
              CATEGORY_PATTERNS.profile.test(field.toLocaleLowerCase())
            ) {
              grouped.profile[field] = value;
            } else if (
              CATEGORY_PATTERNS.education.test(field.toLocaleLowerCase())
            ) {
              grouped.education[field] = value;
            } else if (
              CATEGORY_PATTERNS.professional.test(field.toLocaleLowerCase())
            ) {
              grouped.professional[field] = value;
            }
          }

          return grouped;
        });

        groupedRecords.push(...processedChunk);
      }

      newMap.set(key, groupedRecords);
    }
    return newMap;
  } catch (error) {
    // Proper error handling
    console.error("Error in groupDataByCategories:", error);
    throw error;
  }
}
