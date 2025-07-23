import { ChatStatisticsProcessor } from "./chat/chat.statistic.processor";

async function processStatistics(startDate?: Date, endDate?: Date) {
  const processor = await new ChatStatisticsProcessor();
  return await processor.processStatistics(startDate, endDate);
}

export function run() {
  processStatistics(new Date(2019, 3, 5), new Date(2019, 3, 12));
  const aggregatedData = processStatistics();
  return aggregatedData;
}

run();
