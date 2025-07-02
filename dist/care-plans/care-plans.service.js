"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarePlansService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const care_plan_schema_1 = require("./schemas/care-plan.schema");
const care_plan_assignment_schema_1 = require("./schemas/care-plan-assignment.schema");
const rooms_service_1 = require("../rooms/rooms.service");
const beds_service_1 = require("../beds/beds.service");
const bed_schema_1 = require("../beds/schemas/bed.schema");
let CarePlansService = class CarePlansService {
    carePlanModel;
    assignmentModel;
    roomsService;
    bedsService;
    constructor(carePlanModel, assignmentModel, roomsService, bedsService) {
        this.carePlanModel = carePlanModel;
        this.assignmentModel = assignmentModel;
        this.roomsService = roomsService;
        this.bedsService = bedsService;
    }
    async getAvailableCarePlans() {
        const [mainPackages, supplementaryPackages] = await Promise.all([
            this.carePlanModel.find({ category: 'main', is_active: true }).sort({ monthly_price: 1 }),
            this.carePlanModel.find({ category: 'supplementary', is_active: true }).sort({ monthly_price: 1 })
        ]);
        return {
            mainPackages,
            supplementaryPackages
        };
    }
    async calculateCost(carePlanIds, roomType) {
        const carePlans = await this.carePlanModel.find({
            _id: { $in: carePlanIds }
        });
        if (carePlans.length !== carePlanIds.length) {
            throw new common_1.NotFoundException('Một hoặc nhiều gói dịch vụ không tồn tại');
        }
        const carePlansCost = carePlans.reduce((total, plan) => total + plan.monthly_price, 0);
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
    async createAssignment(assignmentData) {
        const costCalculation = await this.calculateCost(assignmentData.carePlanIds, assignmentData.roomType);
        const availableRoom = await this.roomsService.findAvailableRoom(assignmentData.roomType);
        if (!availableRoom) {
            throw new common_1.BadRequestException(`Không có phòng loại ${assignmentData.roomType} nào có sẵn`);
        }
        const availableBed = await this.bedsService.findAvailableBedInRoom(availableRoom._id.toString());
        if (!availableBed) {
            throw new common_1.BadRequestException(`Không có giường trống trong phòng ${availableRoom.name}`);
        }
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
        await this.bedsService.update(availableBed._id.toString(), { status: bed_schema_1.BedStatus.OCCUPIED });
        return savedAssignment;
    }
    async getAssignments(filters = {}) {
        const query = {};
        if (filters.staffId)
            query.staff_id = filters.staffId;
        if (filters.status)
            query.status = filters.status;
        if (filters.paymentStatus)
            query.payment_status = filters.paymentStatus;
        return this.assignmentModel
            .find(query)
            .populate('resident_id', 'full_name date_of_birth')
            .populate('family_member_id', 'fullName phone')
            .populate('care_plan_ids', 'plan_name monthly_price category')
            .populate('assigned_room_id', 'room_number floor')
            .populate('assigned_bed_id', 'bed_number')
            .sort({ createdAt: -1 });
    }
    async updatePaymentStatus(assignmentId, paymentStatus, notes) {
        const assignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, {
            payment_status: paymentStatus,
            $push: { notes: notes }
        }, { new: true });
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment với ID ${assignmentId} không tồn tại`);
        }
        return assignment;
    }
    async createCarePlan(carePlanData) {
        const carePlan = new this.carePlanModel(carePlanData);
        return carePlan.save();
    }
    async getAssignmentById(assignmentId) {
        const assignment = await this.assignmentModel
            .findById(assignmentId)
            .populate('resident_id')
            .populate('family_member_id')
            .populate('care_plan_ids')
            .populate('assigned_room_id')
            .populate('assigned_bed_id');
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment với ID ${assignmentId} không tồn tại`);
        }
        return assignment;
    }
};
exports.CarePlansService = CarePlansService;
exports.CarePlansService = CarePlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(care_plan_schema_1.CarePlan.name)),
    __param(1, (0, mongoose_1.InjectModel)(care_plan_assignment_schema_1.CarePlanAssignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        rooms_service_1.RoomsService,
        beds_service_1.BedsService])
], CarePlansService);
//# sourceMappingURL=care-plans.service.js.map