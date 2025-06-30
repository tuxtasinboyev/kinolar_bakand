import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/register-auth.dto';
import { TokenService } from 'src/core/token/token.service';
import { MailesService } from 'src/core/mailes/mailes.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import { RedisService } from 'src/core/redis/redis.service';
import { VerifyDto } from './dto/verify-auth.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LoginDto } from './dto/login-auth.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private tokenServie: TokenService, private mailService: MailesService,
    private customService: CustomErrorService, private redisServise: RedisService,
    private prisma: PrismaService
  ) { }
  async register(createAuthDto: CreateAuthDto) {
    await this.customService.findByEmail(createAuthDto.email);

    const code = Math.floor(10000 + Math.random() * 90000);

    await this.mailService.sendEmail(
      createAuthDto.email,
      'Tasdiqlash kodi',
      code,
    );

    const key = `register:${createAuthDto.email.toLowerCase()}`;

    await this.redisServise.set(
      key,
      JSON.stringify({ ...createAuthDto, code }),
      1200,
    );

    return 'send verification code in email';
  }

  async Verification(codeVerify: VerifyDto) {
    const key = `register:${codeVerify.email.toLowerCase()}`;
    const redisUser = await this.redisServise.get(key);

    if (!redisUser)
      throw new NotFoundException('this user not found in the redis!');

    const userData = JSON.parse(redisUser);

    if (userData.code != codeVerify.code)
      throw new ConflictException('verification code invalid!');

    const hasshPassword = await bcrypt.hash(userData.password_hash, 10);

    const result = await this.prisma.user.create({
      data: {
        username: userData.username,
        email: codeVerify.email,
        password_hash: hasshPassword,
      },
    });

    const { password_hash, avatar_url, ...safeUser } = result;

    const accessToken = await this.tokenServie.accessToken(safeUser);
    const refreshToken = await this.tokenServie.refreshToken(safeUser);

    return {
      success: true,
      message: 'successfully registered',
      data: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async login(payload: LoginDto) {
    const existUser = await this.customService.existEmail(payload.email)

    const isMatch = await bcrypt.compare(payload.password_hash, existUser.password_hash)
    if (!isMatch) throw new ConflictException("password or email invalid")
    const { password_hash, avatar_url, ...safeUser } = existUser
    const accessToken = await this.tokenServie.accessToken(safeUser)
    const refreshToken = await this.tokenServie.refreshToken(safeUser)

    return {
      success: true,
      message: " succesfully login",
      data: {
        safeUser
      },
      accessToken,
      refreshToken
    }
  }


}
