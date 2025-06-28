import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseInterceptors, UseGuards, Req, UploadedFile, Put,
  UnsupportedMediaTypeException
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from "path";
import { v4 as uuidV4 } from "uuid";
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth
} from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(GuardService)
  @Roles('user', 'admin', 'superadmin')
  @Post('create-profile')
  @ApiOperation({ summary: 'Profil yaratish (avatar bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        full_name: { type: 'string', example: 'Ali Valiyev' },
        phone: { type: 'string', example: '+998901234567' },
        country: { type: 'string', example: 'Uzbekistan' },
        avatar: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: path.join(process.cwd(), "uploads"),
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuidV4()}${ext}`;
        cb(null, filename);
      }
    }),
    fileFilter(req, file, callback) {
      const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("The type must be .jpeg|.jpg|.png"), false)
      }
      callback(null, true)
    },
  }))
  async create(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() createProfileDto: CreateProfileDto) {
    const user_id = req['id'];
    return await this.profileService.create(createProfileDto, user_id, file);
  }

  @UseGuards(GuardService)
  @Roles('user', 'admin', 'superadmin')
  @Get('getProfile')
  @ApiOperation({ summary: 'Profilni olish' })
  async findProfile(@Req() req) {
    const user_id = req['id'];
    return this.profileService.findProfile(user_id);
  }

  @UseGuards(GuardService)
  @Roles('user', 'admin', 'superadmin')
  @Put('update')
  @ApiOperation({ summary: 'Profilni yangilash (avatar bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        full_name: { type: 'string', example: 'Ali Valiyev' },
        phone: { type: 'string', example: '+998901234567' },
        country: { type: 'string', example: 'Uzbekistan' },
        avatar: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: path.join(process.cwd(), "uploads"),
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuidV4()}${ext}`;
        cb(null, filename);
      }
    }),
    fileFilter(req, file, callback) {
      const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("The type must be .jpeg|.jpg|.png"), false)
      }
      callback(null, true)
    },
  }))
  async update(@Req() req, @Body() updateProfileDto: UpdateProfileDto, @UploadedFile() file: Express.Multer.File) {
    const user_id = req['id'];
    return await this.profileService.update(user_id, updateProfileDto, file);
  }

  @UseGuards(GuardService)
  @Roles('user', 'admin', 'superadmin')
  @Delete()
  @ApiOperation({ summary: 'Profilni o‘chirish' })
  async deleteProfile(@Req() req) {
    const user_id = req['id'];
    return await this.profileService.deleteProfile(user_id);
  }
}
