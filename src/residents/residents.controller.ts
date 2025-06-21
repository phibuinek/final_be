import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ResidentsService } from './residents.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { VitalSignDto } from './dto/vital-sign.dto';
import { CarePlanDto } from './dto/care-plan.dto';
import { ActivityDto } from './dto/activity.dto';

@ApiTags('residents')
@Controller('residents')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  private validateObjectId(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  @Post()
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Create a new resident (Admin and Staff only)' })
  @ApiResponse({ status: 201, description: 'Resident created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createResidentDto: CreateResidentDto) {
    return this.residentsService.create(createResidentDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Get all residents (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Residents retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.residentsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Get resident by ID (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Resident retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    this.validateObjectId(id);
    return this.residentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Update resident by ID (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Resident updated successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateResidentDto: UpdateResidentDto) {
    return this.residentsService.update(id, updateResidentDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete resident by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Resident deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.residentsService.remove(id);
  }

  @Patch(':id/assign-bed/:bedId')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Assign bed to resident (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Bed assigned successfully.' })
  @ApiResponse({ status: 404, description: 'Resident or bed not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  assignBed(@Param('id') id: string, @Param('bedId') bedId: string) {
    return this.residentsService.assignBed(id, bedId);
  }

  @Patch(':id/add-family-member/:familyMemberId')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Add family member to resident (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Family member added successfully.' })
  @ApiResponse({ status: 404, description: 'Resident or family member not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  addFamilyMember(@Param('id') id: string, @Param('familyMemberId') familyMemberId: string) {
    return this.residentsService.addFamilyMember(id, familyMemberId);
  }

  @Patch(':id/remove-family-member/:familyMemberId')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Remove family member from resident (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Family member removed successfully.' })
  @ApiResponse({ status: 404, description: 'Resident or family member not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  removeFamilyMember(@Param('id') id: string, @Param('familyMemberId') familyMemberId: string) {
    return this.residentsService.removeFamilyMember(id, familyMemberId);
  }

  // Vital Signs endpoints
  @Post(':id/vital-signs')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Record vital signs for resident (Admin and Staff only)' })
  @ApiResponse({ status: 201, description: 'Vital signs recorded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  recordVitalSign(@Param('id') id: string, @Body() vitalSignDto: VitalSignDto) {
    vitalSignDto.residentId = id;
    return this.residentsService.recordVitalSign(vitalSignDto);
  }

  @Get(':id/vital-signs')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Get vital signs for resident (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Vital signs retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getVitalSigns(@Param('id') id: string) {
    return this.residentsService.getVitalSigns(id);
  }

  // Care Plan endpoints
  @Post(':id/care-plans')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Create care plan for resident (Admin and Staff only)' })
  @ApiResponse({ status: 201, description: 'Care plan created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createCarePlan(@Param('id') id: string, @Body() carePlanDto: CarePlanDto) {
    carePlanDto.residentId = id;
    return this.residentsService.createCarePlan(carePlanDto);
  }

  @Get(':id/care-plans')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Get care plans for resident (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Care plans retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getCarePlans(@Param('id') id: string) {
    return this.residentsService.getCarePlans(id);
  }

  // Activity endpoints
  @Post(':id/activities')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Record activity for resident (Admin and Staff only)' })
  @ApiResponse({ status: 201, description: 'Activity recorded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  recordActivity(@Param('id') id: string, @Body() activityDto: ActivityDto) {
    activityDto.residentId = id;
    return this.residentsService.recordActivity(activityDto);
  }

  @Get(':id/activities')
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiOperation({ summary: 'Get activities for resident (Admin and Staff only)' })
  @ApiResponse({ status: 200, description: 'Activities retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getActivities(@Param('id') id: string) {
    return this.residentsService.getActivities(id);
  }
} 