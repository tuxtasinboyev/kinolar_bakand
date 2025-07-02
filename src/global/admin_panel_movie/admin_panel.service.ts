import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateAdminPanelDto } from './dto/update-admin_panel.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import { v4 as uuidV4 } from "uuid"
import { Prisma } from '@prisma/client';
import { FileUploads } from './dto/movie.file.dto';
import * as path from "path"
import * as fs from "fs"

@Injectable()
export class AdminPanelService {
  constructor(private prisma: PrismaService, private cusomErrors: CustomErrorService) { }
  async create(createAdminPanelDto: CreateMovieDto, poster: string | null, user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_add === false) throw new NotFoundException("user's permission not found or you don't alowed can_add!")
    const findUser = await this.cusomErrors.findByUserId(user_id)
    const findCategories = await this.prisma.category.findMany({
      where: {
        id: {
          in: createAdminPanelDto.category_ids,
        },
      },
    });
    if (findCategories.length !== createAdminPanelDto.category_ids.length) {
      throw new NotFoundException('category not found');
    }
    const result = await this.prisma.movie.create({
      data: {
        description: createAdminPanelDto.description,
        posterUrl: poster,
        releaseYear: createAdminPanelDto.release_year,
        title: createAdminPanelDto.title,
        createdBy: user_id,
        durationMinutes: createAdminPanelDto.duration_minutes,
        categories: {
          create: createAdminPanelDto.category_ids.map(category_id => ({
            category: {
              connect: { id: category_id }
            }
          }))
        },
        slug: uuidV4() + '-' + createAdminPanelDto.title.toLowerCase().replace(/\s+/g, '-'),
        rating: new Prisma.Decimal(0)

      }
    })
    return {
      success: true,
      data: result
    }
  }

  async findAll(user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_read === false) throw new NotFoundException("user's permission not found or you don't alowed can_read!")
    const result = await this.prisma.movie.findMany()
    const total = await this.prisma.movie.count()

    return {
      success: true,
      data: {
        movies: result,
        total: total
      }
    }
  }


  async findOne(id: string, user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_read === false) throw new NotFoundException("user's permission not found or you don't alowed can_read!")
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');

    if (!movie.durationMinutes || movie.durationMinutes <= 0) {
      throw new BadRequestException('Movie duration is invalid');
    }

    const watchedDuration = Math.floor(Math.random() * movie.durationMinutes);

    const watchedPercentage = Number(((watchedDuration / movie.durationMinutes) * 100).toFixed(2));

    const existing = await this.prisma.watchHistory.findUnique({
      where: {
        userId_movieId: {
          userId: user_id,
          movieId: id
        }
      }
    });

    if (existing) {
      const updated = await this.prisma.watchHistory.update({
        where: {
          userId_movieId: {
            userId: user_id,
            movieId: id
          }
        },
        data: {
          watchedDuration,
          watchedPercentage,
          lastWatched: new Date()
        }
      });

      return { success: true, updated, data: movie };
    }

    const created = await this.prisma.watchHistory.create({
      data: {
        userId: user_id,
        movieId: id,
        watchedDuration,
        watchedPercentage,
        lastWatched: new Date()
      }
    });

    return { success: true, message: 'this movie joined watch-history', data: movie };
  }

  async update(id: string, updateAdminPanelDto: UpdateAdminPanelDto, user_id: string, poster: string | null = null,) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_update === false) throw new NotFoundException("user's permission not found or you don't alowed !")
    const oldProfile = await this.cusomErrors.findByUserId(user_id)
    if (updateAdminPanelDto.category_ids && updateAdminPanelDto.category_ids.length > 0) {
      const categories = await this.prisma.category.findMany({
        where: {
          id: {
            in: updateAdminPanelDto.category_ids,
          },
        },
      });

      if (categories.length !== updateAdminPanelDto.category_ids.length) {
        throw new NotFoundException("One or more categories not found");
      }
    }
    const avatar_url = poster
    if (poster && oldProfile.avatar_url) {
      const oldPath = path.join(process.cwd(), 'uploads', oldProfile.avatar_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    const result = await this.prisma.movie.update({
      where: { id },
      data: {
        description: updateAdminPanelDto.description,
        posterUrl: poster,
        releaseYear: updateAdminPanelDto.release_year,
        title: updateAdminPanelDto.title,
        createdBy: user_id,
        durationMinutes: updateAdminPanelDto.duration_minutes,
        slug: uuidV4() + '-' + updateAdminPanelDto.title?.toLowerCase().replace(/\s+/g, '-'),
        rating: new Prisma.Decimal(0),

        categories: {
          deleteMany: {},
          create: updateAdminPanelDto.category_ids?.map((category_id) => ({
            category: {
              connect: { id: category_id }
            }
          }))
        }
      }
    });

    return {
      success: true,
      data: result
    }
  }

  async remove(id: string) {
    const oldProfile = await this.cusomErrors.findById(id)
    if (oldProfile.avatar_url) {
      const oldPath = path.join(process.cwd(), 'uploads', oldProfile.avatar_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await this.prisma.movie.delete({ where: { id } })
    return {
      success: true,
      message: "successfully deleted"
    }
  }
  async addMovieFile(filename: string, payload: FileUploads, movie_id: string, user_id, size_mb: number) {
    await this.cusomErrors.findMovieById(movie_id)
    await this.cusomErrors.findByUserId(user_id)

    const result = await this.prisma.movieFile.create({
      data: {
        fileUploadBy: user_id,
        fileUrl: filename,
        quality: payload.quality,
        language: payload.language,
        movieId: movie_id,
        sizeMb: size_mb
      }
    })
    return {
      success: true,
      message: "The movie successfully upload ",
      data: result
    }
  }
  async getmovieFile(movie_id: string) {
    await this.cusomErrors.findMovieById(movie_id)
    const result = this.prisma.movieFile.findFirst({ where: { movieId: movie_id } })
    return {
      success: true,
      data: result
    }
  }

}
