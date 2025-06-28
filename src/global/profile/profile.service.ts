import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import * as path from "path"
import * as fs from "fs"

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService, private customError: CustomErrorService
  ) { }
  async findProfile(user_id: string) {
    await this.customError.findByUserId(user_id)
    const findUsersProfile = await this.customError.findById(user_id)
    return {
      success: true,
      findUsersProfile
    }
  }
  async create(payload: CreateProfileDto, user_id: string, file?: Express.Multer.File) {
    await this.customError.findById2(user_id)
    const avatar_url = file?.filename
    const result = await this.prisma.profile.create({
      data: {
        full_name: payload.full_name,
        country: payload.country,
        phone: payload.phone,
        avatar_url: avatar_url,
        user_id: user_id
      }
    })
    return {
      success: true,
      data: result
    }
  }


  async update(user_id: string, updateProfileDto: UpdateProfileDto, file?: Express.Multer.File) {
    const oldProfile = await this.customError.findById(user_id)
    const avatar_url = file?.filename
    if (file?.filename && oldProfile.avatar_url) {
      const oldPath = path.join(process.cwd(), 'uploads', oldProfile.avatar_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    const result = await this.prisma.profile.update({
      where: { user_id }, data: {
        avatar_url: avatar_url,
        country: updateProfileDto.country,
        full_name: updateProfileDto.full_name,
        phone: updateProfileDto.phone,
        user_id: user_id
      }
    })
    return {
      success: true,
      message: "successfully profile updated",
      data: result
    }
  }
  async deleteProfile(user_id: string) {
    const profile = await this.customError.findById(user_id)
    if (profile.avatar_url) {
      const filePath = path.join(process.cwd(), 'uploads', profile.avatar_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await this.prisma.profile.delete({ where: { user_id } })
    return {
      success: true,
      message: "successfully deleted"
    }
  }

}
