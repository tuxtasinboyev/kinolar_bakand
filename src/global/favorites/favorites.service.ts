import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService, private customError: CustomErrorService) { }
  async create(createFavoriteDto: CreateFavoriteDto, user_id: string) {
    const findMovie = await this.customError.findMovieById(createFavoriteDto.movie_id)

    const result = await this.prisma.favorite.create({
      data: {
        movieId: createFavoriteDto.movie_id,
        userId: user_id,
      }
    })
    return {
      success: true,
      message: "this movie favorite to join",
      data: {
        ...result,
        movie_title: findMovie.title
      }
    }

  }

  async findAll(user_id: string) {
    await this.customError.findByUserId(user_id)
    const result = await this.prisma.favorite.findMany({
      where: { userId: user_id },
      include: {
        movie: {
          select: {
            id: true,
            title: true,
            slug: true,
            posterUrl: true,
            releaseYear: true,
            rating: true,
            subscriptionType: true
          }
        }
      }
    })
    const total = await this.prisma.favorite.count({
      where: { userId: user_id }
    })
    return {
      success: true,
      data: {
        movies: result,
        total: total
      }
    }
  }
  async remove(movie_id: string, user_id: string) {
    await this.customError.findMovieById(movie_id)

    await this.prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId: user_id,
          movieId: movie_id,
        },
      },
    });
    return {
      success: true,
      message: "successfully deleted"
    }


  }
}
