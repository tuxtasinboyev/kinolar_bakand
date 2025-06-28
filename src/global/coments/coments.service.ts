import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';

@Injectable()
export class ComentsService {
  constructor(private prisma: PrismaService, private customErrors: CustomErrorService) { }
  async create(createComentDto: CreateComentDto, user_id: string) {
    const findUser = await this.customErrors.findByUserId(user_id)
    const findRating = await this.prisma.movie.findFirst({ where: { rating: createComentDto.rating } })
    if (!findRating) throw new NotFoundException("this movies's not found rating!")

    const result = await this.prisma.review.create({
      data: {
        movieId: findRating.id,
        rating: findRating.rating,
        comment: createComentDto.comment,
        userId: user_id
      }
    })
    return {
      success: true,
      message: "review successfully joined ",
      data: {
        id: result.id,
        user: {
          id: findUser.id,
          username: findUser.username
        },
        movie_id: result.movieId,
        rating: result.rating,
        comment: result.comment,
        created_at: result.createdAt
      }
    }
  }
  async remove(user_id: string, review_id: string, movie_id: string) {
    await this.customErrors.findByUserId(user_id)
    await this.customErrors.findMovieById(movie_id)
    const findReview = await this.prisma.review.findUnique({ where: { id: review_id } })
    if (!findReview || findReview.movieId != movie_id || findReview.userId != user_id) throw new NotFoundException("This review not found or this review don't belong to your!")

    await this.prisma.review.delete({ where: { id: review_id } })
    return {
      success: true,
      message: "Review successfully deleted"
    }

  }
  async findAll() {
    const result = await this.prisma.review.findMany({
      include: {
        movie: {
          select: {
            id: true,
            rating: true,
            slug: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });
    return {
      success: true,
      data: result
    }
  }
  async deleteAllReviews(movie_id: string) {
    await this.prisma.review.deleteMany({ where: { movieId: movie_id } })
    return {
      success: true,
      message: "successfully delelted"
    }
  }
}
