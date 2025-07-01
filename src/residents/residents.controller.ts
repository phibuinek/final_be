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
import { MedicationDto } from './dto/medication.dto';
import { FamilyAccessGuard } from '../users/guards/family-access.guard';

@ApiTags('residents')
@Controller('residents')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  private validateObjectId(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  @Post()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Create a new resident' })
  @ApiResponse({ status: 201, description: 'Resident created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createResidentDto: CreateResidentDto) {
    return this.residentsService.create(createResidentDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get all residents' })
  @ApiResponse({ status: 200, description: 'Residents retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.residentsService.findAll();
  }

  @Get(':id')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get a resident by ID' })
  @ApiResponse({ status: 200, description: 'Resident retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    this.validateObjectId(id);
    return this.residentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Update a resident' })
  @ApiResponse({ status: 200, description: 'Resident updated successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateResidentDto: UpdateResidentDto) {
    return this.residentsService.update(id, updateResidentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a resident' })
  @ApiResponse({ status: 200, description: 'Resident deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.residentsService.remove(id);
  }

  @Patch(':id/assign-bed/:bedId')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Assign bed to resident' })
  @ApiResponse({ status: 200, description: 'Bed assigned successfully.' })
  @ApiResponse({ status: 404, description: 'Resident or bed not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  assignBed(@Param('id') id: string, @Param('bedId') bedId: string) {
    return this.residentsService.assignBed(id, bedId);
  }

  @Post(':id/family-members/:familyMemberId')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Add a family member to a resident' })
  @ApiResponse({ status: 200, description: 'Family member added successfully.' })
  @ApiResponse({ status: 404, description: 'Resident or family member not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  addFamilyMember(@Param('id') id: string, @Param('familyMemberId') familyMemberId: string) {
    return this.residentsService.addFamilyMember(id, familyMemberId);
  }

  @Delete(':id/family-members/:familyMemberId')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Remove a family member from a resident' })
  @ApiResponse({ status: 200, description: 'Family member removed successfully.' })
  @ApiResponse({ status: 404, description: 'Resident or family member not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  removeFamilyMember(@Param('id') id: string, @Param('familyMemberId') familyMemberId: string) {
    return this.residentsService.removeFamilyMember(id, familyMemberId);
  }

  // Vital Signs endpoints
  @Post(':id/vital-signs')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Record vital signs for resident' })
  @ApiResponse({ status: 201, description: 'Vital signs recorded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  recordVitalSign(@Param('id') id: string, @Body() vitalSignDto: VitalSignDto) {
    vitalSignDto.residentId = id;
    return this.residentsService.recordVitalSign(vitalSignDto);
  }

  @Get(':id/vital-signs')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get vital signs for resident' })
  @ApiResponse({ status: 200, description: 'Vital signs retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getVitalSigns(@Param('id') id: string) {
    return this.residentsService.getVitalSigns(id);
  }

  // Care Plan endpoints
  @Post(':id/care-plans')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Create care plan for resident' })
  @ApiResponse({ status: 201, description: 'Care plan created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createCarePlan(@Param('id') id: string, @Body() carePlanDto: CarePlanDto) {
    return this.residentsService.createCarePlan(id, carePlanDto);
  }

  @Get(':id/care-plans')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get care plans for resident' })
  @ApiResponse({ status: 200, description: 'Care plans retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getCarePlans(@Param('id') id: string) {
    return this.residentsService.getCarePlans(id);
  }

  // Activity endpoints
  @Post(':id/activities')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Record activity for resident' })
  @ApiResponse({ status: 201, description: 'Activity recorded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  recordActivity(@Param('id') id: string, @Body() activityDto: ActivityDto) {
    activityDto.residentId = id;
    return this.residentsService.recordActivity(activityDto);
  }

  @Get(':id/activities')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get activities for resident' })
  @ApiResponse({ status: 200, description: 'Activities retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getActivities(@Param('id') id: string) {
    return this.residentsService.getActivities(id);
  }

  // Medication endpoints
  @Post(':id/medications')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Add medication for resident' })
  @ApiResponse({ status: 201, description: 'Medication added successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  addMedication(@Param('id') id: string, @Body() medicationDto: MedicationDto) {
    medicationDto.residentId = id;
    return this.residentsService.addMedication(medicationDto);
  }

  @Get(':id/medications')
  @UseGuards(FamilyAccessGuard)
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get medications for resident' })
  @ApiResponse({ status: 200, description: 'Medications retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getMedications(@Param('id') id: string) {
    return this.residentsService.getMedications(id);
  }

  @Patch(':id/medications/:index')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Update medication for resident' })
  @ApiResponse({ status: 200, description: 'Medication updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  updateMedication(
    @Param('id') id: string,
    @Param('index') index: number,
    @Body() medicationDto: MedicationDto
  ) {
    medicationDto.residentId = id;
    return this.residentsService.updateMedication(id, index, medicationDto);
  }

  @Delete(':id/medications/:index')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Discontinue medication for resident' })
  @ApiResponse({ status: 200, description: 'Medication discontinued successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Resident not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  discontinueMedication(@Param('id') id: string, @Param('index') index: number) {
    return this.residentsService.discontinueMedication(id, index);
  }
} 