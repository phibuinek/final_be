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
exports.ResidentSchema = exports.Resident = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
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
let EmergencyContact = class EmergencyContact {
    name;
    phone;
    relationship;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmergencyContact.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmergencyContact.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmergencyContact.prototype, "relationship", void 0);
EmergencyContact = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], EmergencyContact);
let Resident = class Resident extends mongoose_2.Document {
    full_name;
    date_of_birth;
    gender;
    admission_date;
    discharge_date;
    family_member_id;
    medical_history;
    current_medications;
    allergies;
    emergency_contact;
    care_level;
    status;
};
exports.Resident = Resident;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    (0, swagger_1.ApiProperty)({ description: 'Họ và tên đầy đủ của cư dân' }),
    __metadata("design:type", String)
], Resident.prototype, "full_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Ngày sinh' }),
    __metadata("design:type", Date)
], Resident.prototype, "date_of_birth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['male', 'female'], required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Giới tính', enum: ['male', 'female'] }),
    __metadata("design:type", String)
], Resident.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Ngày nhập viện' }),
    __metadata("design:type", Date)
], Resident.prototype, "admission_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({ description: 'Ngày xuất viện (nếu có)' }),
    __metadata("design:type", Date)
], Resident.prototype, "discharge_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'ID thành viên gia đình phụ trách' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Resident.prototype, "family_member_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Tiền sử bệnh án' }),
    __metadata("design:type", String)
], Resident.prototype, "medical_history", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [MedicationRecord], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'Thuốc hiện tại đang sử dụng' }),
    __metadata("design:type", Array)
], Resident.prototype, "current_medications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'Danh sách dị ứng' }),
    __metadata("design:type", Array)
], Resident.prototype, "allergies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: EmergencyContact, required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Thông tin liên hệ khẩn cấp' }),
    __metadata("design:type", EmergencyContact)
], Resident.prototype, "emergency_contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['basic', 'intermediate', 'intensive'],
        default: 'basic'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Mức độ chăm sóc cần thiết' }),
    __metadata("design:type", String)
], Resident.prototype, "care_level", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['active', 'discharged', 'deceased'],
        default: 'active'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái hiện tại của cư dân' }),
    __metadata("design:type", String)
], Resident.prototype, "status", void 0);
exports.Resident = Resident = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Resident);
exports.ResidentSchema = mongoose_1.SchemaFactory.createForClass(Resident);
//# sourceMappingURL=resident.schema.js.map