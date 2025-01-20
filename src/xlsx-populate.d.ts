declare module "xlsx-populate" {
  export function fromBlankAsync(): Promise<Workbook>;
  export function fromFileAsync(path: string): Promise<Workbook>;

  export interface Workbook {
    sheet(sheetIndex: number): Worksheet;
    toFileAsync(path: string): Promise<void>;
  }

  export interface Worksheet {
    cell(address: string): Cell;
    addImage(options: ImageOptions): void;
    usedRange(): Range;
  }

  export interface Cell {
    value(): any;
    value(value: any): void;
  }

  export interface Range {
    value(): any[][];
  }

  export interface ImageOptions {
    path: string;
    type: string;
    position: {
      type: string;
      from: {
        col: number;
        colOff: string;
        row: number;
        rowOff: string;
      };
      to: {
        col: number;
        colOff: string;
        row: number;
        rowOff: string;
      };
    };
  }
}
