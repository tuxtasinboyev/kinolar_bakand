import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
    private redis_client: Redis
    async onModuleInit() {
        this.redis_client = new Redis()
    }
    async set(key: string, code: string, second: number) {
        return await this.redis_client.set(key, code, 'EX', second)
    }
    async get(key: string) {
       return  await this.redis_client.get(key)
    }
    async del(key: string) {
        return await this.redis_client.del(key)
    }

}
