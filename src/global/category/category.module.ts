import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
