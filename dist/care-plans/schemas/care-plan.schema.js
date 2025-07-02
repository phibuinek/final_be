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
exports.CarePlanSchema = exports.CarePlan = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let CarePlan = class CarePlan extends mongoose_2.Document {
    plan_name;
    description;
    monthly_price;
    plan_type;
    category;
    services_included;
    staff_ratio;
    duration_type;
    default_medications;
    prerequisites;
    contraindications;
    is_active;
};
exports.CarePlan = CarePlan;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Tên gói dịch vụ chăm sóc' }),
    __metadata("design:type", String)
], CarePlan.prototype, "plan_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Mô tả chi tiết về gói dịch vụ' }),
    __metadata("design:type", String)
], CarePlan.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Giá tháng (VND)' }),
    __metadata("design:type", Number)
], CarePlan.prototype, "monthly_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: [
            'cham_soc_tieu_chuan',
            'cham_soc_tich_cuc',
            'cham_soc_dac_biet',
            'cham_soc_sa_sut_tri_tue',
            'ho_tro_dinh_duong',
            'cham_soc_vet_thuong',
            'vat_ly_tri_lieu',
            'cham_soc_tieu_duong',
            'phuc_hoi_chuc_nang',
            'cham_soc_giam_nhe',
            'cham_soc_hau_phau_thuat',
            'tri_lieu_nghe_nghiep'
        ]
    }),
    (0, swagger_1.ApiProperty)({ description: 'Loại gói chăm sóc' }),
    __metadata("design:type", String)
], CarePlan.prototype, "plan_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['main', 'supplementary'],
        default: 'main'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Danh mục: chính hoặc phụ' }),
    __metadata("design:type", String)
], CarePlan.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Danh sách dịch vụ bao gồm' }),
    __metadata("design:type", Array)
], CarePlan.prototype, "services_included", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ nhân viên:bệnh nhân' }),
    __metadata("design:type", String)
], CarePlan.prototype, "staff_ratio", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['monthly', 'weekly', 'daily'],
        default: 'monthly'
    }),
    (0, swagger_1.ApiProperty)({ description: 'Loại thời gian tính phí' }),
    __metadata("design:type", String)
], CarePlan.prototype, "duration_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'Thuốc mặc định trong gói' }),
    __metadata("design:type", Array)
], CarePlan.prototype, "default_medications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'Điều kiện tiên quyết' }),
    __metadata("design:type", Array)
], CarePlan.prototype, "prerequisites", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'Chống chỉ định' }),
    __metadata("design:type", Array)
], CarePlan.prototype, "contraindications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    (0, swagger_1.ApiProperty)({ description: 'Gói có đang hoạt động không' }),
    __metadata("design:type", Boolean)
], CarePlan.prototype, "is_active", void 0);
exports.CarePlan = CarePlan = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CarePlan);
exports.CarePlanSchema = mongoose_1.SchemaFactory.createForClass(CarePlan);
//# sourceMappingURL=care-plan.schema.js.map