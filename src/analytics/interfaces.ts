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

export interface ILogger {
  logError(level: TLogLevel, message: string, error?: Error): void;
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  info(message: string): void;
}

export interface IFileManager {
  createLogFile(): void;
  appendFile(filePath: string, message: string): void;
}
