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
exports.BedsController = void 0;
const common_1 = require("@nestjs/common");
const beds_service_1 = require("./beds.service");
const create_bed_dto_1 = require("./dto/create-bed.dto");
const update_bed_dto_1 = require("./dto/update-bed.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
let BedsController = class BedsController {
    bedsService;
    constructor(bedsService) {
        this.bedsService = bedsService;
    }
    create(createBedDto) {
        return this.bedsService.create(createBedDto);
    }
    findAll() {
        return this.bedsService.findAll();
    }
    findOne(id) {
        return this.bedsService.findOne(id);
    }
    update(id, updateBedDto) {
        return this.bedsService.update(id, updateBedDto);
    }
    remove(id) {
        return this.bedsService.remove(id);
    }
};
exports.BedsController = BedsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new bed (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The bed has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bed_dto_1.CreateBedDto]),
    __metadata("design:returntype", void 0)
], BedsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get all beds (Admin/Staff only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BedsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Staff),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single bed by ID (Admin/Staff only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BedsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Update a bed (Admin only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bed_dto_1.UpdateBedDto]),
    __metadata("design:returntype", void 0)
], BedsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a bed (Admin only)' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BedsController.prototype, "remove", null);
exports.BedsController = BedsController = __decorate([
    (0, swagger_1.ApiTags)('beds'),
    (0, common_1.Controller)('beds'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [beds_service_1.BedsService])
], BedsController);
//# sourceMappingURL=beds.controller.js.map