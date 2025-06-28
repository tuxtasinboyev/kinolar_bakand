import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async accessToken(payload: any) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('Jwt_Secret_Key'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN')
        })
    }
    async refreshToken(payload: any) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('refreshExpiresIn')
        })
    }
}
