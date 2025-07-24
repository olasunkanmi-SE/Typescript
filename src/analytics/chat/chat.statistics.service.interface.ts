import { IChatStatisticData } from "../interfaces";

export interface IChatStatisticsService {
  getData(start?: Date, end?: Date): Promise<Partial<IChatStatisticData>[]>;
}
