import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const client = createClient({ url: process.env.REDIS_URI });

client.on('error', (err) => console.error('Redis client error:', err));

await client.connect();

export const cacheService = {
  getOrSetCache: async (key, fetchFunction) => {
    const cachedData = await client.get(key);
    if (cachedData) return JSON.parse(cachedData);

    const freshData = await fetchFunction();
    await client.setEx(key, 3600, JSON.stringify(freshData)); // Cache for 1 hour
    return freshData;
  },
};

export default cacheService;
