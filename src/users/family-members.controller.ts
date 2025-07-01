import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Request,
  BadRequestException,
  ForbiddenException,
  ParseUUIDPipe,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { FamilyMembersService } from './family-members.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { IsMongoId } from 'class-validator';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

interface FamilyMemberWithId {
  _id: {
    toString(): string;
  };
}

@ApiTags('family-members')
@ApiBearerAuth('JWT-auth')
@Controller('family-members')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new family member' })
  @ApiResponse({ 
    status: 201, 
    description: 'The family member account has been successfully created.',
    type: CreateFamilyMemberDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin role.' })
  create(@Body() createFamilyMemberDto: CreateFamilyMemberDto) {
    return this.familyMembersService.create(createFamilyMemberDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get all family members' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all family members.',
    type: [CreateFamilyMemberDto]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin or Staff role.' })
  findAll() {
    return this.familyMembersService.findAll();
  }

  @Get('profile')
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Get own profile (Family member only)' })
  @ApiResponse({ status: 200, description: 'Return family member profile.' })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin role.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  getProfile(@Request() req) {
    if (!req.user?.userId) {
      throw new BadRequestException('User ID not found in request');
    }
    return this.familyMembersService.findByUser(req.user.userId);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get a family member by ID' })
  @ApiParam({ name: 'id', description: 'Family member ID (MongoDB ObjectId)' })
  @ApiResponse({ 
    status: 200, 
    description: 'The found family member.',
    type: CreateFamilyMemberDto
  })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin or Staff role.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.familyMembersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a family member' })
  @ApiParam({ name: 'id', description: 'Family member ID (MongoDB ObjectId)' })
  @ApiBody({ type: CreateFamilyMemberDto })
  @ApiResponse({ 
    status: 200, 
    description: 'The family member has been successfully updated.',
    type: CreateFamilyMemberDto
  })
  @ApiResponse({ status: 400, description: 'Invalid input data or ID format.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin role.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    return this.familyMembersService.update(id, updateFamilyMemberDto);
  }

  @Post(':id/residents/:residentId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Add a resident to a family member' })
  @ApiResponse({ status: 200, description: 'Resident added successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Family member or resident not found.' })
  addResident(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('residentId', ParseObjectIdPipe) residentId: string
  ) {
    return this.familyMembersService.addResident(id, residentId);
  }

  @Delete(':id/residents/:residentId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove a resident from a family member' })
  @ApiResponse({ status: 200, description: 'Resident removed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Family member or resident not found.' })
  removeResident(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('residentId', ParseObjectIdPipe) residentId: string
  ) {
    return this.familyMembersService.removeResident(id, residentId);
  }

  @Patch(':id/notification-preferences')
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Update notification preferences (Family member only)' })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin role.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  async updateNotificationPreferences(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(new ValidationPipe({ transform: true })) preferences: UpdateNotificationPreferencesDto,
    @Request() req
  ) {
    // Kiểm tra xem family member có đang cập nhật preferences của chính họ không
    const familyMember = await this.familyMembersService.findByUser(req.user.userId) as FamilyMemberWithId;
    if (familyMember._id.toString() !== id) {
      throw new ForbiddenException('You can only update your own notification preferences');
    }
    return this.familyMembersService.updateNotificationPreferences(id, preferences);
  }

  @Patch(':id/complete-setup')
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Complete initial setup (Family member only)' })
  @ApiResponse({ status: 200, description: 'Setup completed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires Admin role.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  async completeSetup(
    @Param('id', ParseObjectIdPipe) id: string,
    @Request() req
  ) {
    // Kiểm tra xem family member có đang hoàn thành setup của chính họ không
    const familyMember = await this.familyMembersService.findByUser(req.user.userId) as FamilyMemberWithId;
    if (familyMember._id.toString() !== id) {
      throw new ForbiddenException('You can only complete your own setup');
    }
    return this.familyMembersService.completeSetup(id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Deactivate family member (Admin only)' })
  @ApiResponse({ status: 200, description: 'Family member deactivated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  deactivate(@Param('id', ParseObjectIdPipe) id: string) {
    return this.familyMembersService.deactivate(id);
  }

  @Post('resend-credentials/:id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Resend login credentials to family member (Admin only)' })
  @ApiResponse({ status: 200, description: 'Credentials sent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Family member not found.' })
  resendCredentials(@Param('id', ParseObjectIdPipe) id: string) {
    return this.familyMembersService.resendCredentials(id);
  }
} 