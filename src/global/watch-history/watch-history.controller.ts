import { Controller, Get, Post, Body, Delete, Param, Req, UseGuards, Patch } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { GuardService } from 'src/core/guard/guard.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Watch History')
@ApiBearerAuth()
@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) { }

  @UseGuards(GuardService)
  @Get()
  @ApiOperation({ summary: 'Get all watch history for current user' })
  @ApiResponse({ status: 200, description: 'List of watch history returned' })
  async findAll(@Req() req) {
    const user_id = req['id']
    return this.watchHistoryService.findAll(user_id);
  }

  @UseGuards(GuardService)
  @Delete(':movie_id')
  @ApiOperation({ summary: 'Delete watch history for a specific movie' })
  @ApiParam({ name: 'movie_id', description: 'Movie ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Watch history successfully deleted' })
  remove(@Param('movie_id') movie_id: string, @Req() req) {
    const user_id = req['id']
    return this.watchHistoryService.remove(movie_id, user_id);
  }
  @UseGuards(GuardService)
  @Patch(':movie_id')
  @ApiOperation({ summary: 'Update watch history for a specific movie' })
  @ApiParam({ name: 'movie_id', description: 'Movie ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Watch history successfully updated' })
  update(
    @Param('movie_id') movie_id: string,
    @Body() payload: UpdateWatchHistoryDto,
    @Req() req
  ) {
    const user_id = req['id'];
    return this.watchHistoryService.update(movie_id, user_id, payload);
  }


}
