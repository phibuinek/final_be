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
exports.ResidentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resident_schema_1 = require("./schemas/resident.schema");
let ResidentsService = class ResidentsService {
    residentModel;
    constructor(residentModel) {
        this.residentModel = residentModel;
    }
    async create(createResidentDto) {
        const createdResident = new this.residentModel(createResidentDto);
        return createdResident.save();
    }
    async findAll() {
        return this.residentModel.find().populate('family_member_id', 'fullName phone').exec();
    }
    async findOne(id) {
        const resident = await this.residentModel.findById(id).populate('family_member_id', 'fullName phone').exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${id} not found`);
        }
        return resident;
    }
    async update(id, updateResidentDto) {
        const existingResident = await this.residentModel
            .findByIdAndUpdate(id, updateResidentDto, { new: true })
            .populate('family_member_id', 'fullName phone')
            .exec();
        if (!existingResident) {
            throw new common_1.NotFoundException(`Resident with ID ${id} not found`);
        }
        return existingResident;
    }
    async remove(id) {
        const deletedResident = await this.residentModel.findByIdAndDelete(id).exec();
        if (!deletedResident) {
            throw new common_1.NotFoundException(`Resident with ID ${id} not found`);
        }
        return deletedResident;
    }
    async assignBed(residentId, bedId) {
        const resident = await this.residentModel.findById(residentId).exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${residentId} not found`);
        }
        return { message: 'Bed assignment should be handled through care plan assignments' };
    }
    async updateFamilyMember(residentId, familyMemberId) {
        const resident = await this.residentModel.findByIdAndUpdate(residentId, { family_member_id: familyMemberId }, { new: true }).populate('family_member_id', 'fullName phone').exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${residentId} not found`);
        }
        return resident;
    }
    async recordVitalSign(vitalSignDto) {
        const resident = await this.residentModel.findById(vitalSignDto.residentId).exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${vitalSignDto.residentId} not found`);
        }
        return {
            id: 'mock-vital-sign-id',
            ...vitalSignDto,
            recordedAt: vitalSignDto.recordedAt || new Date(),
        };
    }
    async getVitalSigns(residentId) {
        const resident = await this.residentModel.findById(residentId).exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${residentId} not found`);
        }
        return [
            {
                id: 'mock-vital-sign-id',
                residentId,
                temperature: 36.5,
                bloodPressure: '120/80',
                heartRate: 72,
                respiratoryRate: 16,
                oxygenSaturation: 98,
                notes: 'Normal vital signs',
                recordedAt: new Date(),
            },
        ];
    }
    async recordActivity(activityDto) {
        const resident = await this.residentModel.findById(activityDto.residentId).exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${activityDto.residentId} not found`);
        }
        return {
            id: 'mock-activity-id',
            ...activityDto,
            createdAt: new Date(),
        };
    }
    async getActivities(residentId) {
        const resident = await this.residentModel.findById(residentId).exec();
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${residentId} not found`);
        }
        return [
            {
                id: 'mock-activity-id',
                residentId,
                name: 'Morning Walk',
                description: 'A short walk in the garden',
                scheduledTime: new Date(),
                duration: '30 minutes',
                location: 'Garden',
                responsibleStaff: 'Staff Member',
                participated: true,
                participationNotes: 'Enjoyed the fresh air',
            },
        ];
    }
    async addMedication(medicationDto) {
        const resident = await this.residentModel.findById(medicationDto.residentId);
        if (!resident) {
            throw new common_1.NotFoundException('Resident not found');
        }
        const medication = {
            medication_name: medicationDto.name,
            dosage: medicationDto.dosage,
            frequency: medicationDto.frequency
        };
        resident.current_medications.push(medication);
        return resident.save();
    }
    async getMedications(id) {
        const resident = await this.residentModel.findById(id);
        if (!resident) {
            throw new common_1.NotFoundException('Resident not found');
        }
        return resident.current_medications;
    }
    async updateMedication(residentId, medicationIndex, medicationDto) {
        const resident = await this.residentModel.findById(residentId);
        if (!resident) {
            throw new common_1.NotFoundException('Resident not found');
        }
        if (medicationIndex < 0 || medicationIndex >= resident.current_medications.length) {
            throw new common_1.BadRequestException('Invalid medication index');
        }
        resident.current_medications[medicationIndex] = {
            medication_name: medicationDto.name,
            dosage: medicationDto.dosage,
            frequency: medicationDto.frequency
        };
        return resident.save();
    }
    async discontinueMedication(residentId, medicationIndex) {
        const resident = await this.residentModel.findById(residentId);
        if (!resident) {
            throw new common_1.NotFoundException('Resident not found');
        }
        if (medicationIndex < 0 || medicationIndex >= resident.current_medications.length) {
            throw new common_1.BadRequestException('Invalid medication index');
        }
        resident.current_medications.splice(medicationIndex, 1);
        return resident.save();
    }
    async createCarePlan(residentId, carePlanDto) {
        const resident = await this.residentModel.findById(residentId);
        if (!resident) {
            throw new common_1.NotFoundException(`Resident with ID ${residentId} not found`);
        }
        return { message: 'Care plans should be handled through CarePlansService assignments' };
    }
    async getCarePlans(residentId) {
        const resident = await this.findOne(residentId);
        return { message: 'Care plans should be queried through CarePlansService assignments' };
    }
};
exports.ResidentsService = ResidentsService;
exports.ResidentsService = ResidentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resident_schema_1.Resident.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ResidentsService);
//# sourceMappingURL=residents.service.js.map