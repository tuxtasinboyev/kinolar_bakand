import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';

@Injectable()
export class WatchHistoryService {
  constructor(private prisma: PrismaService, private customErrors: CustomErrorService) { }
  async create(createWatchHistoryDto: CreateWatchHistoryDto, user_id: string) {
    const exists = await this.prisma.watchHistory.findUnique({
      where: {
        userId_movieId: {
          userId: user_id,
          movieId: createWatchHistoryDto.movieId
        }
      }
    })
    if (exists) {
      return await this.prisma.watchHistory.update({
        where: {
          userId_movieId: {
            userId: user_id,
            movieId: createWatchHistoryDto.movieId
          }
        },
        data: {
          watchedDuration: createWatchHistoryDto.watchedDuration,
          watchedPercentage: createWatchHistoryDto.watchedPercentage,
          lastWatched: new Date()
        }
      })
    }
    const result = await this.prisma.watchHistory.create({
      data: {
        userId: user_id,
        movieId: createWatchHistoryDto.movieId,
        watchedDuration: createWatchHistoryDto.watchedDuration,
        watchedPercentage: createWatchHistoryDto.watchedPercentage
      }
    })
    return {
      success: true,
      message: "successfully created",
      data: result
    }
  }

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
}
