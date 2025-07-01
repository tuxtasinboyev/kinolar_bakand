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
        const can_read = true
        const can_add = true
        const can_update = true
        const can_delete = true
        const super_admin = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!super_admin) {
            const created = await this.prisma.user.create({
                data: {
                    email,
                    password_hash,
                    username,
                    role
                }
            })
            await this.prisma.permission.create({
                data: {
                    userId: created.id,
                    can_add,
                    can_delete,
                    can_read,
                    can_update
                }
            })
        }
        this.logger.log('super_admin created')
    }
}