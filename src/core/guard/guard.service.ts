import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GuardService implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('token is not defined')
        }
        const token = authHeader.split(' ')[1]
        try {
            const { id, role, } = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('Jwt_Secret_Key') })
            req['id'] = id
            req['role'] = role
        } catch (error) {
            throw new UnauthorizedException()

        }
        return true
    }
}   
