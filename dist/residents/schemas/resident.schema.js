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
let CarePlan = class CarePlan {
    startDate;
    endDate;
    description;
    actions;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], CarePlan.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], CarePlan.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CarePlan.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], CarePlan.prototype, "actions", void 0);
CarePlan = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], CarePlan);
let Resident = class Resident {
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
    medications;
    carePlans;
};
exports.Resident = Resident;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    (0, swagger_1.ApiProperty)({ description: 'Full name of the resident' }),
    __metadata("design:type", String)
], Resident.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({ description: 'Date of birth of the resident' }),
    __metadata("design:type", Date)
], Resident.prototype, "dateOfBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['male', 'female', 'other'] }),
    (0, swagger_1.ApiProperty)({ description: 'Gender of the resident', enum: ['male', 'female', 'other'] }),
    __metadata("design:type", String)
], Resident.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, sparse: true }),
    (0, swagger_1.ApiProperty)({ description: 'Contact information of the resident (must be unique)' }),
    __metadata("design:type", String)
], Resident.prototype, "contactInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({ description: 'Medical history of the resident' }),
    __metadata("design:type", String)
], Resident.prototype, "medicalHistory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({ description: 'Allergies of the resident' }),
    __metadata("design:type", String)
], Resident.prototype, "allergies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({ description: 'Emergency contact information' }),
    __metadata("design:type", String)
], Resident.prototype, "emergencyContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    (0, swagger_1.ApiProperty)({ description: 'Whether the resident is active' }),
    __metadata("design:type", Boolean)
], Resident.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Bed' }),
    (0, swagger_1.ApiProperty)({ description: 'The bed occupied by the resident' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Resident.prototype, "bed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'FamilyMember' }] }),
    (0, swagger_1.ApiProperty)({ description: 'Family members related to the resident' }),
    __metadata("design:type", Array)
], Resident.prototype, "familyMembers", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: Date,
            instructions: String,
            isActive: { type: Boolean, default: true }
        }]),
    (0, swagger_1.ApiProperty)({ description: 'Medications prescribed to the resident' }),
    __metadata("design:type", Array)
], Resident.prototype, "medications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [CarePlan] }),
    (0, swagger_1.ApiProperty)({ description: 'Care plans for the resident' }),
    __metadata("design:type", Array)
], Resident.prototype, "carePlans", void 0);
exports.Resident = Resident = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Resident);
exports.ResidentSchema = mongoose_1.SchemaFactory.createForClass(Resident);
//# sourceMappingURL=resident.schema.js.map