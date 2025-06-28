import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: path.join(process.cwd(), ".env")
  }),
  JwtModule.register({})],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule { }
