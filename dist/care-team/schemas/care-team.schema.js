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
exports.CareTeamSchema = exports.CareTeam = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let CareTeam = class CareTeam {
    primaryDoctor;
    nurses;
    resident;
    schedule;
    notes;
};
exports.CareTeam = CareTeam;
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'User' }),
    (0, swagger_1.ApiProperty)({ description: 'Primary doctor ID' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CareTeam.prototype, "primaryDoctor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }] }),
    (0, swagger_1.ApiProperty)({ description: 'List of nurse IDs' }),
    __metadata("design:type", Array)
], CareTeam.prototype, "nurses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'Resident' }),
    (0, swagger_1.ApiProperty)({ description: 'Resident ID' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], CareTeam.prototype, "resident", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            userId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true },
            role: { type: String, enum: ['doctor', 'nurse'], required: true },
            startTime: { type: Date, required: true },
            endTime: { type: Date, required: true }
        }]),
    (0, swagger_1.ApiProperty)({ description: 'Care team schedule' }),
    __metadata("design:type", Array)
], CareTeam.prototype, "schedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Additional notes about care team' }),
    __metadata("design:type", String)
], CareTeam.prototype, "notes", void 0);
exports.CareTeam = CareTeam = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CareTeam);
exports.CareTeamSchema = mongoose_1.SchemaFactory.createForClass(CareTeam);
//# sourceMappingURL=care-team.schema.js.map