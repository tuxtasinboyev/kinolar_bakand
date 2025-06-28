import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { CoreModule } from 'src/core/core.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CustomErrorModule } from 'src/core/custom-error/custom-error.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CoreModule, PrismaModule, CustomErrorModule, JwtModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule { }
