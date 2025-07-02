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
exports.VisitsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const visit_schema_1 = require("./schemas/visit.schema");
let VisitsService = class VisitsService {
    visitModel;
    constructor(visitModel) {
        this.visitModel = visitModel;
    }
    async create(createVisitDto, familyMemberId) {
        const scheduledDateTime = new Date(`${createVisitDto.scheduledDate}T${createVisitDto.scheduledTime}`);
        if (scheduledDateTime < new Date()) {
            throw new common_1.BadRequestException('Cannot schedule a visit in the past');
        }
        const visitData = {
            ...createVisitDto,
            familyMember: familyMemberId,
            scheduledDate: new Date(createVisitDto.scheduledDate),
        };
        const createdVisit = new this.visitModel(visitData);
        return createdVisit.save();
    }
    async findAll() {
        return this.visitModel
            .find()
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .populate('approvedBy', 'fullName')
            .exec();
    }
    async findByFamilyMember(familyMemberId) {
        return this.visitModel
            .find({ familyMember: familyMemberId })
            .populate('resident', 'fullName')
            .populate('approvedBy', 'fullName')
            .exec();
    }
    async findByResident(residentId) {
        return this.visitModel
            .find({ resident: residentId })
            .populate('familyMember', 'name email')
            .populate('approvedBy', 'fullName')
            .exec();
    }
    async findByStatus(status) {
        return this.visitModel
            .find({ status })
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .populate('approvedBy', 'fullName')
            .exec();
    }
    async findOne(id) {
        const visit = await this.visitModel
            .findById(id)
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .populate('approvedBy', 'fullName')
            .exec();
        if (!visit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        return visit;
    }
    async update(id, updateVisitDto, familyMemberId) {
        const visit = await this.visitModel.findById(id);
        if (!visit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        if (visit.familyMember.toString() !== familyMemberId) {
            throw new common_1.ForbiddenException('You can only update your own visits');
        }
        if (visit.status !== visit_schema_1.VisitStatus.PENDING) {
            throw new common_1.BadRequestException('Can only update pending visits');
        }
        const updatedVisit = await this.visitModel
            .findByIdAndUpdate(id, updateVisitDto, { new: true })
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .exec();
        if (!updatedVisit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        return updatedVisit;
    }
    async approveOrReject(id, approvalDto, staffUserId) {
        const visit = await this.visitModel.findById(id);
        if (!visit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        if (visit.status !== visit_schema_1.VisitStatus.PENDING) {
            throw new common_1.BadRequestException('Can only approve/reject pending visits');
        }
        const updateData = {
            status: approvalDto.status,
            staffNotes: approvalDto.staffNotes,
            approvedBy: staffUserId,
            approvedAt: new Date(),
        };
        const updatedVisit = await this.visitModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .populate('approvedBy', 'fullName')
            .exec();
        if (!updatedVisit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        return updatedVisit;
    }
    async cancel(id, familyMemberId) {
        const visit = await this.visitModel.findById(id);
        if (!visit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        if (visit.familyMember.toString() !== familyMemberId) {
            throw new common_1.ForbiddenException('You can only cancel your own visits');
        }
        if (![visit_schema_1.VisitStatus.PENDING, visit_schema_1.VisitStatus.APPROVED].includes(visit.status)) {
            throw new common_1.BadRequestException('Can only cancel pending or approved visits');
        }
        const updatedVisit = await this.visitModel
            .findByIdAndUpdate(id, { status: visit_schema_1.VisitStatus.CANCELLED }, { new: true })
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .exec();
        if (!updatedVisit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        return updatedVisit;
    }
    async markAsCompleted(id) {
        const visit = await this.visitModel.findById(id);
        if (!visit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        if (visit.status !== visit_schema_1.VisitStatus.APPROVED) {
            throw new common_1.BadRequestException('Can only mark approved visits as completed');
        }
        const updatedVisit = await this.visitModel
            .findByIdAndUpdate(id, {
            status: visit_schema_1.VisitStatus.COMPLETED,
            actualEndTime: new Date(),
        }, { new: true })
            .populate('resident', 'fullName')
            .populate('familyMember', 'name email')
            .exec();
        if (!updatedVisit) {
            throw new common_1.NotFoundException(`Visit with ID "${id}" not found`);
        }
        return updatedVisit;
    }
};
exports.VisitsService = VisitsService;
exports.VisitsService = VisitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(visit_schema_1.Visit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VisitsService);
//# sourceMappingURL=visits.service.js.map