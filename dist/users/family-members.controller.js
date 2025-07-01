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
exports.FamilyMembersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const family_members_service_1 = require("./family-members.service");
const create_family_member_dto_1 = require("./dto/create-family-member.dto");
const update_notification_preferences_dto_1 = require("./dto/update-notification-preferences.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
let FamilyMembersController = class FamilyMembersController {
    familyMembersService;
    constructor(familyMembersService) {
        this.familyMembersService = familyMembersService;
    }
    create(createFamilyMemberDto) {
        return this.familyMembersService.create(createFamilyMemberDto);
    }
    findAll() {
        return this.familyMembersService.findAll();
    }
    getProfile(req) {
        if (!req.user?.userId) {
            throw new common_1.BadRequestException('User ID not found in request');
        }
        return this.familyMembersService.findByUser(req.user.userId);
    }
    findOne(id) {
        return this.familyMembersService.findOne(id);
    }
    update(id, updateFamilyMemberDto) {
        return this.familyMembersService.update(id, updateFamilyMemberDto);
    }
    addResident(id, residentId) {
        return this.familyMembersService.addResident(id, residentId);
    }
    removeResident(id, residentId) {
        return this.familyMembersService.removeResident(id, residentId);
    }
    async updateNotificationPreferences(id, preferences, req) {
        const familyMember = await this.familyMembersService.findByUser(req.user.userId);
        if (familyMember._id.toString() !== id) {
            throw new common_1.ForbiddenException('You can only update your own notification preferences');
        }
        return this.familyMembersService.updateNotificationPreferences(id, preferences);
    }
    async completeSetup(id, req) {
        const familyMember = await this.familyMembersService.findByUser(req.user.userId);
        if (familyMember._id.toString() !== id) {
            throw new common_1.ForbiddenException('You can only complete your own setup');
        }
        return this.familyMembersService.completeSetup(id);
    }
    deactivate(id) {
        return this.familyMembersService.deactivate(id);
    }
    resendCredentials(id) {
        return this.familyMembersService.resendCredentials(id);
    }
};
exports.FamilyMembersController = FamilyMembersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new family member' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The family member account has been successfully created.',
        type: create_family_member_dto_1.CreateFamilyMemberDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin role.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_family_member_dto_1.CreateFamilyMemberDto]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get all family members' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all family members.',
        type: [create_family_member_dto_1.CreateFamilyMemberDto]
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin or Staff role.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Get own profile (Family member only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return family member profile.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Profile not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get a family member by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Family member ID (MongoDB ObjectId)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found family member.',
        type: create_family_member_dto_1.CreateFamilyMemberDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin or Staff role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Update a family member' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Family member ID (MongoDB ObjectId)' }),
    (0, swagger_1.ApiBody)({ type: create_family_member_dto_1.CreateFamilyMemberDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The family member has been successfully updated.',
        type: create_family_member_dto_1.CreateFamilyMemberDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data or ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_family_member_dto_1.CreateFamilyMemberDto]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/residents/:residentId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Add a resident to a family member' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resident added successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member or resident not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('residentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "addResident", null);
__decorate([
    (0, common_1.Delete)(':id/residents/:residentId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a resident from a family member' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resident removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member or resident not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('residentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "removeResident", null);
__decorate([
    (0, common_1.Patch)(':id/notification-preferences'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Update notification preferences (Family member only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Preferences updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid input data.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_preferences_dto_1.UpdateNotificationPreferencesDto, Object]),
    __metadata("design:returntype", Promise)
], FamilyMembersController.prototype, "updateNotificationPreferences", null);
__decorate([
    (0, common_1.Patch)(':id/complete-setup'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.FamilyMember),
    (0, swagger_1.ApiOperation)({ summary: 'Complete initial setup (Family member only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Setup completed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires Admin role.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FamilyMembersController.prototype, "completeSetup", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate family member (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family member deactivated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)('resend-credentials/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Resend login credentials to family member (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Credentials sent successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid ID format.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FamilyMembersController.prototype, "resendCredentials", null);
exports.FamilyMembersController = FamilyMembersController = __decorate([
    (0, swagger_1.ApiTags)('family-members'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('family-members'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [family_members_service_1.FamilyMembersService])
], FamilyMembersController);
//# sourceMappingURL=family-members.controller.js.map