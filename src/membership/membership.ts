import * as XLSX from "xlsx";
import { IDataArray, IFileType, IJsonData, IReportToJsonOptions } from "./d";
import * as fs from "fs";
import { FIELD_NAMES } from "./i";
import { groupDataByCategories } from "./p";
import { mapFieldsToValue } from "./m";
import { transformData } from "./h";

export class DataExtractionService {
  constructor() {}

  dataToJSON(fileBuffer: Buffer, options: IReportToJsonOptions): IDataArray {
    try {
      const fileType: IFileType = this.detectFileType(fileBuffer);
      const workBook: XLSX.WorkBook = this._readFile(fileBuffer, fileType);
      const sheetName: string = this._getSheetName(workBook, options);

      const workSheet: XLSX.WorkSheet = workBook.Sheets[sheetName];
      const jsonData: IJsonData = XLSX.utils.sheet_to_json(
        workSheet,
        this._getJsonOptions(options)
      );

      return this._processData(jsonData);
    } catch (error: any) {
      console.error("Error processing file data.", error.message);
      throw error;
    }
  }

  private _getSheetName(
    workBook: XLSX.WorkBook,
    options: IReportToJsonOptions
  ): string {
    if (
      options.sheetIndex !== undefined &&
      workBook.SheetNames[options.sheetIndex]
    ) {
      return workBook.SheetNames[options.sheetIndex];
    }
    return workBook.SheetNames[0];
  }

  detectFileType(fileBuffer: Buffer): IFileType {
    const fileSignature: string = fileBuffer.slice(0, 4).toString("utf-8");
    if (fileSignature === "PK\x03\x04") {
      return "xlsx";
    }
    return "csv";
  }

  private _readFile(fileBuffer: Buffer, fileType: IFileType): XLSX.WorkBook {
    const data: string | Buffer =
      fileType === "csv" ? fileBuffer.toString("utf-8") : fileBuffer;

    return XLSX.read(data, {
      type: fileType === "csv" ? "string" : "buffer",
      raw: true,
      cellDates: true,
      cellNF: true,
      cellText: false,
    });
  }

  private _getJsonOptions(options: IReportToJsonOptions): IReportToJsonOptions {
    return {
      header: options.header,
      range: options.range,
      defval: options.defval,
      blankrows: options.blankrows ?? false,
    };
  }

  private _processData(data: IJsonData): IDataArray {
    try {
      if (!Array.isArray(data)) {
        throw new Error("Parsed data is not an array");
      }
      const [_, ...transactionData]: any[] = data;
      return this._normalizeRow(transactionData.slice(1));
    } catch (error: any) {
      console.error("Error normalizing data", error.message);
      throw error;
    }
  }

  private _normalizeRow(rows: IDataArray): IDataArray {
    return rows.map((row) => {
      row.splice(1, 1);
      return row;
    });
  }
}

async function extract() {
  try {
    const csv = await fs.promises.readFile("src/membership/y.csv");
    const d = new DataExtractionService();
    const options = {
      header: 1,
      sheetIndex: 0,
      blankrows: false,
    };
    return d.dataToJSON(csv, options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//rename function
export async function replaceNullWithEmptyString() {
  try {
    let y = await extract();
    let z = JSON.parse(JSON.stringify(y)) as string[][];
    let x = z.map((d) =>
      d.map((i) =>
        i === null || i === undefined || String(i).trim() === "" ? "" : i
      )
    );
    return x;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function fieldNamesMapper(data: string[]) {
  return FIELD_NAMES.reduce(
    (acc: Record<string, string>, field: string, index: number) => {
      acc[field] = data[index];
      return acc;
    },
    {}
  );
}

async function x() {
  const y = await mapFieldsToValue();
  const x = groupDataByCategories(y);
  return transformData(x);
}

x();
