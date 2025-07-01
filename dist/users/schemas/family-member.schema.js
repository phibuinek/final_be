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
exports.FamilyMemberSchema = exports.FamilyMember = exports.NotificationSetting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("./user.schema");
let NotificationSetting = class NotificationSetting {
    email;
    push;
    sms;
};
exports.NotificationSetting = NotificationSetting;
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "push", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "sms", void 0);
exports.NotificationSetting = NotificationSetting = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NotificationSetting);
const NotificationSettingSchema = mongoose_1.SchemaFactory.createForClass(NotificationSetting);
let FamilyMember = class FamilyMember extends mongoose_2.Document {
    user;
    fullName;
    phoneNumber;
    relationship;
    residents;
    isActive;
    notificationPreferences;
    lastLogin;
    hasCompletedSetup;
    notes;
};
exports.FamilyMember = FamilyMember;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    (0, swagger_1.ApiProperty)({ description: 'User account associated with family member' }),
    __metadata("design:type", user_schema_1.User)
], FamilyMember.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Full name of the family member' }),
    __metadata("design:type", String)
], FamilyMember.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Phone number of the family member' }),
    __metadata("design:type", String)
], FamilyMember.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ description: 'Relationship with the resident (son, daughter, spouse, etc.)' }),
    __metadata("design:type", String)
], FamilyMember.prototype, "relationship", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Resident' }] }),
    (0, swagger_1.ApiProperty)({ description: 'List of related residents' }),
    __metadata("design:type", Array)
], FamilyMember.prototype, "residents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    (0, swagger_1.ApiProperty)({ description: 'Whether the family member is active' }),
    __metadata("design:type", Boolean)
], FamilyMember.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            health: NotificationSettingSchema,
            activity: NotificationSettingSchema,
            medication: NotificationSettingSchema,
            care_team: NotificationSettingSchema
        },
        _id: false,
        default: () => ({
            health: {},
            activity: {},
            medication: {},
            care_team: {}
        })
    }),
    (0, swagger_1.ApiProperty)({ description: 'Notification preferences' }),
    __metadata("design:type", Object)
], FamilyMember.prototype, "notificationPreferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    (0, swagger_1.ApiProperty)({ description: 'Last login date' }),
    __metadata("design:type", Date)
], FamilyMember.prototype, "lastLogin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    (0, swagger_1.ApiProperty)({ description: 'Whether the family member has completed initial setup' }),
    __metadata("design:type", Boolean)
], FamilyMember.prototype, "hasCompletedSetup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Additional notes' }),
    __metadata("design:type", String)
], FamilyMember.prototype, "notes", void 0);
exports.FamilyMember = FamilyMember = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.__v;
                return ret;
            },
        },
    })
], FamilyMember);
exports.FamilyMemberSchema = mongoose_1.SchemaFactory.createForClass(FamilyMember);
//# sourceMappingURL=family-member.schema.js.map