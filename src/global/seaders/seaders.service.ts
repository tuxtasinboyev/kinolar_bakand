import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeadersService implements OnModuleInit {
    private logger = new Logger('seeder')
    constructor(private prisma: PrismaService, private configService: ConfigService) { }
    async onModuleInit() {
        await this.userSeeder()
    }
    async userSeeder() {
        const username = "Omadbeka"
        const email = "omadbektuxtasinboyev06@gmail.com"
        const plainPassword = this.configService.get('PASS') as string
        const password_hash = await bcrypt.hash(plainPassword, 10);
        const role = 'superadmin';


        const super_admin = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!super_admin) {
            await this.prisma.user.create({
                data: {
                    email,
                    password_hash,
                    username,
                    role
                }
            })
        }
        this.logger.log('super_admin created')
    }
}