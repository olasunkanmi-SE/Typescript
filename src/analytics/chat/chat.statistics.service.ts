// import { CacheService } from "../cache/cache.service";
// import { CHAT_STAT_KEY } from "../constants";
// import { IChatStatisticData } from "../interfaces";
// import { Logger } from "../logger";
// import { filterDataByDateRange, validDateRange } from "../utils";

// export class ChatStatisticsService {
//   private readonly cacheService: CacheService;
//   private readonly logger: Logger;
//   constructor() {
//     this.logger = Logger.initialize();
//     this.cacheService = new CacheService();
//   }
//   private async getDateRangeStatistics(startDate: string, endDate: string): Promise<Partial<IChatStatisticData>[]> {
//     const cacheKey = CHAT_STAT_KEY(startDate, endDate);
//     const cachedDateRangeData: Partial<IChatStatisticData>[] | undefined =
//       this.cacheService.get<Partial<IChatStatisticData>[]>(cacheKey);
//     if (cachedDateRangeData) return cachedDateRangeData;

//     validDateRange(startDate, endDate);
//     const filteredData = filterDataByDateRange(processedData, startDate, endDate);
//     this.logger.info(`retrieved ${filteredData.length} records`);

//     if (filteredData.length === 0) {
//       this.logger.warn("No records found for the date range");
//     }
//     aggregatedData = this.aggregateData(filteredData);
//   }
// }
