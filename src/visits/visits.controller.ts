import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, Query } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitApprovalDto } from './dto/visit-approval.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { VisitStatus } from './schemas/visit.schema';

@ApiTags('visits')
@Controller('visits')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Schedule a new visit (Family Member only)' })
  @ApiResponse({ status: 201, description: 'Visit scheduled successfully.' })
  create(@Body() createVisitDto: CreateVisitDto, @Request() req) {
    // Note: In a real implementation, you'd need to get the familyMemberId from the user
    // This would require additional logic to map User to FamilyMember
    return this.visitsService.create(createVisitDto, req.user.userId);
  }

  @Get()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get all visits (Admin/Staff only)' })
  @ApiQuery({ name: 'status', required: false, enum: VisitStatus, description: 'Filter by visit status' })
  @ApiQuery({ name: 'residentId', required: false, type: String, description: 'Filter by resident ID' })
  findAll(@Query('status') status?: VisitStatus, @Query('residentId') residentId?: string) {
    if (status) {
      return this.visitsService.findByStatus(status);
    }
    if (residentId) {
      return this.visitsService.findByResident(residentId);
    }
    return this.visitsService.findAll();
  }

  @Get('my-visits')
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Get own visits (Family Member only)' })
  getMyVisits(@Request() req) {
    return this.visitsService.findByFamilyMember(req.user.userId);
  }

  @Get('pending')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get pending visits for approval (Admin/Staff only)' })
  getPendingVisits() {
    return this.visitsService.findByStatus(VisitStatus.PENDING);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Staff, Role.FamilyMember)
  @ApiOperation({ summary: 'Get a specific visit' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visitsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Update own visit (Family Member only)' })
  update(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Body() updateVisitDto: UpdateVisitDto,
    @Request() req
  ) {
    return this.visitsService.update(id, updateVisitDto, req.user.userId);
  }

  @Patch(':id/approve-reject')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Approve or reject a visit (Admin/Staff only)' })
  approveOrReject(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() approvalDto: VisitApprovalDto,
    @Request() req
  ) {
    return this.visitsService.approveOrReject(id, approvalDto, req.user.userId);
  }

  @Patch(':id/cancel')
  @Roles(Role.FamilyMember)
  @ApiOperation({ summary: 'Cancel own visit (Family Member only)' })
  cancel(@Param('id', ParseObjectIdPipe) id: string, @Request() req) {
    return this.visitsService.cancel(id, req.user.userId);
  }

  @Patch(':id/complete')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Mark visit as completed (Admin/Staff only)' })
  markAsCompleted(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visitsService.markAsCompleted(id);
  }
} 