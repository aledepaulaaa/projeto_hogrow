import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Request, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Update current user profile' })
  @Patch('me')
  updateProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete current user profile' })
  @Delete('me')
  removeProfile(@Request() req: any) {
    return this.usersService.remove(req.user.id);
  }

  @ApiOperation({ summary: 'Get current user company ranking list' })
  @Get('company-ranking')
  getCompanyRanking(@Request() req: any) {
    return this.usersService.getCompanyRanking(req.user.id);
  }

  @ApiOperation({ summary: 'Create a new reservation for the current user' })
  @Post('reservations')
  createReservation(@Request() req: any, @Body() body: any) {
    return this.usersService.createReservation(req.user.id, body);
  }

  @ApiOperation({ summary: 'Record a roulette spin for the current user' })
  @Post('spin')
  recordSpin(@Request() req: any, @Body() body: any) {
    return this.usersService.recordSpin(req.user.id, body.prizeName, body.points);
  }

  @ApiOperation({ summary: 'Get all users details (Admin only)' })
  @Get('admin/list')
  getAllUsersForAdmin() {
    return this.usersService.getAllUsersForAdmin();
  }

  @ApiOperation({ summary: 'Get access log details for analytics (Admin only)' })
  @Get('admin/analytics/access')
  getAccessLogsForAdmin() {
    return this.usersService.getAccessLogsForAdmin();
  }

  @ApiOperation({ summary: 'Get detailed campaign stats per user (Admin only)' })
  @Get('admin/analytics/campaign')
  getCampaignStatsForAdmin() {
    return this.usersService.getCampaignStatsForAdmin();
  }

  @ApiOperation({ summary: 'Update any user profile by ID (Admin only)' })
  @Patch('admin/:id')
  updateUserByAdmin(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete any user profile by ID (Admin only)' })
  @Delete('admin/:id')
  deleteUserByAdmin(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
