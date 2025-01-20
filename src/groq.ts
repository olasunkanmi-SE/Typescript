// import * as XLSX from "xlsx";
// import * as fs from "fs";
// abstract class ExcelFileGenerator {
//   protected abstract addLogoToWorksheet(
//     worksheet: XLSX.WorkSheet,
//     logoPath: string
//   ): void;

//   protected abstract addReportDetails(
//     worksheet: XLSX.WorkSheet,
//     accountNumber: string,
//     exchangeName: string,
//     dateRange: string
//   ): void;

//   protected abstract addHeaders(
//     worksheet: XLSX.WorkSheet,
//     headers: string[]
//   ): void;

//   protected abstract addDataRows(worksheet: XLSX.WorkSheet, data: any[]): void;

//   protected abstract adjustColumnWidths(
//     worksheet: XLSX.WorkSheet,
//     headers: string[]
//   ): void;

//   public generateExcelFile(
//     inputData: InputData,
//     accountNumber: string,
//     exchangeName: string,
//     dateRange: string
//   ): void {
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.aoa_to_sheet([]);

//     this.addLogoToWorksheet(worksheet, "src/1.png");

//     this.addReportDetails(worksheet, accountNumber, exchangeName, dateRange);

//     const headers = [
//       "No.",
//       "Trade Date & Time",
//       "Order Type",
//       "Price Done",
//       "Filled Quantity",
//       "Fee (USDT)",
//       "Transaction Tax",
//       "Total (USDT)",
//     ];
//     this.addHeaders(worksheet, headers);

//     const dataRows = inputData.data.map((transaction, index) => [
//       index + 1,
//       new Date(transaction.matchTime * 1000).toLocaleString(),
//       transaction.orderType,
//       transaction.execAmt / transaction.execQty,
//       transaction.execQty,
//       transaction.fee,
//       transaction.taxRate,
//       transaction.execAmt + transaction.fee,
//     ]);
//     this.addDataRows(worksheet, dataRows);

//     this.adjustColumnWidths(worksheet, headers);

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction History");
//     XLSX.writeFile(workbook, "Transaction_History7.xlsx");
//   }
// }

// class TransactionExcelFileGenerator extends ExcelFileGenerator {
//   addLogoToWorksheet(worksheet: XLSX.WorkSheet, logoPath: string): void {
//     // implementation
//   }

//   addReportDetails(
//     worksheet: XLSX.WorkSheet,
//     accountNumber: string,
//     exchangeName: string,
//     dateRange: string
//   ): void {
//     XLSX.utils.sheet_add_aoa(worksheet, [["Account:", accountNumber]], {
//       origin: "A1",
//     });
//     XLSX.utils.sheet_add_aoa(worksheet, [["Exchange:", exchangeName]], {
//       origin: "A2",
//     });
//     XLSX.utils.sheet_add_aoa(worksheet, [["Date Range:", dateRange]], {
//       origin: "A3",
//     });
//   }

//   addHeaders(worksheet: XLSX.WorkSheet, headers: string[]): void {
//     XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A5" });
//   }

//   addDataRows(worksheet: XLSX.WorkSheet, data: any[]): void {
//     XLSX.utils.sheet_add_aoa(worksheet, data, { origin: "A6" });
//   }

//   adjustColumnWidths(worksheet: XLSX.WorkSheet, headers: string[]): void {
//     const columnWidths = headers.map((header) => ({ wch: header.length + 9 }));
//     worksheet["!cols"] = columnWidths;
//   }
// }

// //lets say I have a button on click it generates excel. I also want it to be downloaded in the browser after generation
// //how do I do this
