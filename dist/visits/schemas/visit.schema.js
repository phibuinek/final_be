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
exports.VisitSchema = exports.Visit = exports.VisitStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var VisitStatus;
(function (VisitStatus) {
    VisitStatus["PENDING"] = "pending";
    VisitStatus["APPROVED"] = "approved";
    VisitStatus["REJECTED"] = "rejected";
    VisitStatus["COMPLETED"] = "completed";
    VisitStatus["CANCELLED"] = "cancelled";
})(VisitStatus || (exports.VisitStatus = VisitStatus = {}));
let Visit = class Visit extends mongoose_2.Document {
    resident;
    familyMember;
    scheduledDate;
    scheduledTime;
    duration;
    status;
    purpose;
    notes;
    staffNotes;
    approvedBy;
    approvedAt;
    actualStartTime;
    actualEndTime;
};
exports.Visit = Visit;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Resident', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Visit.prototype, "resident", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'FamilyMember', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Visit.prototype, "familyMember", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Visit.prototype, "scheduledDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Visit.prototype, "scheduledTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 60 }),
    __metadata("design:type", Number)
], Visit.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(VisitStatus),
        default: VisitStatus.PENDING,
    }),
    __metadata("design:type", String)
], Visit.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Visit.prototype, "purpose", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Visit.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Visit.prototype, "staffNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Visit.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Visit.prototype, "approvedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Visit.prototype, "actualStartTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Visit.prototype, "actualEndTime", void 0);
exports.Visit = Visit = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Visit);
exports.VisitSchema = mongoose_1.SchemaFactory.createForClass(Visit);
//# sourceMappingURL=visit.schema.js.map