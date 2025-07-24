import { CacheService } from "../cache/cache.service";
import {
  AGGREGATED_DATA_KEY,
  CHAT_STAT_KEY,
  DATA_URL,
  DATE_CHAT_STAT_KEY,
  PROCESSED_AGGREGATED_KEY,
} from "../constants";
import { HttpsClient } from "../integration/httpsClient";
import { IChatStatisticData } from "../interfaces";
import { Logger } from "../logger";
import { ApplicationError, filterDataByDateRange, validDateRange } from "../utils";
import { ChatStatisticsProcessor } from "./chat.statistic.processor";
import { IChatStatisticsService } from "./chat.statistics.service.interface";

export class ChatStatisticsService implements IChatStatisticsService {
  private readonly cacheService: CacheService;
  private readonly logger: Logger;
  private readonly processor: ChatStatisticsProcessor;
  private readonly url = DATA_URL;
  constructor() {
    this.logger = Logger.initialize();
    this.cacheService = new CacheService();
    this.processor = ChatStatisticsProcessor.initialize();
  }

  private async getStatisticsData(): Promise<IChatStatisticData[] | undefined> {
    try {
      const cacheKey = AGGREGATED_DATA_KEY;
      const cached: IChatStatisticData[] | undefined = this.cacheService.get<IChatStatisticData[]>(cacheKey);
      if (cached) return cached;
      const response: IChatStatisticData[] = await HttpsClient.get(this.url);
      if (!response || response.length === 0) {
        this.logger.log("Unable to retrieve data from S3");
      }
      this.cacheService.set(cacheKey, response);
      return response;
    } catch (error: any) {
      throw ApplicationError(error);
    }
  }

  private async getProcessedData(): Promise<IChatStatisticData[]> {
    const statisticsData = await this.getStatisticsData();
    if (!statisticsData) {
      this.logger.error("Error fetching data from S3");
      throw ApplicationError("Error fetching data from S3");
    }
    const processedData = await this.processor.processData(statisticsData);
    if (!processedData) {
      throw ApplicationError("Error while processing analytics data");
    }
    return processedData;
  }

  private async getDateRangeStatistics(startDate?: string, endDate?: string): Promise<Partial<IChatStatisticData>[]> {
    let cacheKey: string = "";

    validDateRange(startDate, endDate);
    if (startDate && endDate) {
      cacheKey = CHAT_STAT_KEY(startDate, endDate);
    } else {
      const providedDate = startDate ?? endDate;
      cacheKey = providedDate ? DATE_CHAT_STAT_KEY(providedDate) : AGGREGATED_DATA_KEY;
    }

    const cachedDateRangeData: Partial<IChatStatisticData>[] | undefined =
      this.cacheService.get<Partial<IChatStatisticData>[]>(cacheKey);
    if (cachedDateRangeData) return cachedDateRangeData;

    const processedData = await this.getProcessedData();
    const filteredData = filterDataByDateRange(processedData, startDate, endDate);
    this.logger.info(`retrieved ${filteredData.length} records`);

    if (filteredData.length === 0) {
      this.logger.warn("No records found for the date range");
    }

    const data = this.processor.aggregateData(filteredData);
    this.cacheService.set(cacheKey, data);
    return data;
  }

  private async getStatistics() {
    const processedData = await this.getProcessedData();
    const cacheKey = PROCESSED_AGGREGATED_KEY;
    const cachedProcessAggregatedData: Partial<IChatStatisticData>[] | undefined =
      this.cacheService.get<Partial<IChatStatisticData>[]>(cacheKey);
    if (cachedProcessAggregatedData) return cachedProcessAggregatedData;
    return this.processor.aggregateData(processedData);
  }

  async getData(start?: Date, end?: Date): Promise<Partial<IChatStatisticData>[]> {
    const startDate = start?.toISOString();
    const endDate = end?.toISOString();
    if (startDate) {
      return this.getDateRangeStatistics(startDate);
    }
    if (endDate) {
      return this.getDateRangeStatistics(undefined, endDate);
    }
    if (startDate && endDate) {
      return this.getDateRangeStatistics(startDate, endDate);
    }
    return this.getStatistics();
  }
}
