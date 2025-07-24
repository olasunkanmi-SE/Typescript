export interface ICacheService {
  get<T>(key: string): T | undefined;
  set<T>(key: string, data: T, ttl?: number): void;
  delete(key: string): boolean;
}
