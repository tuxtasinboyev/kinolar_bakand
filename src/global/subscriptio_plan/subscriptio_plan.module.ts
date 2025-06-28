import { Module } from '@nestjs/common';
import { SubscriptioPlanService } from './subscriptio_plan.service';
import { SubscriptioPlanController } from './subscriptio_plan.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,CustomErrorModule,JwtModule],
  controllers: [SubscriptioPlanController],
  providers: [SubscriptioPlanService],
})
export class SubscriptioPlanModule {}
