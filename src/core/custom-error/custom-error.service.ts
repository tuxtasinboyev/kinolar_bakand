import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomErrorService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string) {
        const findUser = await this.prisma.user.findUnique({ where: { email } })
        if (findUser) throw new ConflictException("user already exist")

    }
    async existEmail(email: string) {
        const findUser = await this.prisma.user.findUnique({
            where: { email }, include: {
                subscriptions: {
                    select: {
                        plan: {
                            select: {
                                name: true
                            }
                        },
                        endDate: true
                    }
                }
            }
        })


        if (!findUser) throw new NotFoundException("user not found")
        return findUser
    }
    async findById(id: string) {
        const findUser = await this.prisma.profile.findUnique({ where: { user_id: id } })
        if (!findUser) throw new NotFoundException("user's profile not found")
        return findUser
    }
    async findById2(user_id: string) {
        const findUser = await this.prisma.profile.findUnique({ where: { user_id } })
        if (findUser) throw new ConflictException("user's profile already exist")
    }
    async findBySubsicriptId(id: string) {
        const findId = await this.prisma.subscription_plans.findUnique({ where: { id } })

        if (!findId) throw new NotFoundException("this subsicript plans not found")

        return findId
    }
    async findByUserId(id: string) {
        const findId = await this.prisma.user.findUnique({ where: { id } })

        if (!findId) throw new NotFoundException("user  not found")

        return findId
    }

    async findCategoryByName(name: string) {
        const category = await this.prisma.category.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } })
        if (!category) throw new NotFoundException("catregory not found")
        return category
    }
    async findMovieBySlug(slug: string) {
        const movie = await this.prisma.movie.findUnique({ where: { slug } })
        if (!movie) throw new NotFoundException("slug not found")
        return movie
    }
    async findMovieById(id: string) {
        const movie = await this.prisma.movie.findUnique({ where: { id } })
        if (!movie) throw new NotFoundException("id not found")
        return movie
    }

    async findReviewId(id: string) {
        const review = await this.prisma.review.findUnique({ where: { id } })
        if (!review) throw new NotFoundException("this review not found")
        return review
    }


}
