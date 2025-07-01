import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ComentsService } from './coments.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('coments')
export class ComentsController {
  constructor(private readonly comentsService: ComentsService) { }

  @UseGuards(GuardService)
  @Roles('user')
  @Post('addReview:slug')
  @ApiOperation({ summary: 'Add a review to a movie (user only)' })
  @ApiParam({ name: 'slug', description: 'Movie slug (unique identifier)', example: 'avengers-endgame' })
  @ApiResponse({ status: 201, description: 'Review successfully created' })
  @ApiResponse({ status: 201, description: 'Review successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid data or movie not found' })
  async create(@Body() createComentDto: CreateComentDto, @Req() req, @Param('slug') slug: string) {
    const user_id = req['id'];
    return this.comentsService.create(createComentDto, user_id, slug);
  }

  @UseGuards(GuardService)
  @Roles('user')
  @Delete(':movie_id/reviews/:review_id')
  @ApiOperation({ summary: 'Delete your own review (user only)' })
  @ApiParam({ name: 'movie_id', description: 'Movie ID (UUID)' })
  @ApiParam({ name: 'review_id', description: 'Review ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Review successfully deleted' })
  remove(@Param('movie_id') movie_id: string, @Param('review_id') review_id: string, @Req() req) {
    const user_id = req['id'];
    return this.comentsService.remove(user_id, review_id, movie_id);
  }

  @UseGuards(GuardService)
  @Roles('admin')
  @Get('getAll')
  @ApiOperation({ summary: 'Get all reviews (admin only)' })
  @ApiResponse({ status: 200, description: 'All reviews retrieved' })
  async findAll() {
    return await this.comentsService.findAll();
  }

  @UseGuards(GuardService)
  @Roles('admin')
  @Delete(':movie_id')
  @ApiOperation({ summary: 'Delete all reviews for a movie (admin only)' })
  @ApiParam({ name: 'movie_id', description: 'Movie ID (UUID)' })
  @ApiResponse({ status: 200, description: 'All reviews for the movie successfully deleted' })
  async deletedAllReaview(@Param('movie_id') movie_id: string, @Req() req) {
    const user_id = req['id']
    return await this.comentsService.deleteAllReviews(movie_id, user_id);
  }
}
