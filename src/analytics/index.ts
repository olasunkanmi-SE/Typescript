import { ChatStatisticsService } from "./chat/chat.statistics.service";

async function processStatistics(startDate?: Date, endDate?: Date) {
  const chatService = await new ChatStatisticsService();
  return await chatService.getData(startDate, endDate);
}

export async function run() {
  const aggregatedData = await processStatistics(new Date(2019, 3, 5), new Date(2019, 3, 12));
  return aggregatedData;
}

run();
