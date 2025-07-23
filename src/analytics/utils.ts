export const validateDate = (isoString: string): boolean => {
  const date = new Date(isoString);
  return !isNaN(date.getTime());
};

/**
 * Validates that the provided start and end dates are valid and that the start date is not later than the end date.
 * This function ensures date consistency before further processing, preventing logical errors in date-related operations.
 *
 * @param startDate - The start date string in 'YYYY-MM-DD' format.
 * @param endDate - The end date string in 'YYYY-MM-DD' format.
 * @throws {Error} If either date is invalid or if the start date is later than the end date.
 */
export const validDateRange = (startDate: string, endDate: string) => {
  if (!validateDate(startDate)) throw new Error("Invalid Start Date Provided");
  if (!validateDate(endDate)) throw new Error("Invalid End Date Provided");
  if (startDate && endDate && startDate > endDate) {
    throw new Error("Start date cannot be greater than end date");
  }
};

/**
 * Wraps a non-Error type thrown as an error in an `Error` object, if it isn't already one.
 * This ensures that error handling logic can consistently deal with `Error` instances.
 *
 * @param error - The error object to be handled. If it's not an instance of `Error`, it will be converted to one.
 * @throws {Error} The original error if it's already an instance of `Error`; otherwise, a new `Error` object wrapping the original error.
 */
export const ApplicationError = (error: unknown) => {
  if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(String(error));
  }
};

/**
 * Processes a large dataset in smaller, manageable batches to avoid performance issues or memory exhaustion.
 * This is useful when dealing with APIs that have rate limits or when processing large files.
 *
 * @param data - The array of data to be processed.
 * @param batchSize - The number of items to include in each batch.
 * @param processBatch - A function that processes a single batch of data. It receives the batch and its index.
 */
export function processInBatches<T>(
  data: T[],
  batchSize: number,
  processBatch: (batch: T[], batchIndex: number) => void
) {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    processBatch(batch, Math.floor(i / batchSize));
  }
}

/**
 * Filters an array of data objects based on a provided date range.
 * If no start or end date is provided, the original data array is returned.
 *
 * The function normalizes the start date to the beginning of the day (00:00:00)
 * and the end date to the end of the day (23:59:59.999) to include all records
 * within the specified range.
 *
 * @param data - An array of data objects to filter.  Each object is expected to have a 'date' property in string format.
 * @param startDate - The start date string for filtering (inclusive). If null/undefined, no lower bound is applied.
 * @param endDate - The end date string for filtering (inclusive). If null/undefined, no upper bound is applied.
 * @returns A new array containing only the data objects that fall within the specified date range.
 *
 * @example
 * const data = [{ date: '2024-01-01' }, { date: '2024-01-15' }, { date: '2024-02-01' }];
 * filterDataByDateRange(data, '2024-01-01', '2024-01-15'); // Returns: [{ date: '2024-01-01' }, { date: '2024-01-15' }]
 */
export function filterDataByDateRange<T>(data: T[], startDate: string, endDate: string) {
  if (!startDate && !endDate) return data;
  let startTime = 0;
  if (startDate) {
    const normalisedStartDate = new Date(startDate);
    normalisedStartDate.setHours(0, 0, 0, 0);
    startTime = normalisedStartDate.getTime();
  }

  let endTime = 0;
  if (endDate) {
    const normalisedEndDate = new Date(endDate);
    normalisedEndDate.setHours(23, 59, 59, 999);
    endTime = normalisedEndDate.getTime();
  }

  return data.filter((record: any) => {
    if (!record || typeof record.date !== "string") return false;
    const recordDate = new Date(record.date);
    const recordTime = recordDate.getTime();
    if (isNaN(recordTime)) return false;
    return recordTime >= startTime && recordTime <= endTime;
  });
}
