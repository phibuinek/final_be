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
exports.CreateFamilyMemberDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const custom_validator_1 = require("../../common/validators/custom.validator");
class CreateFamilyMemberDto {
    fullName;
    email;
    phoneNumber;
    relationship;
    residentIds;
    notes;
    notificationPreferences;
}
exports.CreateFamilyMemberDto = CreateFamilyMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Họ và tên đầy đủ của thành viên gia đình',
        example: 'Nguyễn Văn A'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ tên không được để trống' }),
    (0, custom_validator_1.IsVietnameseName)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ email dùng để đăng nhập',
        example: 'nguyenvana@example.com'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số điện thoại',
        example: '0912345678'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được để trống' }),
    (0, custom_validator_1.IsVietnamesePhoneNumber)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mối quan hệ với người cư trú',
        example: 'con_trai',
        enum: ['con', 'con_trai', 'con_gai', 'vo', 'chong', 'cha', 'me', 'anh', 'chi', 'em', 'chau', 'khac']
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mối quan hệ không được để trống' }),
    (0, custom_validator_1.IsValidRelationship)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách ID của người cư trú được liên kết',
        type: [String],
        example: ['507f1f77bcf86cd799439011']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'residentIds phải là một mảng' }),
    (0, custom_validator_1.IsArrayOfMongoIds)(),
    __metadata("design:type", Array)
], CreateFamilyMemberDto.prototype, "residentIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ghi chú bổ sung',
        example: 'Thường xuyên đến thăm vào cuối tuần'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, custom_validator_1.IsValidNote)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cài đặt thông báo',
        example: {
            health: { email: true, push: true, sms: false },
            activity: { email: true, push: true, sms: false }
        }
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateFamilyMemberDto.prototype, "notificationPreferences", void 0);
//# sourceMappingURL=create-family-member.dto.js.map