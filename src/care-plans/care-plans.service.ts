import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarePlan } from './schemas/care-plan.schema';
import { CarePlanAssignment } from './schemas/care-plan-assignment.schema';
import { RoomsService } from '../rooms/rooms.service';
import { BedsService } from '../beds/beds.service';
import { BedStatus } from '../beds/schemas/bed.schema';

@Injectable()
export class CarePlansService {
  constructor(
    @InjectModel(CarePlan.name) private carePlanModel: Model<CarePlan>,
    @InjectModel(CarePlanAssignment.name) private assignmentModel: Model<CarePlanAssignment>,
    private roomsService: RoomsService,
    private bedsService: BedsService,
  ) {}

  // 📋 Staff Workflow: Lấy danh sách gói dịch vụ
  async getAvailableCarePlans(): Promise<{
    mainPackages: CarePlan[];
    supplementaryPackages: CarePlan[];
  }> {
    const [mainPackages, supplementaryPackages] = await Promise.all([
      this.carePlanModel.find({ category: 'main', is_active: true }).sort({ monthly_price: 1 }),
      this.carePlanModel.find({ category: 'supplementary', is_active: true }).sort({ monthly_price: 1 })
    ]);

    return {
      mainPackages,
      supplementaryPackages
    };
  }

  // 📋 Staff Workflow: Tính chi phí dựa trên gói và loại phòng
  async calculateCost(carePlanIds: string[], roomType: string): Promise<{
    carePlansCost: number;
    roomCost: number;
    totalCost: number;
    breakdown: any[];
  }> {
    // Lấy thông tin các gói dịch vụ
    const carePlans = await this.carePlanModel.find({
      _id: { $in: carePlanIds }
    });

    if (carePlans.length !== carePlanIds.length) {
      throw new NotFoundException('Một hoặc nhiều gói dịch vụ không tồn tại');
    }

    // Tính chi phí gói dịch vụ
    const carePlansCost = carePlans.reduce((total, plan) => total + plan.monthly_price, 0);

    // Tính chi phí phòng (theo database schema)
    const roomPricing = {
      '2_bed': 8000000,
      '3_bed': 6500000,
      '4_5_bed': 5500000,
      '6_8_bed': 4500000
    };

    const roomCost = roomPricing[roomType] || 5500000;
    const totalCost = carePlansCost + roomCost;

    return {
      carePlansCost,
      roomCost,
      totalCost,
      breakdown: carePlans.map(plan => ({
        planName: plan.plan_name,
        cost: plan.monthly_price,
        type: plan.category
      }))
    };
  }

  // 📋 Staff Workflow: Đăng ký dịch vụ cho resident
  async createAssignment(assignmentData: {
    staffId: string;
    residentId: string;
    familyMemberId: string;
    carePlanIds: string[];
    roomType: string;
    familyPreferences?: any;
    consultationNotes?: string;
    additionalMedications?: any[];
  }): Promise<CarePlanAssignment> {
    // Tính chi phí
    const costCalculation = await this.calculateCost(assignmentData.carePlanIds, assignmentData.roomType);

    // Tìm phòng và giường phù hợp
    const availableRoom = await this.roomsService.findAvailableRoom(assignmentData.roomType);
    if (!availableRoom) {
      throw new BadRequestException(`Không có phòng loại ${assignmentData.roomType} nào có sẵn`);
    }

    const availableBed = await this.bedsService.findAvailableBedInRoom((availableRoom as any)._id.toString());
    if (!availableBed) {
      throw new BadRequestException(`Không có giường trống trong phòng ${availableRoom.name}`);
    }

    // Tạo assignment
    const assignment = new this.assignmentModel({
      staff_id: assignmentData.staffId,
      resident_id: assignmentData.residentId,
      family_member_id: assignmentData.familyMemberId,
      care_plan_ids: assignmentData.carePlanIds,
      registration_date: new Date(),
      consultation_notes: assignmentData.consultationNotes,
      selected_room_type: assignmentData.roomType,
      assigned_room_id: availableRoom._id,
      assigned_bed_id: availableBed._id,
      family_preferences: assignmentData.familyPreferences,
      total_monthly_cost: costCalculation.totalCost,
      room_monthly_cost: costCalculation.roomCost,
      care_plans_monthly_cost: costCalculation.carePlansCost,
      start_date: new Date(),
      additional_medications: assignmentData.additionalMedications || [],
      status: 'active',
      payment_status: 'pending'
    });

    const savedAssignment = await assignment.save();

    // Cập nhật trạng thái giường
    await this.bedsService.update((availableBed as any)._id.toString(), { status: BedStatus.OCCUPIED });

    return savedAssignment;
  }

  // 📋 Staff Workflow: Lấy danh sách assignments
  async getAssignments(filters: {
    staffId?: string;
    status?: string;
    paymentStatus?: string;
  } = {}): Promise<CarePlanAssignment[]> {
    const query: any = {};
    
    if (filters.staffId) query.staff_id = filters.staffId;
    if (filters.status) query.status = filters.status;
    if (filters.paymentStatus) query.payment_status = filters.paymentStatus;

    return this.assignmentModel
      .find(query)
      .populate('resident_id', 'full_name date_of_birth')
      .populate('family_member_id', 'fullName phone')
      .populate('care_plan_ids', 'plan_name monthly_price category')
      .populate('assigned_room_id', 'room_number floor')
      .populate('assigned_bed_id', 'bed_number')
      .sort({ createdAt: -1 });
  }

  // 📋 Staff Workflow: Cập nhật trạng thái thanh toán
  async updatePaymentStatus(assignmentId: string, paymentStatus: string, notes?: string): Promise<CarePlanAssignment> {
    const assignment = await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      { 
        payment_status: paymentStatus,
        $push: { notes: notes }
      },
      { new: true }
    );

    if (!assignment) {
      throw new NotFoundException(`Assignment với ID ${assignmentId} không tồn tại`);
    }

    return assignment;
  }

  // 📋 Admin function: Tạo gói dịch vụ mới
  async createCarePlan(carePlanData: Partial<CarePlan>): Promise<CarePlan> {
    const carePlan = new this.carePlanModel(carePlanData);
    return carePlan.save();
  }

  // 📋 General: Lấy chi tiết assignment
  async getAssignmentById(assignmentId: string): Promise<CarePlanAssignment> {
    const assignment = await this.assignmentModel
      .findById(assignmentId)
      .populate('resident_id')
      .populate('family_member_id')
      .populate('care_plan_ids')
      .populate('assigned_room_id')
      .populate('assigned_bed_id');

    if (!assignment) {
      throw new NotFoundException(`Assignment với ID ${assignmentId} không tồn tại`);
    }

    return assignment;
  }
} 