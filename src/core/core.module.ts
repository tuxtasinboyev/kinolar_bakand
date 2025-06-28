import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GuardService } from './guard/guard.service';
import { RoleService } from './guard/role/role.service';
import { MailesModule } from './mailes/mailes.module';
import { TokenModule } from './token/token.module';
import { CustomErrorModule } from './custom-error/custom-error.module';
import { RedisModule } from './redis/redis.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, MailesModule, TokenModule, CustomErrorModule, RedisModule],
  providers: [GuardService, RoleService,JwtService]
})
export class CoreModule { }
