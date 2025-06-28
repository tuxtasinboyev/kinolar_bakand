import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [PrismaModule, CustomErrorModule,JwtModule,CoreModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule { }
