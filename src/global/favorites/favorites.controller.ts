import {
  Controller, Get, Post, Body, Delete, Req, UseGuards
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GuardService } from 'src/core/guard/guard.service';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody
} from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(GuardService)
  @Post('add')
  @ApiOperation({ summary: 'Add a movie to favorites' })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiResponse({ status: 201, description: 'Movie successfully added to favorites' })
  async create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req) {
    const user_id = req['id'];
    return this.favoritesService.create(createFavoriteDto, user_id);
  }

  @UseGuards(GuardService)
  @Get()
  @ApiOperation({ summary: 'Get user\'s favorite movies' })
  @ApiResponse({ status: 200, description: 'List of favorite movies' })
  async findAll(@Req() req) {
    const user_id = req['id'];
    return this.favoritesService.findAll(user_id);
  }

  @UseGuards(GuardService)
  @Delete()
  @ApiOperation({ summary: 'Remove a movie from favorites' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        movie_id: {
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440021',
          description: 'UUID of the movie to remove from favorites'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Movie removed from favorites' })
  remove(@Req() req, @Body('movie_id') movie_id: string) {
    const user_id = req['id'];
    return this.favoritesService.remove(movie_id, user_id);
  }
}
