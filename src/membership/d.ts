export interface IReportToJsonOptions {
  header?: "A" | number | string[];
  range?: string | number;
  sheetIndex?: number;
  defval?: any;
  blankrows?: boolean;
}

export type IJsonData = Array<Record<string, string | number | null>>;

export type IFileType = "csv" | "xlsx";

type RowData = string[];

export type IDataArray = RowData[];
