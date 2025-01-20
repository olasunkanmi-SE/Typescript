import * as XLSX from "xlsx";
import * as fs from "fs";

interface TransactionData {
  id: number;
  remainingQty: number;
  matchRole: number;
  feeCurrencyId: number;
  acturalFeeRate: number;
  role: number;
  accountId: number;
  instrumentId: number;
  baseCurrencyId: number;
  quoteCurrencyId: number;
  execQty: number;
  orderState: number;
  matchId: number;
  orderId: number;
  side: number;
  execAmt: number;
  selfDealingQty: number;
  tradeId: number;
  fee: number;
  matchTime: number;
  seq: null;
  taxRate: number;
  tradeScale: null;
  baseCurrencyName: null;
  orderType: null;
}

interface InputData {
  data: TransactionData[];
}

function generateExcelFile(
  inputData: InputData,
  accountNumber: string,
  exchangeName: string,
  dateRange: string
) {
  const workbook = XLSX.readFile("src/transaction-history.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // addLogoToWorksheet(worksheet, "src/1.png");

  XLSX.utils.sheet_add_aoa(worksheet, [["Account:", accountNumber]], {
    origin: "A10",
  });
  XLSX.utils.sheet_add_aoa(worksheet, [["Exchange:", exchangeName]], {
    origin: "A11",
  });
  XLSX.utils.sheet_add_aoa(worksheet, [["Date Range:", dateRange]], {
    origin: "A12",
  });

  // Add headers
  const headers = [
    "No.",
    "Trade Date & Time",
    "Order Type",
    "Price Done",
    "Filled Quantity",
    "Fee (USDT)",
    "Transaction Tax",
    "Total (USDT)",
  ];
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A13" });

  // Add data rows
  const dataRows = inputData.data.map((transaction, index) => [
    index + 1,
    new Date(transaction.matchTime * 1000).toLocaleString(),
    transaction.orderType,
    transaction.execAmt / transaction.execQty,
    transaction.execQty,
    transaction.fee,
    transaction.taxRate,
    transaction.execAmt + transaction.fee,
  ]);
  XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: "A14" });
  console.log(worksheet);
  // Adjust column widths
  const columnWidths = headers.map((header) => ({ wch: header.length + 9 }));
  worksheet["!cols"] = columnWidths;

  XLSX.writeFile(workbook, "src/transaction-history4.xlsx");
}

// Example usage
const inputData: InputData = {
  data: [
    {
      id: 929282006,
      remainingQty: 306.92,
      matchRole: 2,
      feeCurrencyId: 901,
      acturalFeeRate: 0,
      role: -1,
      accountId: 8847927,
      instrumentId: 885,
      baseCurrencyId: 901,
      quoteCurrencyId: 30,
      execQty: 21.67,
      orderState: 12,
      matchId: 50802880,
      orderId: 1801443229041062,
      side: 1,
      execAmt: 6.637521,
      selfDealingQty: 0,
      tradeId: 338671,
      fee: 0,
      matchTime: 1717990185,
      seq: null,
      taxRate: 0,
      tradeScale: null,
      baseCurrencyName: null,
      orderType: null,
    },
    {
      id: 929281615,
      remainingQty: 35.4,
      matchRole: 2,
      feeCurrencyId: 901,
      acturalFeeRate: 0,
      role: -1,
      accountId: 8847927,
      instrumentId: 885,
      baseCurrencyId: 901,
      quoteCurrencyId: 30,
      execQty: 12.11,
      orderState: 12,
      matchId: 50802799,
      orderId: 1801443251061174,
      side: 1,
      execAmt: 3.711715,
      selfDealingQty: 0,
      tradeId: 338670,
      fee: 0,
      matchTime: 1717990166,
      seq: null,
      taxRate: 0,
      tradeScale: null,
      baseCurrencyName: null,
      orderType: null,
    },
    {
      id: 929280712,
      remainingQty: 0,
      matchRole: 2,
      feeCurrencyId: 901,
      acturalFeeRate: 0,
      role: -1,
      accountId: 8847927,
      instrumentId: 885,
      baseCurrencyId: 901,
      quoteCurrencyId: 30,
      execQty: 29.78,
      orderState: 50,
      matchId: 50802659,
      orderId: 1801443038200536,
      side: 1,
      execAmt: 9.15735,
      selfDealingQty: 0,
      tradeId: 338669,
      fee: 0,
      matchTime: 1717990130,
      seq: null,
      taxRate: 0,
      tradeScale: null,
      baseCurrencyName: null,
      orderType: null,
    },
    {
      id: 929280472,
      remainingQty: 29.78,
      matchRole: 2,
      feeCurrencyId: 901,
      acturalFeeRate: 0,
      role: -1,
      accountId: 8847927,
      instrumentId: 885,
      baseCurrencyId: 901,
      quoteCurrencyId: 30,
      execQty: 100,
      orderState: 12,
      matchId: 50802578,
      orderId: 1801443038200536,
      side: 1,
      execAmt: 30.75,
      selfDealingQty: 0,
      tradeId: 338668,
      fee: 0,
      matchTime: 1717990117,
      seq: null,
      taxRate: 0,
      tradeScale: null,
      baseCurrencyName: null,
      orderType: null,
    },
  ],
};

const accountNumber = "1234567890";
const exchangeName = "Sample Exchange";
const dateRange = "2023-01-01 to 2023-12-31";

generateExcelFile(inputData, accountNumber, exchangeName, dateRange);

function addLogoToWorksheet(worksheet: XLSX.WorkSheet, logoPath: string) {
  const logoFileData = fs.readFileSync(logoPath);
  const logoBase64 = logoFileData.toString("base64");
  const drawing = {
    "!ref": "A1:C3", // Adjust the cell range as needed
    A1: {
      t: "pic",
      v: {
        "!type": "image",
        image: logoBase64,
        name: "1.png",
        position: {
          type: "absoluteAnchor",
          x: 0,
          y: 0,
        },
        size: {
          width: 500, // Adjust the width as needed
          height: 100, // Adjust the height as needed
        },
      },
    },
  };

  worksheet["!drawing"] = drawing;

  // const logoFileData = fs.readFileSync(logoPath);
  // const logoBase64 = logoFileData.toString("base64");

  // const drawing = {
  //   "!ref": "A10",
  //   A1: {
  //     t: "pic",
  //     v: {
  //       "!type": "image",
  //       image: logoBase64,
  //       name: "Logo",
  //       position: {
  //         type: "absoluteAnchor",
  //         x: "0.5in",
  //         y: "0.5in",
  //       },
  //       size: {
  //         width: 100,
  //         height: 100,
  //       },
  //     },
  //   },
  // };

  // worksheet["!drawing"] = drawing;
}
