import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';

@Injectable()
export class WatchHistoryService {
  constructor(private prisma: PrismaService, private customErrors: CustomErrorService) { }
  async findAll(user_id: string) {
    const [information, total] = await Promise.all([
      this.prisma.watchHistory.findMany({
        where: {
          userId: user_id
        }
      }),
      this.prisma.watchHistory.count()
    ])
    return {
      success: true,
      data: {
        information,
        total

      }
    }
  }
  async remove(movie_id: string, user_id: string) {
    await this.customErrors.findMovieById(movie_id)
    const findWatchByMovieId = await this.prisma.watchHistory.findFirst({
      where: {
        movieId: movie_id
      }
    })
    if (!findWatchByMovieId) {
      throw new NotFoundException("move_id not found!!")
    }
    await this.prisma.watchHistory.delete({
      where: {
        userId_movieId: {
          userId: user_id,
          movieId: movie_id
        }
      }
    })
    return {
      success: true,
      message: "successfully deleted"
    }
  }
  async update(movie_id: string, user_id: string, payload: UpdateWatchHistoryDto) {
    const existing = await this.prisma.watchHistory.findUnique({
      where: {
        userId_movieId: {
          movieId: movie_id,
          userId: user_id
        }
      }
    })
    if (!existing) {
      throw new NotFoundException('Watch history not found');
    }
    const result = await this.prisma.watchHistory.update({
      where: {
        userId_movieId: {
          userId: user_id,
          movieId: movie_id,
        },
      },
      data: payload
    });
    return {
      success: true,
      message: "successfully updated",
      data: result
    }
  }
}
