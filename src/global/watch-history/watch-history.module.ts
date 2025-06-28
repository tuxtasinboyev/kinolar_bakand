import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { WatchHistoryController } from './watch-history.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,CustomErrorModule,JwtModule],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService],
})
export class WatchHistoryModule {}
