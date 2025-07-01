import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService, private customErrors: CustomErrorService) { }
  async create(createPermissionDto: CreatePermissionDto) {
    await this.customErrors.findByUserId(createPermissionDto.userId)
    const result = await this.prisma.permission.create({
      data: {
        can_add: createPermissionDto.can_add,
        can_delete: createPermissionDto.can_delete,
        can_read: createPermissionDto.can_read,
        can_update: createPermissionDto.can_update,
        userId: createPermissionDto.userId
      }
    })
    return {
      success: true,
      message: "User Permission created",
      data: result

    }
  }

  async findAll() {
    try {
      const [information, totals] = await Promise.all([
        this.prisma.permission.findMany(),
        this.prisma.permission.count()
      ]);

      return {
        success: true,
        data: {
          information,
          totals
        }
      };
    } catch (error) {
      throw new InternalServerErrorException('this Permissions are taking ');
    }
  }


  async findOne(user_id: string) {

    const result = await this.prisma.permission.findUnique({
      where: {
        userId: user_id
      }
    })
    return {
      success: true,
      data: result
    }
  }

  async update(updatePermissionDto: UpdatePermissionDto) {
    const result = await this.prisma.permission.update({ where: { userId: updatePermissionDto.userId }, data: updatePermissionDto })
    return {
      success: true,
      message: "successfully updated",
      data: result
    }
  }

  async remove(user_id: string) {
    await this.customErrors.findByUserId(user_id)
    const result = await this.prisma.permission.delete({ where: { userId: user_id } })
    return {
      success: true,
      message: "successfully deleted"
    }
  }
}
