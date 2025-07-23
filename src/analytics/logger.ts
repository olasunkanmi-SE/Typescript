import { FileManager } from "./fileManager/file.manager";
import { TLogLevel } from "./interfaces";
import * as path from "path";

export class Logger {
  private static instance: Logger;
  private readonly fileManager: FileManager;
  constructor() {
    this.fileManager = FileManager.initalize();
  }

  static initialize() {
    return (Logger.instance ??= new Logger());
  }

  logError(level: TLogLevel, message: string, error?: Error) {
    const timeStamp = new Date().toISOString();
    const logMessage = `[${timeStamp}][${level.toUpperCase()}]: ${message}`;
    const logFile = path.join(this.fileManager.logDir, `${level}.log`);
    this.fileManager.appendFile(logFile, logMessage);
  }

  log(message: string) {
    this.logError("log", message);
  }

  debug(message: string) {
    this.logError("debug", message);
  }

  warn(message: string) {
    this.logError("warn", message);
  }

  info(message: string) {
    this.logError("info", message);
  }
}
