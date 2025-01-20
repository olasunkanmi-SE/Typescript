// import * as XLSX from "xlsx";
// import * as fs from "fs";

// abstract class ExcelFileGenerator<T> {
//   protected abstract getHeaders(): string[];
//   protected abstract getDataRows(data: T[]): any[][];
//   protected abstract getWorksheetName(): string;

//   public generateExcelFile(
//     inputData: T[],
//     accountNumber: string,
//     exchangeName: string,
//     dateRange: string,
//     outputFilename: string
//   ) {
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.aoa_to_sheet([]);

//     // this.addLogoToWorksheet(worksheet, "src/1.png");

//     // Add report details
//     XLSX.utils.sheet_add_aoa(worksheet, [["Account:", accountNumber]], {
//       origin: "A1",
//     });
//     XLSX.utils.sheet_add_aoa(worksheet, [["Exchange:", exchangeName]], {
//       origin: "A2",
//     });
//     XLSX.utils.sheet_add_aoa(worksheet, [["Date Range:", dateRange]], {
//       origin: "A3",
//     });

//     // Add headers
//     const headers = this.getHeaders();
//     XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A5" });

//     // Add data rows
//     const dataRows = this.getDataRows(inputData);
//     XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: "A6" });

//     // Adjust column widths
//     const columnWidths = headers.map((header) => ({ wch: header.length + 9 }));
//     worksheet["!cols"] = columnWidths;

//     XLSX.utils.book_append_sheet(workbook, worksheet, this.getWorksheetName());
//     XLSX.writeFile(workbook, outputFilename);
//   }

//   protected addLogoToWorksheet(worksheet: XLSX.WorkSheet, logoPath: string) {
//     const logoFileData = fs.readFileSync(logoPath);
//     const logoBase64 = logoFileData.toString("base64");

//     const drawing = {
//       "!ref": "A10",
//       A1: {
//         t: "pic",
//         v: {
//           "!type": "image",
//           image: logoBase64,
//           name: "Logo",
//           position: {
//             type: "absoluteAnchor",
//             x: "0.5in",
//             y: "0.5in",
//           },
//           size: {
//             width: 100,
//             height: 100,
//           },
//         },
//       },
//     };

//     worksheet["!drawing"] = drawing;
//   }
// }

// class TransactionHistoryExcelGenerator extends ExcelFileGenerator<TransactionData> {
//   protected getHeaders(): string[] {
//     return [
//       "No.",
//       "Trade Date & Time",
//       "Order Type",
//       "Price Done",
//       "Filled Quantity",
//       "Fee (USDT)",
//       "Transaction Tax",
//       "Total (USDT)",
//     ];
//   }

//   protected getDataRows(data: TransactionData[]): any[][] {
//     return data.map((transaction, index) => [
//       index + 1,
//       new Date(transaction.matchTime * 1000).toLocaleString(),
//       transaction.orderType,
//       transaction.execAmt / transaction.execQty,
//       transaction.execQty,
//       transaction.fee,
//       transaction.taxRate,
//       transaction.execAmt + transaction.fee,
//     ]);
//   }

//   protected getWorksheetName(): string {
//     return "Transaction History";
//   }
// }

// // Example usage
// const inputData: TransactionData[] = [
//   // ... (same as before)
// ];

// const accountNumber = "1234567890";
// const exchangeName = "Sample Exchange";
// const dateRange = "2023-01-01 to 2023-12-31";

// const excelGenerator = new TransactionHistoryExcelGenerator();
// excelGenerator.generateExcelFile(
//   inputData,
//   accountNumber,
//   exchangeName,
//   dateRange,
//   "Transaction_History.xlsx"
// );
