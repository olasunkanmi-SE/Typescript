// TODO Ideally this should be in an env file
export const DATA_URL =
  "https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json";
export const AGGREGATED_DATA_KEY = "chat_statistics_data";
export const CHAT_STAT_KEY = (startDate: string, endDate: string) => `chat_stats_${startDate}_${endDate}`;
export const DATE_CHAT_STAT_KEY = (date: string) => `chat_stats_${date}`;
export const PROCESSED_AGGREGATED_KEY = "process_aggregated_data";
