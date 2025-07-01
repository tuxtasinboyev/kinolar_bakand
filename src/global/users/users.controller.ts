import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(GuardService)
  @Roles('superadmin', 'admin')
  @Get()
  @ApiOperation({ summary: 'Get all users (admin/superadmin only)' })
  @ApiResponse({ status: 200, description: 'List of users returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient role' })
  findAll(@Req() req) {
    const user_id: string = req['id']
    return this.usersService.findAll(user_id);
  }

  @UseGuards(GuardService)
  @Roles('superadmin', 'admin')
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (admin/superadmin only)' })
  @ApiResponse({ status: 200, description: 'User data returned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient role' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(GuardService)
  @Roles('superadmin', 'admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID (admin/superadmin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient role' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
