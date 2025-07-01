import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private customErrors: CustomErrorService) { }


  async findAll(user_id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: user_id } })
    if (!checkUser || checkUser.can_read === false) throw new NotFoundException("user's permission not found or you don't alowed can_read!")

    const result = await this.prisma.user.findMany({
      where: {
        OR: [
          { role: 'admin' },
          { role: 'user' }
        ]
      }
    });

    return {
      success: true,
      data: result
    };
  }


  async findOne(id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: id } })
    if (!checkUser || checkUser.can_read === false) throw new NotFoundException("user's permission not found or you don't alowed can_read!")
    const result = await this.customErrors.findByUserId(id)

    return {
      success: true,
      data: result
    }
  }



  async remove(id: string) {
    const checkUser = await this.prisma.permission.findUnique({ where: { userId: id } })
    if (!checkUser || checkUser.can_delete === false) throw new NotFoundException("user's permission not found or you don't alowed can_delete!")
    await this.customErrors.findByUserId(id)
    await this.prisma.user.delete({ where: { id } })
    return {
      success: true,
      message: "successfully deleted"
    }
  }
}
