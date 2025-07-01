import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService, private customError: CustomErrorService) { }
  async findOne(slug: string, user_id?: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_read === false) throw new NotFoundException("user's permission not found or you don't alowed can_read!")
    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: {
              select: { name: true },
            },
          },
        },
        files: {
          select: {
            quality: true,
            language: true,
            fileUrl: true,
          },
        },
        reviews: true,
        favorites: user_id
          ? {
            where: { userId: user_id },
            select: { id: true },
          }
          : false,
      },
    });
    if (!movie) throw new NotFoundException("this movie not exist!!")
    const averageRating = movie.reviews.length
      ? movie.reviews.reduce((sum, r) => sum + Number(r.rating), 0) / movie.reviews.length
      : null;
    return {
      success: true,
      data: {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        description: movie.description,
        release_year: movie.releaseYear,
        duration_minutes: movie.durationMinutes,
        poster_url: movie.posterUrl,
        rating: movie.rating,
        subscription_type: movie.subscriptionType,
        view_count: movie.viewCount,
        is_favorite: user_id ? movie.favorites.length > 0 : false,
        categories: movie.categories.map(mc => mc.category.name),
        files: movie.files,
        reviews: {
          average_rating: averageRating,
          count: movie.reviews.length,
        },
      },
    };

  }
  async quaryPayloads(page: number, limit: number, search?: string, category?: string, subscription_type?: string) {
    const skip = (page - 1) * limit;

    const where: any = {
      AND: [],
    };

    if (search) {
      where.AND.push({
        title: {
          contains: search,
          mode: 'insensitive',
        },
      });
    }

    if (category) {
      where.AND.push({
        categories: {
          some: {
            category: {
              name: {
                equals: category,
                mode: 'insensitive',
              },
            },
          },
        },
      });
    }

    if (subscription_type) {
      where.AND.push({
        subscriptionType: subscription_type,
      });
    }

    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        where,
        skip,
        take: limit,
        include: {
          categories: {
            include: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.movie.count({ where }),
    ]);

    return {
      success: true,
      data: movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        poster_url: movie.posterUrl,
        release_year: movie.releaseYear,
        rating: movie.rating,
        subscription_type: movie.subscriptionType,
        categories: movie.categories.map((c) => c.category.name),
      })),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

}
