import { filterDataByDateRange, validDateRange } from "./../utils";
import { AGGREGATED_DATA_KEY, CHAT_STAT_KEY, DATA_URL, PROCESSED_AGGREGATED_KEY } from "../constants";
import { HttpsClient } from "../integration/httpsClient";
import { IChatDataWithError, IChatStatisticData } from "../interfaces";
import { Logger } from "../logger";
import { ApplicationError, validateDate } from "../utils";
import { CacheService } from "../cache/cache.service";

export class ChatStatisticsProcessor {
  private readonly url = DATA_URL;
  private readonly logger: Logger;
  private readonly cacheService: CacheService;

  constructor() {
    this.logger = Logger.initialize();
    this.cacheService = new CacheService();
  }

  private async getStatisticsData(): Promise<IChatStatisticData[] | undefined> {
    try {
      const key = AGGREGATED_DATA_KEY;
      const cached: IChatStatisticData[] | undefined = this.cacheService.get<IChatStatisticData[]>(key);
      if (cached) return cached;
      const response: IChatStatisticData[] = await HttpsClient.get(this.url);
      if (!response || response.length === 0) {
        this.logger.log("Unable to retrieve data from S3");
      }
      return response;
    } catch (error: any) {
      return ApplicationError(error);
    }
  }

  private validateStatisticData(data: IChatStatisticData[], batchIndex: number) {
    const validRecords: IChatStatisticData[] = [];
    const invalidRecords: IChatDataWithError[] = [];

    data.forEach((record, i) => {
      const errors: string[] = [];
      if (!record.websiteId) {
        errors.push(`Record ${i} missing websiteId field`);
      }
      if (!record.date) {
        errors.push(`Record ${i} missing date field`);
      }
      if (!validateDate(record.date)) {
        errors.push(`Record ${i} date is invalid`);
      }
      if (typeof record.chats !== "number" || record.chats < 0) {
        errors.push(`Record ${i} has invalid chats value`);
      }
      if (typeof record.missedChats !== "number" || record.missedChats < 0) {
        errors.push(`Record ${i} has invalid missedChats value`);
      }
      if (errors.length > 0) {
        invalidRecords.push({
          record,
          errors,
        });
      } else {
        validRecords.push(record);
      }
      this.logger.log(`Batch ${batchIndex}:`);
    });
    return { validRecords, invalidRecords };
  }
  /**
   * Processes chat statistic data by retrieving, validating, and logging invalid records.
   * @returns {Promise<IChatStatisticData[] | undefined>} An array of valid chat statistic records or undefined if retrieval fails.
   */
  private async processData(data: IChatStatisticData[]): Promise<IChatStatisticData[] | undefined> {
    try {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      if (data.length === 0) {
        this.logger.log("Error while retrieving data from s3 bucket");
        return undefined;
      }
      const recordsToProcess = this.validateStatisticData(data, 5);
      const { validRecords, invalidRecords } = recordsToProcess;
      if (invalidRecords?.length) {
        // The invalidRecords can be further processed according to business rules
        // TODO: In production, send invalid record logs to AWS CloudWatch or another monitoring service.
        this.logger.warn(`There are some invalid records ${JSON.stringify(invalidRecords)}`);
      }
      return validRecords;
    } catch (error) {
      throw ApplicationError(error);
    }
  }

  /**
   * Aggregates chat statistic data by websiteId.
   * Combines multiple records for the same website into a single record, summing the chat and missedChat counts.
   * This is useful for consolidating data from different sources or time periods into a single summary per website.
   *
   * @param data - An array of chat statistic data records.
   * @returns A new array containing aggregated statistics, sorted alphabetically by websiteId.
   */
  private aggregateData(data: IChatStatisticData[]): Partial<IChatStatisticData>[] {
    try {
      const aggregationMap: Map<string, Partial<IChatStatisticData>> = new Map();

      for (const record of data) {
        const { websiteId, chats, missedChats } = record;
        if (aggregationMap.size > 0 && aggregationMap.has(websiteId)) {
          const existingData = aggregationMap.get(websiteId)!;
          aggregationMap.set(websiteId, {
            ...existingData,
            chats: (existingData.chats ?? 0) + chats,
            missedChats: (existingData.missedChats ?? 0) + missedChats,
          });
        } else {
          aggregationMap.set(websiteId, {
            websiteId,
            chats,
            missedChats,
          });
        }
      }
      return Array.from(aggregationMap.values()).sort((a, b) => {
        const idA = a.websiteId ?? "";
        const idB = b.websiteId ?? "";
        return idA.localeCompare(idB);
      });
    } catch (error) {
      throw ApplicationError(error);
    }
  }

  async processStatistics(start?: Date, end?: Date): Promise<Partial<IChatStatisticData>[]> {
    const startDate = start?.toISOString();
    const endDate = end?.toISOString();
    try {
      const statisticsData = await this.getStatisticsData();
      let aggregatedData: Partial<IChatStatisticData>[] = [];

      if (!statisticsData) {
        throw ApplicationError("Error fetching data from S3");
      }
      const processedData = await this.processData(statisticsData);
      if (!processedData) {
        throw ApplicationError("Error while processing analytics data");
      }
      if (!startDate && !endDate) {
        const cacheKey = PROCESSED_AGGREGATED_KEY;
        const cachedProcessAggregatedData: Partial<IChatStatisticData>[] | undefined =
          this.cacheService.get<Partial<IChatStatisticData>[]>(cacheKey);
        if (cachedProcessAggregatedData) return cachedProcessAggregatedData;
        aggregatedData = this.aggregateData(processedData);
      }

      if (startDate && endDate) {
        const cacheKey = CHAT_STAT_KEY(startDate, endDate);
        const cachedDateRangeData: Partial<IChatStatisticData>[] | undefined =
          this.cacheService.get<Partial<IChatStatisticData>[]>(cacheKey);
        if (cachedDateRangeData) return cachedDateRangeData;

        validDateRange(startDate, endDate);
        const filteredData = filterDataByDateRange(processedData, startDate, endDate);
        this.logger.info(`retrieved ${filteredData.length} records`);

        if (filteredData.length === 0) {
          this.logger.warn("No records found for the date range");
        }
        aggregatedData = this.aggregateData(filteredData);
      }
      return aggregatedData;
    } catch (error) {
      this.logger.log("Error while processing chat statistics Data");
      throw ApplicationError(error);
    }
  }
}
