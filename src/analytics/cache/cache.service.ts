import { ICacheEntry } from "../interfaces";
import { Logger } from "../logger";
import { ICacheService } from "./cacheService.interface";

export class CacheService implements ICacheService {
  private readonly cache: Map<string, ICacheEntry<any>> = new Map();
  private readonly logger: Logger;

  constructor(private readonly defaultTTL: number = 60 * 60 * 1000) {
    this.logger = Logger.initialize();
  }

  /**
   * Retrieves the cached value associated with the specified key.
   *
   * If the cache entry exists and has not expired, returns the cached data.
   * If the entry does not exist or has expired, returns `undefined`.
   * Expired entries are removed from the cache upon access.
   *
   * @typeParam T - The expected type of the cached data.
   * @param key - The key associated with the cached entry.
   * @returns The cached data of type `T` if present and not expired; otherwise, `undefined`.
   */
  get<T>(key: string): T | undefined {
    // To clean up the old data, we would do that when the key is accessed. Doing this doesnt guarantee
    // All data will be cleaned, but for this application, it works.
    const entry = this.cache.get(key);
    if (!entry) {
      this.logger.info(`Cache miss for ${key}`);
      return undefined;
    }

    if (Date.now() > entry.expiredAt) {
      this.logger.info(`Cache entry for key ${key} has expired`);
      this.cache.delete(key);
      return undefined;
    }

    this.logger.info(`Cache hit for key ${key}`);
    return entry.data as T;
  }

  /**
   * Stores a value in the cache with an optional time-to-live (TTL).
   *
   * @typeParam T - The type of the data to cache.
   * @param key - The key to associate with the cached entry.
   * @param data - The data to cache.
   * @param ttl - Optional. The time-to-live in milliseconds. Defaults to the service's defaultTTL.
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const timeStamp = Date.now();
    const expiredAt = timeStamp + ttl;
    const entry: ICacheEntry<T> = { data, timeStamp, expiredAt };
    this.cache.set(key, entry);
    this.logger.info(`Cache entry set for key ${key}`);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.logger.info("Cache Cleared");
  }
}
