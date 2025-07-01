import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
  UseInterceptors, UnsupportedMediaTypeException, UploadedFile
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from "path";
import { v4 as uuidV4 } from "uuid";
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes,
  ApiParam, ApiResponse, ApiBody
} from '@nestjs/swagger';

@ApiTags('Super Admin')
@ApiBearerAuth()
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) { }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Post('addAdmin')
  @ApiOperation({ summary: 'Create a new admin (by superadmin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Admin creation form',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin01' },
        email: { type: 'string', example: 'admin01@example.com' },
        password_hash: { type: 'string', example: 'StrongPass123!' },
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Admin avatar image file (.jpg/.png)'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Admin successfully created' })
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: path.join(process.cwd(), "src", "uploads", "admin-img"),
      filename(req, file, cb) {
        const filename = uuidV4() + path.extname(file.originalname);
        cb(null, filename);
      },
    }),
    fileFilter(req, file, callback) {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("the type must be .jpeg|.jpg|.png"), false);
      }
      callback(null, true);
    },
  }))
  async create(
    @Body() createSuperAdminDto: CreateSuperAdminDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.superAdminService.create(createSuperAdminDto, file.filename);
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'All admins successfully fetched' })
  async findAll() {
    return await this.superAdminService.findAll();
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Admin found by ID' })
  async findOne(@Param('id') id: string) {
    return await this.superAdminService.findOne(id);
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Patch(':id') 
  @ApiOperation({ summary: 'Update admin profile' })
  @ApiParam({ name: 'id', description: 'Admin ID (UUID)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Admin update form',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'newadmin01' },
        email: { type: 'string', example: 'newadmin@example.com' },
        password_hash: { type: 'string', example: 'NewStrongPass123!' },
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'New avatar image (.jpg/.png)'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Admin updated successfully' })
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: path.join(process.cwd(), "src", "uploads", "admin-img"),
      filename(req, file, cb) {
        const filename = uuidV4() + path.extname(file.originalname);
        cb(null, filename);
      },
    }),
    fileFilter(req, file, callback) {
      if (!file) {
        callback(null, false)
      }
      const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("the type must be .jpeg|.jpg|.png"), false);
      }
      callback(null, true);
    },
  }))
  async update(
    @Param('id') id: string,
    @Body() updateSuperAdminDto: UpdateSuperAdminDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      return await this.superAdminService.update(id, updateSuperAdminDto, file.filename || null);
    } else {
      return await this.superAdminService.update(id, updateSuperAdminDto);
    }
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  async remove(@Param('id') id: string) {
    return await this.superAdminService.remove(id);
  }
}
