import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { TokenModule } from 'src/core/token/token.module';
import { MailesModule } from 'src/core/mailes/mailes.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { RedisModule } from 'src/core/redis/redis.module';

@Module({
  imports:[PrismaModule,TokenModule,MailesModule,CustomErrorModule,RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
