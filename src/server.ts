export interface ISalesAOInvestmentData {
  branch: string;
  fundCategory: string;
  fundType: string;
  currency: string;
  issuingHouse: string;
  paymentMethod: string;
  investmentAmount: number;
  lastUpdated: string;
}

export interface ISalesReportData {
  [date: string]: IMarketType;
}

export interface IMarketType {
  [key: string]: IMarketCurrency;
}

export interface IMarketCurrency {
  [currency: string]: ISalesMarketCurrency;
}

export interface ISalesMarketCurrency {
  [branch: string]: Partial<ISalesAOInvestmentData>[];
}

export interface ItransactionInfo {
  [issuingHouse: string]: {
    [paymentMethod: string]: { investmentAmount: number };
  };
}

export enum MARKET_TYPE {
  MONEY_MARKEY = "Money Market",
  NON_MONEY_MARKEY = "Non Money Market",
}

export const MARKET_TYPE_KEYS = {
  MONEY_MARKEY_KEY: "moneyMarket",
  NON_MONEY_MARKEY_KEY: "nonMoneyMarket",
};

function mapSalesData(salesProps: ISalesAOInvestmentData[]): ISalesReportData {
  const salesReport: ISalesReportData = {};
  salesProps.forEach(
    ({
      lastUpdated,
      currency,
      fundCategory,
      branch,
      fundType,
      issuingHouse,
      paymentMethod,
      investmentAmount,
    }: ISalesAOInvestmentData) => {
      const date = new Date(Number(lastUpdated)).toLocaleDateString();

      if (!salesReport[date]) {
        salesReport[date] = {
          moneyMarket: {} as IMarketCurrency,
          nonMoneyMarket: {} as IMarketCurrency,
        };
      }
      const categoryKey =
        fundCategory === MARKET_TYPE.MONEY_MARKEY
          ? MARKET_TYPE_KEYS.MONEY_MARKEY_KEY
          : MARKET_TYPE_KEYS.NON_MONEY_MARKEY_KEY;

      if (!salesReport[date][categoryKey][currency]) {
        salesReport[date][categoryKey][currency] = {};
      }

      if (!salesReport[date][categoryKey][currency][branch]) {
        salesReport[date][categoryKey][currency][branch] = [];
      }

      let transactionInfo: ItransactionInfo = {};
      if (fundType === "PRS") {
        transactionInfo[fundType] = {
          [issuingHouse]: { investmentAmount },
        };
      } else {
        transactionInfo[paymentMethod] = {
          [issuingHouse]: { investmentAmount },
        };
      }

      salesReport[date][categoryKey][currency][branch].push(transactionInfo);
    }
  );

  const sortedDates: string[] = sortDateDescending(Object.keys(salesReport));
  const result: ISalesReportData = {};
  sortedDates.forEach((date: string) => {
    result[date] = salesReport[date];
  });
  console.log(result);
  return result;
}

function sortDateDescending(dates: string[]) {
  return dates.slice().sort((a, b) => {
    const dateA = a.split("/").reverse().join("-");
    const dateB = b.split("/").reverse().join("-");
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}
