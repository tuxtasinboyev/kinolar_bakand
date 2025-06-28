import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { CoreModule } from 'src/core/core.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,CustomErrorModule,JwtModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
