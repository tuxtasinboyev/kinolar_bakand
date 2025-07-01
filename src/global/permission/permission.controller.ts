import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Post('add-permission')
  @ApiOperation({ summary: 'Create new permission for user' })
  @ApiResponse({ status: 201, description: 'Permission created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request or validation failed' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Get('getAll-permission')
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions returned' })
  findAll() {
    return this.permissionService.findAll();
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Get(':id')
  @ApiOperation({ summary: 'Get permission by ID' })
  @ApiResponse({ status: 200, description: 'Permission found' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Patch('update-permission')
  @ApiOperation({ summary: 'Update permission for a user' })
  @ApiResponse({ status: 200, description: 'Permission updated successfully' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(updatePermissionDto);
  }

  @UseGuards(GuardService)
  @Roles('superadmin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete permission by ID' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}
