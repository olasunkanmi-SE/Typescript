import { groupMemberDataByMembershipId } from "./g";
import { fieldNamesMapper } from "./membership";

type MemberData = Record<string, string>;

export async function mapFieldsToValue(): Promise<Map<string, MemberData[]>> {
  try {
    const data = await groupMemberDataByMembershipId();

    const newMap = new Map<string, MemberData[]>();

    const BATCH_SIZE = 1000;
    let batchCount = 0;

    for (const [key, values] of data) {
      if (++batchCount % BATCH_SIZE === 0) {
        console.log(`Processed ${batchCount} items`);
        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      const mappedValues = await Promise.all(
        values.map((v) => fieldNamesMapper(v))
      );

      newMap.set(key, mappedValues);
    }

    return newMap;
  } catch (error: any) {
    console.error("Error in mapFieldsToValue:", error);
    throw new Error(`Failed to map fields to values: ${error.message}`);
  }
}
