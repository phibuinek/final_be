"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_schema_1 = require("./schemas/user.schema");
const family_member_schema_1 = require("./schemas/family-member.schema");
const family_members_service_1 = require("./family-members.service");
const family_members_controller_1 = require("./family-members.controller");
const family_access_guard_1 = require("./guards/family-access.guard");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: family_member_schema_1.FamilyMember.name, schema: family_member_schema_1.FamilyMemberSchema }
            ])
        ],
        controllers: [users_controller_1.UsersController, family_members_controller_1.FamilyMembersController],
        providers: [users_service_1.UsersService, family_members_service_1.FamilyMembersService, family_access_guard_1.FamilyAccessGuard],
        exports: [users_service_1.UsersService, family_members_service_1.FamilyMembersService, family_access_guard_1.FamilyAccessGuard],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map