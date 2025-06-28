import { Injectable } from '@nestjs/common';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import * as bcrypt from "bcrypt"
@Injectable()
export class SuperAdminService {
  constructor(private prisma: PrismaService, private customErrors: CustomErrorService) { }
  async create(createSuperAdminDto: CreateSuperAdminDto, file: string) {
    await this.customErrors.findByEmail(createSuperAdminDto.email)
    const hasshPassword = await bcrypt.hash(createSuperAdminDto.password_hash, 10)
    const result = await this.prisma.user.create({
      data: {
        email: createSuperAdminDto.email,
        password_hash: hasshPassword,
        username: createSuperAdminDto.username,
        avatar_url: file,
        role: 'admin'

      }
    })
    const { password_hash, ...safeUser } = result
    return {
      success: true,
      data: safeUser
    }
  }

  async findAll() {
    const [information, total] = await Promise.all([
      this.prisma.user.findMany(),
      this.prisma.user.count(),
    ]);
    return {
      success: true,
      data: {
        information,
        total
      }
    }
  }

  async findOne(id: string) {
    const result = await this.customErrors.findByUserId(id)
    return {
      success: true,
      data: result
    }
  }

  async update(id: string, updateSuperAdminDto: UpdateSuperAdminDto, file: string) {
    await this.customErrors.findByUserId(id)
    const result = await this.prisma.user.update({ where: { id }, data: { ...updateSuperAdminDto, avatar_url: file } })
    const { password_hash, ...safeUser } = result
    return {
      success: true,
      safeUser
    }
  }

  async remove(id: string) {
    await this.customErrors.findByUserId(id)
    await this.prisma.user.delete({ where: { id } })
    return {
      success: true,
      message: "successfully deleted"
    }
  }
}
