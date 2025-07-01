import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DailyActivitiesService } from './daily-activities.service';
import { DailyActivityDto } from './dto/daily-activity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { FamilyAccessGuard } from '../users/guards/family-access.guard';

@ApiTags('daily-activities')
@Controller('daily-activities')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class DailyActivitiesController {
  constructor(private readonly dailyActivitiesService: DailyActivitiesService) {}

  @Post()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Create daily activity record (Admin and Staff only)' })
  @ApiResponse({ status: 201, description: 'Daily activity record created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() dailyActivityDto: DailyActivityDto) {
    return this.dailyActivitiesService.create(dailyActivityDto);
  }

  @Get('resident/:residentId')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get resident activities' })
  @ApiResponse({ status: 200, description: 'Return resident activities.' })
  findByResident(
    @Param('residentId') residentId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.dailyActivitiesService.findByResident(
      residentId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get daily activity record by ID' })
  @ApiResponse({ status: 200, description: 'Return the daily activity record.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  findOne(@Param('id') id: string) {
    return this.dailyActivitiesService.findOne(id);
  }

  @Post(':id/activities')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Add activity to daily record (Admin and Staff only)' })
  @ApiResponse({ status: 201, description: 'Activity added successfully.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  addActivity(
    @Param('id') id: string,
    @Body() activity: any
  ) {
    return this.dailyActivitiesService.addActivity(id, activity);
  }

  @Patch(':id/activities/:index')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Update activity in daily record (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Activity updated successfully.' })
  @ApiResponse({ status: 404, description: 'Record or activity not found.' })
  updateActivity(
    @Param('id') id: string,
    @Param('index') index: number,
    @Body() activityUpdate: any
  ) {
    return this.dailyActivitiesService.updateActivity(id, index, activityUpdate);
  }

  @Patch(':id/meals')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Update meals in daily record (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Meals updated successfully.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  updateMeals(
    @Param('id') id: string,
    @Body() meals: any
  ) {
    return this.dailyActivitiesService.updateMeals(id, meals);
  }

  @Patch(':id/sleep')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Update sleep record (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Sleep record updated successfully.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  updateSleep(
    @Param('id') id: string,
    @Body() sleep: any
  ) {
    return this.dailyActivitiesService.updateSleep(id, sleep);
  }

  @Patch(':id/complete')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Mark daily record as complete (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Record marked as complete.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  completeDay(@Param('id') id: string) {
    return this.dailyActivitiesService.completeDay(id);
  }

  @Get('resident/:residentId/stats')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get activity statistics for resident' })
  @ApiResponse({ status: 200, description: 'Return activity statistics.' })
  getActivityStats(
    @Param('residentId') residentId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.dailyActivitiesService.getActivityStats(
      residentId,
      new Date(startDate),
      new Date(endDate)
    );
  }
} 