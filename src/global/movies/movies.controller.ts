import {
  Controller, Get, Req, Param, Query, UseGuards
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GuardService } from 'src/core/guard/guard.service';
import {
  ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @UseGuards(GuardService)
  @ApiBearerAuth()
  @Get('getSlug/:slug')
  @ApiOperation({ summary: 'Get movie details by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Slug of the movie',
    example: 'qasoskorlar-yakuniy-oyin'
  })
  @ApiResponse({
    status: 200,
    description: 'Movie successfully retrieved'
  })
  async findOne(@Param('slug') slug: string, @Req() req) {
    const user_id = req['id'];
    return await this.moviesService.findOne(slug, user_id);
  }

  @Get('getQuery')
  @ApiOperation({ summary: 'Get all movies with filtering, pagination and search' })
  @ApiQuery({ name: 'page', required: false, example: '1', description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: '10', description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, example: 'Avengers', description: 'Search by movie title' })
  @ApiQuery({ name: 'category', required: false, example: 'action', description: 'Filter by category slug' })
  @ApiQuery({ name: 'subscription_type', required: false, example: 'free', description: 'Filter by subscription type (free or premium)' })
  @ApiResponse({ status: 200, description: 'List of filtered movies with pagination' })
  
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('subscription_type') subscription_type?: string
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    return await this.moviesService.quaryPayloads(pageNum, limitNum, search, category, subscription_type);
  }
}
