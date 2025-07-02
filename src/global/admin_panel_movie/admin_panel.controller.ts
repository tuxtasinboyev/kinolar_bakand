import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,
  UnsupportedMediaTypeException, UploadedFile, UseGuards, Req
} from '@nestjs/common';
import { AdminPanelService } from './admin_panel.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateAdminPanelDto } from './dto/update-admin_panel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from "path";
import { v4 as uuidV4 } from "uuid";
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';
import { FileUploads } from './dto/movie.file.dto';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiParam, ApiBody, ApiResponse
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Admin Panel Movie')
@ApiBearerAuth()
@Controller('admin-panel-movie')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) { }

  @UseGuards(GuardService)
  @Roles('admin')
  @Post('add-movie')
  @ApiOperation({ summary: 'Add new movie' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    description: 'Create a new movie with poster upload',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Avengers: Endgame' },
        description: { type: 'string', example: 'Marvel final saga' },
        release_year: { type: 'integer', example: 2019 },
        duration_minutes: { type: 'integer', example: 181 },
        category_ids: {
          type: 'array',
          items: { type: 'string' },
          example: ['d0a5e2e5-772c-4a3f-a69d-93dfdb24d84a']
        },
        poster: {
          type: 'string',
          format: 'binary',
          description: 'Poster image file (.jpg, .png)'
        }
      }
    }
  })


  @ApiResponse({
    status: 201,
    description: "Movie successfully created"
  })
  @UseInterceptors(FileInterceptor('poster', {
    storage: diskStorage({
      destination: path.join(process.cwd(), 'src', 'uploads', 'poster'),
      filename: (req, file, cb) => {
        let postName = uuidV4() + '_' + path.extname(file.originalname)
        cb(null, postName)
      }
    }),
    fileFilter(req, file, callback) {
      if (!file) {
        return callback(null, false)
      }
      const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("The type must be .jpeg|.jpg|.png"), false)
      }
      callback(null, true)
    },
  }))
  async create(@Body() createAdminPanelDto: CreateMovieDto, @UploadedFile() poster: Express.Multer.File, @Req() req) {
    const user_id = req['id']
    console.log(typeof createAdminPanelDto.category_ids);


    return await this.adminPanelService.create(createAdminPanelDto, poster.filename || null, user_id);
  }

  @UseGuards(GuardService)
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: "Get all movies" })
  @ApiResponse({ status: 200, description: "Movies successfully retrieved" })
  async findAll(@Req() req) {
    const user_id = req['id']
    return await this.adminPanelService.findAll(user_id);
  }

  @UseGuards(GuardService)
  @Roles('admin', 'user')
  @Get(':id')
  @ApiOperation({ summary: "Get a movie by ID" })
  @ApiParam({ name: "id", description: "Movie ID (UUID)" })
  @ApiResponse({ status: 200, description: "Movie successfully retrieved" })
  async findOne(@Param('id') id: string, @Req() req) {
    const user_id = req['id']
    return await this.adminPanelService.findOne(id, user_id);
  }

  @UseGuards(GuardService)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: "Update movie information" })
  @ApiParam({ name: "id", description: "Movie ID (UUID)" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: false,
    description: 'Update movie with optional poster upload',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'New title' },
        description: { type: 'string', example: 'Updated description' },
        release_year: { type: 'integer', example: 2024 },
        duration_minutes: { type: 'integer', example: 120 },
        category_ids: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
          example: ['91b2e5b5-5543-4c89-800f-a4eae6b23e2d']
        },
        poster: {
          type: 'string',
          format: 'binary',
          description: 'Optional poster image file'
        }
      }
    }
  })

  @ApiResponse({ status: 200, description: "Movie successfully updated" })
  @UseInterceptors(FileInterceptor('poster', {
    storage: diskStorage({
      destination: path.join(process.cwd(), 'src', 'uploads', 'poster'),
      filename: (req, file, cb) => {
        let postName = uuidV4() + '_' + path.extname(file.originalname)
        cb(null, postName)
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
  async update(@Param('id') id: string, @Body() updateAdminPanelDto: UpdateAdminPanelDto, @Req() req: Request, @UploadedFile() poster?: Express.Multer.File,) {
    const user_id = req['id']
    if (poster && poster.filename) {
      return await this.adminPanelService.update(id, updateAdminPanelDto, user_id, poster.filename);
    } else {
      return await this.adminPanelService.update(id, updateAdminPanelDto, user_id);

    }
  }

  @UseGuards(GuardService)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: "Delete a movie" })
  @ApiParam({ name: 'id', description: 'Movie ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Movie successfully deleted' })
  async remove(@Param('id') id: string) {
    return await this.adminPanelService.remove(id);
  }

  @UseGuards(GuardService)
  @Roles('admin')
  @Post('addMovieFile/:movie_id')
  @ApiOperation({ summary: "Upload video file to movie" })
  @ApiParam({ name: 'movie_id', description: 'Movie ID (UUID)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Video file',
        },
        quality: {
          type: 'string',
          enum: ['240p', '360p', '480p', '720p', '1080p', '4K'],
          description: 'Video quality'
        },
        language: {
          type: 'string',
          example: 'uz',
          description: 'Video language'
        }
      }
    }
  })

  @ApiResponse({ status: 201, description: 'Movie file successfully uploaded' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(process.cwd(), 'src', 'uploads', 'video'),
      filename: (req, file, cb) => {
        const filename = uuidV4() + path.extname(file.originalname);
        cb(null, filename);
      }
    }),
    fileFilter(req, file, callback) {
      const allowed: string[] = ['video/mp4', 'video/x-matroska', 'video/x-msvideo', 'video/webm', 'video/quicktime'];
      if (!allowed.includes(file.mimetype)) {
        throw new UnsupportedMediaTypeException("The video type must be mp4, mkv, avi, webm, or mov");
      }
      callback(null, true)
    },
  }))
  async addMovieFile(@UploadedFile() file: Express.Multer.File, @Body() payload: FileUploads, @Req() req, @Param('movie_id') movie_id: string) {
    const user_id = req['id'];
    const size_mb = file.size / (1024 * 1024)
    return await this.adminPanelService.addMovieFile(file.filename, payload, movie_id, user_id, size_mb)
  }
  @Get(':movie_id')
  getMovieFile(@Param('movie_id') movie_id: string) {
    return this.adminPanelService.getmovieFile(movie_id)
  }
}
