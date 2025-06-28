import { HttpException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    async onModuleInit() {
        try {

            await this.$connect()
        } catch (error) {
            throw new HttpException("database not connect", 500)
        }
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }
}
