import { env } from '@main/config';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: env.REDIS.HOST,
  port: env.REDIS.PORT
});

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key: string, value: unknown, ttlInMinutes = 360) {
    const ttlInSeconds = ttlInMinutes * 60;
    await redisClient.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  },

  async delete(key: string) {
    await redisClient.del(key);
  }
};
