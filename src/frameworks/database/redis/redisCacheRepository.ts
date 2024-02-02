import { RedisClient } from '../../../app';

export function redisCacheRepository(redisClient: RedisClient) {
    const setCache = async ({ key, expireTimeSec, data }: { key: string; expireTimeSec: number; data: string }) =>
        await redisClient.setEx(key, expireTimeSec, data);

    const clearCache = async (key: string) => {
        const result = await redisClient.del(key);
        return result === 1;
    };

    // const populateTrie = async ()

    return {
        setCache,
        clearCache,
    };
}

export type RedisRepositoryImpl = typeof redisCacheRepository;
