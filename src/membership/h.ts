import { GroupedData } from "./p";

export const transformData = (inputData: Map<string, GroupedData[]>) => {
  const result = new Map<
    string,
    Array<{
      membership: any[];
      profile: any[];
      education: any[];
      professional: any[];
    }>
  >();

  for (const [key, values] of inputData) {
    const grouped = {
      membership: [] as any[],
      profile: [] as any[],
      education: [] as any[],
      professional: [] as any[],
    };
    // Group each category into its respective array
    values.forEach((item: GroupedData) => {
      if (item?.membership) grouped.membership.push(item.membership);
      if (item?.profile) grouped.profile.push(item.profile);
      if (item?.education) grouped.education.push(item.education);
      if (item?.professional) grouped.professional.push(item.professional);
    });

    result.set(key, [grouped]);
  }
  console.log(result);
  return result;
};
