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
exports.CreateResidentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateResidentDto {
    fullName;
    dateOfBirth;
    gender;
    contactInfo;
    medicalHistory;
    allergies;
    emergencyContact;
    isActive;
    bed;
    familyMembers;
}
exports.CreateResidentDto = CreateResidentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name of the resident' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Full name is required' }),
    (0, class_validator_1.IsString)({ message: 'Full name must be a string' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of birth of the resident', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Date of birth must be a valid date' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateResidentDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gender of the resident', required: false, enum: ['male', 'female', 'other'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Gender must be a string' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contact information of the resident (must be unique)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Contact info must be a string' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "contactInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Medical history of the resident', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "medicalHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Allergies of the resident', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emergency contact information', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the resident is active', required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResidentDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The bed occupied by the resident', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "bed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Family members related to the resident', required: false, type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateResidentDto.prototype, "familyMembers", void 0);
//# sourceMappingURL=create-resident.dto.js.map