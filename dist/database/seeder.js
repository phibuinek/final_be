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
exports.DatabaseSeeder = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../users/schemas/user.schema");
const role_enum_1 = require("../common/enums/role.enum");
let DatabaseSeeder = class DatabaseSeeder {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async seed() {
        await this.seedAdminUser();
    }
    async seedAdminUser() {
        const adminExists = await this.userModel.findOne({ roles: role_enum_1.Role.Admin });
        if (adminExists) {
            console.log('Admin user already exists, skipping seeding.');
            return;
        }
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = await this.userModel.create({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            fullName: 'System Administrator',
            roles: [role_enum_1.Role.Admin],
            phoneNumber: '1234567890',
            address: 'System Address',
        });
        console.log('Admin user created successfully:', adminUser.email);
    }
};
exports.DatabaseSeeder = DatabaseSeeder;
exports.DatabaseSeeder = DatabaseSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DatabaseSeeder);
//# sourceMappingURL=seeder.js.map