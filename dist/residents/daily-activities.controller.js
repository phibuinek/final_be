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
exports.DailyActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const daily_activities_service_1 = require("./daily-activities.service");
const daily_activity_dto_1 = require("./dto/daily-activity.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const family_access_guard_1 = require("../users/guards/family-access.guard");
let DailyActivitiesController = class DailyActivitiesController {
    dailyActivitiesService;
    constructor(dailyActivitiesService) {
        this.dailyActivitiesService = dailyActivitiesService;
    }
    create(dailyActivityDto) {
        return this.dailyActivitiesService.create(dailyActivityDto);
    }
    findByResident(residentId, startDate, endDate) {
        return this.dailyActivitiesService.findByResident(residentId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    findOne(id) {
        return this.dailyActivitiesService.findOne(id);
    }
    addActivity(id, activity) {
        return this.dailyActivitiesService.addActivity(id, activity);
    }
    updateActivity(id, index, activityUpdate) {
        return this.dailyActivitiesService.updateActivity(id, index, activityUpdate);
    }
    updateMeals(id, meals) {
        return this.dailyActivitiesService.updateMeals(id, meals);
    }
    updateSleep(id, sleep) {
        return this.dailyActivitiesService.updateSleep(id, sleep);
    }
    completeDay(id) {
        return this.dailyActivitiesService.completeDay(id);
    }
    getActivityStats(residentId, startDate, endDate) {
        return this.dailyActivitiesService.getActivityStats(residentId, new Date(startDate), new Date(endDate));
    }
};
exports.DailyActivitiesController = DailyActivitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Create daily activity record (Admin and Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Daily activity record created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [daily_activity_dto_1.DailyActivityDto]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('resident/:residentId'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get resident activities' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return resident activities.' }),
    __param(0, (0, common_1.Param)('residentId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "findByResident", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily activity record by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the daily activity record.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/activities'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Add activity to daily record (Admin and Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Activity added successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "addActivity", null);
__decorate([
    (0, common_1.Patch)(':id/activities/:index'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Update activity in daily record (Admin and Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Activity updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Record or activity not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "updateActivity", null);
__decorate([
    (0, common_1.Patch)(':id/meals'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Update meals in daily record (Admin and Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "updateMeals", null);
__decorate([
    (0, common_1.Patch)(':id/sleep'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Update sleep record (Admin and Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sleep record updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "updateSleep", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Mark daily record as complete (Admin and Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Record marked as complete.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "completeDay", null);
__decorate([
    (0, common_1.Get)('resident/:residentId/stats'),
    (0, common_1.UseGuards)(family_access_guard_1.FamilyAccessGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff, role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get activity statistics for resident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return activity statistics.' }),
    __param(0, (0, common_1.Param)('residentId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DailyActivitiesController.prototype, "getActivityStats", null);
exports.DailyActivitiesController = DailyActivitiesController = __decorate([
    (0, swagger_1.ApiTags)('daily-activities'),
    (0, common_1.Controller)('daily-activities'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [daily_activities_service_1.DailyActivitiesService])
], DailyActivitiesController);
//# sourceMappingURL=daily-activities.controller.js.map