import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redis_client: RedisClient;

  async onModuleInit() {
    this.redis_client = new Redis('rediss://default:0c9706fde38a4fa797a3c52a0ca34ba2@gusc1-enabled-griffon-32054.upstash.io:32054');


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
