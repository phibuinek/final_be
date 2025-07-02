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
exports.VitalSignSchema = exports.VitalSign = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let VitalSign = class VitalSign extends mongoose_2.Document {
    resident_id;
    recorded_by;
    date_time;
    temperature;
    heart_rate;
    blood_pressure;
    respiratory_rate;
    oxygen_level;
    weight;
    height;
    bmi;
    blood_sugar;
    notes;
    overall_status;
};
exports.VitalSign = VitalSign;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Resident', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'ID của cư dân' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], VitalSign.prototype, "resident_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Nhân viên ghi lại thông tin' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], VitalSign.prototype, "recorded_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Thời gian đo' }),
    __metadata("design:type", Date)
], VitalSign.prototype, "date_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Nhiệt độ cơ thể (°C)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "temperature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Nhịp tim (bpm)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "heart_rate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Huyết áp (mmHg) - ví dụ: "120/80"' }),
    __metadata("design:type", String)
], VitalSign.prototype, "blood_pressure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Nhịp thở (lần/phút)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "respiratory_rate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Nồng độ oxy trong máu (%)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "oxygen_level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Cân nặng (kg)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Chiều cao (cm)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Chỉ số BMI' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "bmi", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    (0, swagger_1.ApiProperty)({ description: 'Đường huyết (mg/dL)' }),
    __metadata("design:type", Number)
], VitalSign.prototype, "blood_sugar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú thêm' }),
    __metadata("design:type", String)
], VitalSign.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['normal', 'abnormal', 'critical'],
        default: 'normal'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Đánh giá tổng quan' }),
    __metadata("design:type", String)
], VitalSign.prototype, "overall_status", void 0);
exports.VitalSign = VitalSign = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], VitalSign);
exports.VitalSignSchema = mongoose_1.SchemaFactory.createForClass(VitalSign);
//# sourceMappingURL=vital-sign.schema.js.map