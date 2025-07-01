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
exports.FamilyAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const family_members_service_1 = require("../family-members.service");
const role_enum_1 = require("../../common/enums/role.enum");
let FamilyAccessGuard = class FamilyAccessGuard {
    familyMembersService;
    constructor(familyMembersService) {
        this.familyMembersService = familyMembersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.roles) {
            return false;
        }
        if (user.roles.includes(role_enum_1.Role.Admin) || user.roles.includes(role_enum_1.Role.Staff)) {
            return true;
        }
        if (user.roles.includes(role_enum_1.Role.FamilyMember)) {
            const residentId = request.params.residentId || request.params.id;
            if (!residentId) {
                throw new common_1.BadRequestException('Resident ID is missing in the request parameters.');
            }
            try {
                const familyMemberProfile = await this.familyMembersService.findByUser(user.userId);
                const isLinked = familyMemberProfile.residents.some((linkedResidentId) => linkedResidentId.toString() === residentId);
                if (isLinked) {
                    return true;
                }
            }
            catch (error) {
                throw new common_1.ForbiddenException('You do not have access to this resident\'s information.');
            }
            throw new common_1.ForbiddenException('You do not have access to this resident\'s information.');
        }
        return false;
    }
};
exports.FamilyAccessGuard = FamilyAccessGuard;
exports.FamilyAccessGuard = FamilyAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [family_members_service_1.FamilyMembersService])
], FamilyAccessGuard);
//# sourceMappingURL=family-access.guard.js.map