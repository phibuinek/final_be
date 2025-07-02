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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarePlanAssignmentSchema = exports.CarePlanAssignment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let FamilyPreferences = class FamilyPreferences {
    preferred_room_gender;
    preferred_floor;
    special_requests;
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['male', 'female'] }),
    __metadata("design:type", String)
], FamilyPreferences.prototype, "preferred_room_gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], FamilyPreferences.prototype, "preferred_floor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], FamilyPreferences.prototype, "special_requests", void 0);
FamilyPreferences = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], FamilyPreferences);
let MedicationRecord = class MedicationRecord {
    medication_name;
    dosage;
    frequency;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicationRecord.prototype, "medication_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicationRecord.prototype, "dosage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicationRecord.prototype, "frequency", void 0);
MedicationRecord = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MedicationRecord);
let CarePlanAssignment = class CarePlanAssignment extends mongoose_2.Document {
    staff_id;
    care_plan_ids;
    resident_id;
    family_member_id;
    registration_date;
    consultation_notes;
    selected_room_type;
    assigned_room_id;
    assigned_bed_id;
    family_preferences;
    total_monthly_cost;
    room_monthly_cost;
    care_plans_monthly_cost;
    start_date;
    end_date;
    additional_medications;
    status;
    payment_status;
    notes;
};
exports.CarePlanAssignment = CarePlanAssignment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Staff phụ trách đăng ký' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CarePlanAssignment.prototype, "staff_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'CarePlan' }], required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Danh sách gói dịch vụ đã chọn' }),
    __metadata("design:type", Array)
], CarePlanAssignment.prototype, "care_plan_ids", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Resident', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Resident được đăng ký' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CarePlanAssignment.prototype, "resident_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Thành viên gia đình đăng ký' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CarePlanAssignment.prototype, "family_member_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Ngày đăng ký dịch vụ' }),
    __metadata("design:type", Date)
], CarePlanAssignment.prototype, "registration_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú tư vấn' }),
    __metadata("design:type", String)
], CarePlanAssignment.prototype, "consultation_notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['2_bed', '3_bed', '4_5_bed', '6_8_bed'],
        required: true
    }),
    (0, swagger_1.ApiProperty)({ description: 'Loại phòng đã chọn' }),
    __metadata("design:type", String)
], CarePlanAssignment.prototype, "selected_room_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Room' }),
    (0, swagger_1.ApiProperty)({ description: 'Phòng được phân bổ' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CarePlanAssignment.prototype, "assigned_room_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Bed' }),
    (0, swagger_1.ApiProperty)({ description: 'Giường được phân bổ' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CarePlanAssignment.prototype, "assigned_bed_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: FamilyPreferences }),
    (0, swagger_1.ApiProperty)({ description: 'Sở thích của gia đình' }),
    __metadata("design:type", FamilyPreferences)
], CarePlanAssignment.prototype, "family_preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Tổng chi phí hàng tháng (VND)' }),
    __metadata("design:type", Number)
], CarePlanAssignment.prototype, "total_monthly_cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Chi phí phòng hàng tháng (VND)' }),
    __metadata("design:type", Number)
], CarePlanAssignment.prototype, "room_monthly_cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Chi phí các gói dịch vụ hàng tháng (VND)' }),
    __metadata("design:type", Number)
], CarePlanAssignment.prototype, "care_plans_monthly_cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu dịch vụ' }),
    __metadata("design:type", Date)
], CarePlanAssignment.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({ description: 'Ngày kết thúc dịch vụ' }),
    __metadata("design:type", Date)
], CarePlanAssignment.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [MedicationRecord], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'Thuốc bổ sung' }),
    __metadata("design:type", Array)
], CarePlanAssignment.prototype, "additional_medications", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái đăng ký' }),
    __metadata("design:type", String)
], CarePlanAssignment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'partially_paid', 'fully_paid', 'overdue'],
        default: 'pending'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái thanh toán' }),
    __metadata("design:type", String)
], CarePlanAssignment.prototype, "payment_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú thêm' }),
    __metadata("design:type", String)
], CarePlanAssignment.prototype, "notes", void 0);
exports.CarePlanAssignment = CarePlanAssignment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CarePlanAssignment);
exports.CarePlanAssignmentSchema = mongoose_1.SchemaFactory.createForClass(CarePlanAssignment);
//# sourceMappingURL=care-plan-assignment.schema.js.map