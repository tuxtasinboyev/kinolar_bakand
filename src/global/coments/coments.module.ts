import { Module } from '@nestjs/common';
import { ComentsService } from './coments.service';
import { ComentsController } from './coments.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,CustomErrorModule,JwtModule],
  controllers: [ComentsController],
  providers: [ComentsService],
})
export class ComentsModule {}
