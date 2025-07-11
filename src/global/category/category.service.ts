import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto, user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_add === false) throw new NotFoundException("user's permission not found or you don't alowed can_create!")
    const result = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        slug: createCategoryDto.slug
      }
    })
    return {
      success: true,
      data: result
    }
  }

  async findAll() {
    const result = await this.prisma.category.findMany();
    const total = await this.prisma.category.count()
    return {
      success: true,
      data: result,
      totals: total
    }
  }

  async findOne(id: string) {
    const findCategory = await this.prisma.category.findUnique({ where: { id } })
    if (!findCategory) throw new NotFoundException("category not found!")
    return {
      success: true,
      data: findCategory
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_update === false) throw new NotFoundException("user's permission not found or you don't alowed can_update!")
    const findCategory = await this.prisma.category.findUnique({ where: { id } })
    if (!findCategory) throw new NotFoundException("category not found!")

    const result = await this.prisma.category.update({
      where: { id }, data: updateCategoryDto
    })
    return {
      success: true,
      message: "successfully updated",
      data: result
    }

  }

  async remove(id: string, user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_delete === false) throw new NotFoundException("user's permission not found or you don't alowed can_delete!")
    const findCategory = await this.prisma.category.findUnique({ where: { id } })
    if (!findCategory) throw new NotFoundException("category not found!")

    await this.prisma.category.delete({ where: { id } })
    return {
      success: true,
      message: "successfully deleted"
    }
  }
}
