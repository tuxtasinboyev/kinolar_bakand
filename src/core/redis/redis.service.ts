import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
    private redis_client: Redis;

    async onModuleInit() {
        this.redis_client = new Redis({
            host: 'redis-11971.c8.us-east-1-3.ec2.redns.redis-cloud.com',
            port: 11971,
            username: 'default',
            password: 'BsQ77q1LdFnS8jpRHC24ViCRflxDuwRV',
            tls: {}
        });

        this.redis_client.on('connect', () => {
            console.log('Redis connected successfully');
        });

        this.redis_client.on('error', (err) => {
            console.error('Redis connection error:', err);
        });
    }

    async set(key: string, value: string, second: number) {
        return await this.redis_client.set(key, value, 'EX', second);
    }

    async get(key: string) {
        return await this.redis_client.get(key);
    }

    async del(key: string) {
        return await this.redis_client.del(key);
    }
}
