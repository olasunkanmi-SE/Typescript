import { IChatDataWithError, IChatStatisticData } from "../interfaces";
import { Logger } from "../logger";
import { ApplicationError, validateDate } from "../utils";
import { IChatStatisticsProcessor } from "./chat.statistics.processor.interface";

export class ChatStatisticsProcessor implements IChatStatisticsProcessor {
  private readonly logger: Logger;
  private static instance: ChatStatisticsProcessor;

  constructor() {
    this.logger = Logger.initialize();
  }

  static initialize() {
    return (ChatStatisticsProcessor.instance ??= new ChatStatisticsProcessor());
  }

  private readonly validateRecord = (record: IChatStatisticData, index: number): string[] => {
    const errors: string[] = [];
    if (!record.websiteId) errors.push(`Record ${index} missing websiteId field`);
    if (!record.date) errors.push(`Record ${index} missing date field`);
    if (!validateDate(record.date)) errors.push(`Record ${index} date is invalid`);
    if (typeof record.chats !== "number" || record.chats < 0) errors.push(`Record ${index} has invalid chats value`);
    if (typeof record.missedChats !== "number" || record.missedChats < 0)
      errors.push(`Record ${index} has invalid missedChats value`);
    return errors;
  };

  private validateStatisticData(data: IChatStatisticData[], batchIndex: number) {
    const validRecords: IChatStatisticData[] = [];
    const invalidRecords: IChatDataWithError[] = [];

    data.forEach((record, i) => {
      const index = i + 1;
      const errors: string[] = this.validateRecord(record, index);
      if (errors.length > 0) {
        invalidRecords.push({
          record,
          errors,
        });
      } else {
        validRecords.push(record);
      }
    });
    return { validRecords, invalidRecords };
  }
  /**
   * Processes chat statistic data by retrieving, validating, and logging invalid records.
   * @returns {Promise<IChatStatisticData[] | undefined>} An array of valid chat statistic records or undefined if retrieval fails.
   */
  async processData(data: IChatStatisticData[]): Promise<IChatStatisticData[] | undefined> {
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
  aggregateData(data: IChatStatisticData[]): Partial<IChatStatisticData>[] {
    try {
      const aggregationMap: Map<string, Partial<IChatStatisticData>> = new Map();

      for (const record of data) {
        const { websiteId, chats, missedChats } = record;
        const existingData = aggregationMap.get(websiteId);
        if (existingData) {
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
        if (!a.websiteId || !b.websiteId) {
          return 0;
        }
        return a.websiteId.localeCompare(b.websiteId);
      });
    } catch (error) {
      throw ApplicationError(error);
    }
  }
}
