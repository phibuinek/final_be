import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Query,
  UseGuards,
  Request,
  BadRequestException 
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CarePlansService } from './care-plans.service';

@ApiTags('care-plans')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('care-plans')
export class CarePlansController {
  constructor(private readonly carePlansService: CarePlansService) {}

  // 📋 Staff Workflow: Lấy danh sách gói dịch vụ có sẵn
  @Get('available')
  @Roles(Role.Staff, Role.Admin)
  @ApiOperation({ summary: 'Lấy danh sách gói dịch vụ chăm sóc có sẵn' })
  @ApiResponse({ status: 200, description: 'Danh sách gói dịch vụ theo danh mục' })
  async getAvailableCarePlans() {
    return this.carePlansService.getAvailableCarePlans();
  }

  // 📋 Staff Workflow: Tính chi phí dịch vụ
  @Post('calculate-cost')
  @Roles(Role.Staff, Role.Admin)
  @ApiOperation({ summary: 'Tính chi phí dựa trên gói dịch vụ và loại phòng' })
  @ApiResponse({ status: 200, description: 'Chi phí chi tiết' })
  async calculateCost(@Body() data: {
    carePlanIds: string[];
    roomType: string;
  }) {
    if (!data.carePlanIds || data.carePlanIds.length === 0) {
      throw new BadRequestException('Cần chọn ít nhất 1 gói dịch vụ');
    }

    if (!data.roomType) {
      throw new BadRequestException('Cần chọn loại phòng');
    }

    return this.carePlansService.calculateCost(data.carePlanIds, data.roomType);
  }

  // 📋 Staff Workflow: Tạo đăng ký dịch vụ (Service Registration)
  @Post('assignments')
  @Roles(Role.Staff, Role.Admin)
  @ApiOperation({ summary: 'Đăng ký dịch vụ chăm sóc cho resident' })
  @ApiResponse({ status: 201, description: 'Đăng ký dịch vụ thành công' })
  async createAssignment(@Request() req, @Body() assignmentData: {
    residentId: string;
    familyMemberId: string;
    carePlanIds: string[];
    roomType: string;
    familyPreferences?: {
      preferred_room_gender?: string;
      preferred_floor?: number;
      special_requests?: string;
    };
    consultationNotes?: string;
    additionalMedications?: {
      medication_name: string;
      dosage: string;
      frequency: string;
    }[];
  }) {
    return this.carePlansService.createAssignment({
      staffId: req.user.userId,
      ...assignmentData
    });
  }

  // 📋 Staff Workflow: Lấy danh sách assignments
  @Get('assignments')
  @Roles(Role.Staff, Role.Admin)
  @ApiOperation({ summary: 'Lấy danh sách đăng ký dịch vụ' })
  @ApiResponse({ status: 200, description: 'Danh sách assignments' })
  async getAssignments(
    @Request() req,
    @Query('status') status?: string,
    @Query('paymentStatus') paymentStatus?: string,
    @Query('allStaff') allStaff?: string
  ) {
    const filters: any = {};
    
    // Nếu không phải admin và không có flag allStaff, chỉ lấy assignments của staff hiện tại
    if (req.user.role !== 'admin' && allStaff !== 'true') {
      filters.staffId = req.user.userId;
    }
    
    if (status) filters.status = status;
    if (paymentStatus) filters.paymentStatus = paymentStatus;

    return this.carePlansService.getAssignments(filters);
  }

  // 📋 Staff Workflow: Lấy chi tiết assignment
  @Get('assignments/:id')
  @Roles(Role.Staff, Role.Admin)
  @ApiOperation({ summary: 'Lấy chi tiết đăng ký dịch vụ' })
  @ApiResponse({ status: 200, description: 'Chi tiết assignment' })
  async getAssignmentById(@Param('id') id: string) {
    return this.carePlansService.getAssignmentById(id);
  }

  // 📋 Staff Workflow: Cập nhật trạng thái thanh toán (Payment Update)
  @Put('assignments/:id/payment')
  @Roles(Role.Staff, Role.Admin)
  @ApiOperation({ summary: 'Cập nhật trạng thái thanh toán' })
  @ApiResponse({ status: 200, description: 'Cập nhật thanh toán thành công' })
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() data: {
      paymentStatus: 'pending' | 'partially_paid' | 'fully_paid' | 'overdue';
      notes?: string;
    }
  ) {
    return this.carePlansService.updatePaymentStatus(id, data.paymentStatus, data.notes);
  }

  // 📋 Admin Only: Tạo gói dịch vụ mới
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Tạo gói dịch vụ chăm sóc mới (Admin only)' })
  @ApiResponse({ status: 201, description: 'Tạo gói dịch vụ thành công' })
  async createCarePlan(@Body() carePlanData: {
    plan_name: string;
    description: string;
    monthly_price: number;
    plan_type: string;
    category: 'main' | 'supplementary';
    services_included: string[];
    staff_ratio: string;
    duration_type?: string;
    default_medications?: string[];
    prerequisites?: string[];
    contraindications?: string[];
  }) {
    return this.carePlansService.createCarePlan(carePlanData);
  }
} 