import { Module } from '@nestjs/common';
import { SeadersService } from './seaders.service';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports :[PrismaModule],
  providers: [SeadersService]
})
export class SeadersModule {}
