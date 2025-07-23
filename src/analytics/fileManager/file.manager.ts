import * as fs from "fs";
import { ApplicationError } from "../utils";

export class FileManager {
  logDir: string;
  private static instance: FileManager;
  constructor(logDir: string = "logs") {
    this.logDir = logDir;
    this.createLogFile();
  }

  static initalize() {
    return (FileManager.instance ??= new FileManager());
  }

  createLogFile() {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir);
      }
    } catch (error) {
      throw ApplicationError(error);
    }
  }

  appendFile(filePath: string, message: string) {
    fs.appendFileSync(filePath, message);
  }
}
