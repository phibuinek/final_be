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
exports.ResidentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const residents_service_1 = require("./residents.service");
const create_resident_dto_1 = require("./dto/create-resident.dto");
const update_resident_dto_1 = require("./dto/update-resident.dto");
const vital_sign_dto_1 = require("./dto/vital-sign.dto");
const care_plan_dto_1 = require("./dto/care-plan.dto");
const activity_dto_1 = require("./dto/activity.dto");
const medication_dto_1 = require("./dto/medication.dto");
const family_access_guard_1 = require("../users/guards/family-access.guard");
let ResidentsController = class ResidentsController {
    residentsService;
    constructor(residentsService) {
        this.residentsService = residentsService;
    }
    validateObjectId(id) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
    }
    create(createResidentDto) {
        return this.residentsService.create(createResidentDto);
    }
    findAll() {
        return this.residentsService.findAll();
    }
    findOne(id) {
        this.validateObjectId(id);
        return this.residentsService.findOne(id);
    }
    update(id, updateResidentDto) {
        return this.residentsService.update(id, updateResidentDto);
    }
    remove(id) {
        return this.residentsService.remove(id);
    }
    assignBed(id, bedId) {
        return this.residentsService.assignBed(id, bedId);
    }
    updateFamilyMember(id, familyMemberId) {
        return this.residentsService.updateFamilyMember(id, familyMemberId);
    }
    recordVitalSign(id, vitalSignDto) {
        vitalSignDto.residentId = id;
        return this.residentsService.recordVitalSign(vitalSignDto);
    }
    getVitalSigns(id) {
        return this.residentsService.getVitalSigns(id);
    }
    createCarePlan(id, carePlanDto) {
        return this.residentsService.createCarePlan(id, carePlanDto);
    }
    getCarePlans(id) {
        return this.residentsService.getCarePlans(id);
    }
    recordActivity(id, activityDto) {
        activityDto.residentId = id;
        return this.residentsService.recordActivity(activityDto);
    }
    getActivities(id) {
        return this.residentsService.getActivities(id);
    }
    addMedication(id, medicationDto) {
        medicationDto.residentId = id;
        return this.residentsService.addMedication(medicationDto);
    }
    getMedications(id) {
        return this.residentsService.getMedications(id);
    }
    updateMedication(id, index, medicationDto) {
        medicationDto.residentId = id;
        return this.residentsService.updateMedication(id, index, medicationDto);
    }
    discontinueMedication(id, index) {
        return this.residentsService.discontinueMedication(id, index);
    }
};
exports.ResidentsController = ResidentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Resident created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resident_dto_1.CreateResidentDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get all residents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Residents retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get a resident by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resident retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Update a resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resident updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_resident_dto_1.UpdateResidentDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resident deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/assign-bed/:bedId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Assign bed to resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bed assigned successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident or bed not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('bedId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "assignBed", null);
__decorate([
    (0, common_1.Put)(':id/family-member/:familyMemberId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Update family member for a resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family member updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident or family member not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('familyMemberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "updateFamilyMember", null);
__decorate([
    (0, common_1.Post)(':id/vital-signs'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Record vital signs for resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vital signs recorded successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vital_sign_dto_1.VitalSignDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "recordVitalSign", null);
__decorate([
    (0, common_1.Get)(':id/vital-signs'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get vital signs for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vital signs retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "getVitalSigns", null);
__decorate([
    (0, common_1.Post)(':id/care-plans'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Create care plan for resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Care plan created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, care_plan_dto_1.CarePlanDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "createCarePlan", null);
__decorate([
    (0, common_1.Get)(':id/care-plans'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get care plans for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Care plans retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "getCarePlans", null);
__decorate([
    (0, common_1.Post)(':id/activities'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Record activity for resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Activity recorded successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, activity_dto_1.ActivityDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "recordActivity", null);
__decorate([
    (0, common_1.Get)(':id/activities'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get activities for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Activities retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "getActivities", null);
__decorate([
    (0, common_1.Post)(':id/medications'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Add medication for resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Medication added successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, medication_dto_1.MedicationDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "addMedication", null);
__decorate([
    (0, common_1.Get)(':id/medications'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get medications for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medications retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "getMedications", null);
__decorate([
    (0, common_1.Patch)(':id/medications/:index'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Update medication for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medication updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, medication_dto_1.MedicationDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "updateMedication", null);
__decorate([
    (0, common_1.Delete)(':id/medications/:index'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Discontinue medication for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medication discontinued successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resident not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "discontinueMedication", null);
exports.ResidentsController = ResidentsController = __decorate([
    (0, swagger_1.ApiTags)('residents'),
    (0, common_1.Controller)('residents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [residents_service_1.ResidentsService])
], ResidentsController);
//# sourceMappingURL=residents.controller.js.map