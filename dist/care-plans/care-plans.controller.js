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
exports.CarePlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const care_plans_service_1 = require("./care-plans.service");
let CarePlansController = class CarePlansController {
    carePlansService;
    constructor(carePlansService) {
        this.carePlansService = carePlansService;
    }
    async getAvailableCarePlans() {
        return this.carePlansService.getAvailableCarePlans();
    }
    async calculateCost(data) {
        if (!data.carePlanIds || data.carePlanIds.length === 0) {
            throw new common_1.BadRequestException('Cần chọn ít nhất 1 gói dịch vụ');
        }
        if (!data.roomType) {
            throw new common_1.BadRequestException('Cần chọn loại phòng');
        }
        return this.carePlansService.calculateCost(data.carePlanIds, data.roomType);
    }
    async createAssignment(req, assignmentData) {
        return this.carePlansService.createAssignment({
            staffId: req.user.userId,
            ...assignmentData
        });
    }
    async getAssignments(req, status, paymentStatus, allStaff) {
        const filters = {};
        if (req.user.role !== 'admin' && allStaff !== 'true') {
            filters.staffId = req.user.userId;
        }
        if (status)
            filters.status = status;
        if (paymentStatus)
            filters.paymentStatus = paymentStatus;
        return this.carePlansService.getAssignments(filters);
    }
    async getAssignmentById(id) {
        return this.carePlansService.getAssignmentById(id);
    }
    async updatePaymentStatus(id, data) {
        return this.carePlansService.updatePaymentStatus(id, data.paymentStatus, data.notes);
    }
    async createCarePlan(carePlanData) {
        return this.carePlansService.createCarePlan(carePlanData);
    }
};
exports.CarePlansController = CarePlansController;
__decorate([
    (0, common_1.Get)('available'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Staff, role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách gói dịch vụ chăm sóc có sẵn' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách gói dịch vụ theo danh mục' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "getAvailableCarePlans", null);
__decorate([
    (0, common_1.Post)('calculate-cost'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Staff, role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Tính chi phí dựa trên gói dịch vụ và loại phòng' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chi phí chi tiết' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "calculateCost", null);
__decorate([
    (0, common_1.Post)('assignments'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Staff, role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng ký dịch vụ chăm sóc cho resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Đăng ký dịch vụ thành công' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Get)('assignments'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Staff, role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đăng ký dịch vụ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách assignments' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('paymentStatus')),
    __param(3, (0, common_1.Query)('allStaff')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "getAssignments", null);
__decorate([
    (0, common_1.Get)('assignments/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Staff, role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết đăng ký dịch vụ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chi tiết assignment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "getAssignmentById", null);
__decorate([
    (0, common_1.Put)('assignments/:id/payment'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Staff, role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật trạng thái thanh toán' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thanh toán thành công' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "updatePaymentStatus", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo gói dịch vụ chăm sóc mới (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tạo gói dịch vụ thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarePlansController.prototype, "createCarePlan", null);
exports.CarePlansController = CarePlansController = __decorate([
    (0, swagger_1.ApiTags)('care-plans'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('care-plans'),
    __metadata("design:paramtypes", [care_plans_service_1.CarePlansService])
], CarePlansController);
//# sourceMappingURL=care-plans.controller.js.map