import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, CustomErrorModule,JwtModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule { }
