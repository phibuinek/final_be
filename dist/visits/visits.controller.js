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
exports.VisitsController = void 0;
const common_1 = require("@nestjs/common");
const visits_service_1 = require("./visits.service");
const create_visit_dto_1 = require("./dto/create-visit.dto");
const update_visit_dto_1 = require("./dto/update-visit.dto");
const visit_approval_dto_1 = require("./dto/visit-approval.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const visit_schema_1 = require("./schemas/visit.schema");
let VisitsController = class VisitsController {
    visitsService;
    constructor(visitsService) {
        this.visitsService = visitsService;
    }
    create(createVisitDto, req) {
        return this.visitsService.create(createVisitDto, req.user.userId);
    }
    findAll(status, residentId) {
        if (status) {
            return this.visitsService.findByStatus(status);
        }
        if (residentId) {
            return this.visitsService.findByResident(residentId);
        }
        return this.visitsService.findAll();
    }
    getMyVisits(req) {
        return this.visitsService.findByFamilyMember(req.user.userId);
    }
    getPendingVisits() {
        return this.visitsService.findByStatus(visit_schema_1.VisitStatus.PENDING);
    }
    findOne(id) {
        return this.visitsService.findOne(id);
    }
    update(id, updateVisitDto, req) {
        return this.visitsService.update(id, updateVisitDto, req.user.userId);
    }
    approveOrReject(id, approvalDto, req) {
        return this.visitsService.approveOrReject(id, approvalDto, req.user.userId);
    }
    cancel(id, req) {
        return this.visitsService.cancel(id, req.user.userId);
    }
    markAsCompleted(id) {
        return this.visitsService.markAsCompleted(id);
    }
};
exports.VisitsController = VisitsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule a new visit (Family Member only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Visit scheduled successfully.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_visit_dto_1.CreateVisitDto, Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get all visits (Admin/Staff only)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: visit_schema_1.VisitStatus, description: 'Filter by visit status' }),
    (0, swagger_1.ApiQuery)({ name: 'residentId', required: false, type: String, description: 'Filter by resident ID' }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('residentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-visits'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get own visits (Family Member only)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "getMyVisits", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending visits for approval (Admin/Staff only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "getPendingVisits", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific visit' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Update own visit (Family Member only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_visit_dto_1.UpdateVisitDto, Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/approve-reject'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject a visit (Admin/Staff only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, visit_approval_dto_1.VisitApprovalDto, Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "approveOrReject", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel own visit (Family Member only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Mark visit as completed (Admin/Staff only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "markAsCompleted", null);
exports.VisitsController = VisitsController = __decorate([
    (0, swagger_1.ApiTags)('visits'),
    (0, common_1.Controller)('visits'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [visits_service_1.VisitsService])
], VisitsController);
//# sourceMappingURL=visits.controller.js.map