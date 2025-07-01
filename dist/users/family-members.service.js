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
exports.FamilyMembersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const family_member_schema_1 = require("./schemas/family-member.schema");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../common/enums/role.enum");
let FamilyMembersService = class FamilyMembersService {
    familyMemberModel;
    userModel;
    constructor(familyMemberModel, userModel) {
        this.familyMemberModel = familyMemberModel;
        this.userModel = userModel;
    }
    async create(createFamilyMemberDto) {
        const existingUser = await this.userModel.findOne({ email: createFamilyMemberDto.email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const temporaryPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
        let user;
        try {
            user = new this.userModel({
                email: createFamilyMemberDto.email,
                username: createFamilyMemberDto.email,
                password: hashedPassword,
                fullName: createFamilyMemberDto.fullName,
                roles: [role_enum_1.Role.FamilyMember],
            });
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create user account.', error.message);
        }
        try {
            const familyMember = new this.familyMemberModel({
                user: user._id,
                fullName: createFamilyMemberDto.fullName,
                phoneNumber: createFamilyMemberDto.phoneNumber,
                relationship: createFamilyMemberDto.relationship,
                residents: createFamilyMemberDto.residentIds,
                notes: createFamilyMemberDto.notes,
                notificationPreferences: createFamilyMemberDto.notificationPreferences || {
                    health: { email: true, push: false, sms: false },
                    activity: { email: true, push: false, sms: false },
                    medication: { email: true, push: false, sms: false },
                    care_team: { email: true, push: false, sms: false }
                }
            });
            await familyMember.save();
            await this.sendLoginCredentials(createFamilyMemberDto.email, temporaryPassword);
            return familyMember.populate('user residents');
        }
        catch (error) {
            await this.userModel.findByIdAndDelete(user._id);
            throw new common_1.InternalServerErrorException('Failed to create family member profile.', error.message);
        }
    }
    async findAll() {
        return this.familyMemberModel.find({ isActive: true }).populate('user residents');
    }
    async findOne(id) {
        const familyMember = await this.familyMemberModel.findById(id).populate('user residents');
        if (!familyMember || !familyMember.isActive) {
            throw new common_1.NotFoundException('Family member not found');
        }
        return familyMember;
    }
    async findByUser(userId) {
        const familyMember = await this.familyMemberModel.findOne({ user: userId }).populate('user residents');
        if (!familyMember || !familyMember.isActive) {
            throw new common_1.NotFoundException('Family member profile not found');
        }
        return familyMember;
    }
    async update(id, updateData) {
        const familyMember = await this.familyMemberModel.findById(id);
        if (!familyMember || !familyMember.isActive) {
            throw new common_1.NotFoundException('Family member not found');
        }
        if (updateData.email || updateData.fullName) {
            const userUpdate = {};
            if (updateData.email) {
                const existingUser = await this.userModel.findOne({ email: updateData.email, _id: { $ne: familyMember.user } });
                if (existingUser) {
                    throw new common_1.BadRequestException('Email already in use');
                }
                userUpdate.email = updateData.email;
            }
            if (updateData.fullName) {
                userUpdate.fullName = updateData.fullName;
            }
            await this.userModel.findByIdAndUpdate(familyMember.user, userUpdate);
        }
        const { email, residentIds, ...profileData } = updateData;
        if (residentIds) {
            profileData.residents = residentIds;
        }
        return this.familyMemberModel
            .findByIdAndUpdate(id, profileData, { new: true })
            .populate('user residents');
    }
    async deactivate(id) {
        const familyMember = await this.familyMemberModel.findById(id);
        if (!familyMember) {
            throw new common_1.NotFoundException('Family member not found');
        }
        await this.userModel.findByIdAndUpdate(familyMember.user, { isActive: false });
        await this.familyMemberModel.findByIdAndUpdate(id, { isActive: false });
        return { message: 'Family member deactivated successfully' };
    }
    async addResident(id, residentId) {
        const familyMember = await this.familyMemberModel.findById(id);
        if (!familyMember || !familyMember.isActive) {
            throw new common_1.NotFoundException('Family member not found');
        }
        if (!familyMember.residents.includes(residentId)) {
            familyMember.residents.push(residentId);
            await familyMember.save();
        }
        return familyMember.populate('user residents');
    }
    async removeResident(id, residentId) {
        const familyMember = await this.familyMemberModel.findById(id);
        if (!familyMember || !familyMember.isActive) {
            throw new common_1.NotFoundException('Family member not found');
        }
        familyMember.residents = familyMember.residents.filter((id) => id.toString() !== residentId);
        await familyMember.save();
        return familyMember.populate('user residents');
    }
    async updateNotificationPreferences(id, preferences) {
        const familyMember = await this.familyMemberModel.findById(id);
        if (!familyMember || !familyMember.isActive) {
            throw new common_1.NotFoundException('Family member not found');
        }
        const updatedPreferences = {
            ...familyMember.notificationPreferences,
            ...preferences
        };
        return this.familyMemberModel.findByIdAndUpdate(id, { notificationPreferences: updatedPreferences }, { new: true });
    }
    async completeSetup(id) {
        const familyMember = await this.familyMemberModel.findByIdAndUpdate(id, { hasCompletedSetup: true }, { new: true });
        if (!familyMember) {
            throw new common_1.NotFoundException('Family member not found');
        }
        return familyMember;
    }
    async resendCredentials(id) {
        const familyMember = await this.findOne(id);
        if (!familyMember.user) {
            throw new common_1.InternalServerErrorException('Family member is not associated with a user account.');
        }
        const temporaryPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
        const user = familyMember.user;
        await this.userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        await this.sendLoginCredentials(user.email, temporaryPassword);
        return { message: 'New credentials have been sent successfully.' };
    }
    async sendLoginCredentials(email, password) {
        console.log(`Sending credentials to ${email}. Password: ${password}`);
    }
};
exports.FamilyMembersService = FamilyMembersService;
exports.FamilyMembersService = FamilyMembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(family_member_schema_1.FamilyMember.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FamilyMembersService);
//# sourceMappingURL=family-members.service.js.map