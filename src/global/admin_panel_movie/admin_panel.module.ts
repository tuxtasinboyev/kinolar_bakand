import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin_panel.service';
import { AdminPanelController } from './admin_panel.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, CustomErrorModule, JwtModule],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule { }
