export interface ICacheEntry<T> {
  data: T;
  timeStamp: number;
  expiredAt: number;
}

export type TLogLevel = "log" | "error" | "warn" | "info";

export interface IChatStatisticData {
  websiteId: string;
  date: string;
  chats: number;
  missedChats: number;
}

export interface IChatDataWithError {
  record: IChatStatisticData;
  errors: string[];
}
