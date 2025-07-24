import { IChatStatisticData } from "../interfaces";

export interface IChatStatisticsProcessor {
  processData(data: IChatStatisticData[]): Promise<IChatStatisticData[] | undefined>;
  aggregateData(data: IChatStatisticData[]): Partial<IChatStatisticData>[];
}
