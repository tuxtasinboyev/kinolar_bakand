import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
    private redis_client: Redis;

    async onModuleInit() {
        this.redis_client = new Redis({
            host: '127.0.0.1',
            port: 6379
        });

        this.redis_client.on('connect', () => {
            console.log('Redis connected (localhost)');
        });

        this.redis_client.on('error', (err) => {
            console.error(' Redis error:', err);
        });
    }

    async set(key: string, code: string, second: number) {
        return await this.redis_client.set(key, code, 'EX', second);
    }

    async get(key: string) {
        return await this.redis_client.get(key);
    }

    async del(key: string) {
        return await this.redis_client.del(key);
    }
}
