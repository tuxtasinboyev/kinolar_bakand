import { Module } from '@nestjs/common';
import { CustomErrorService } from './custom-error.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CustomErrorService],
  exports: [CustomErrorService]
})
export class CustomErrorModule { }
