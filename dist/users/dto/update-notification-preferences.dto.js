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
exports.UpdateNotificationPreferencesDto = exports.NotificationChannelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class NotificationChannelDto {
    email;
    push;
    sms;
}
exports.NotificationChannelDto = NotificationChannelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Enable/disable email notifications' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationChannelDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Enable/disable push notifications' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationChannelDto.prototype, "push", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Enable/disable SMS notifications' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationChannelDto.prototype, "sms", void 0);
class UpdateNotificationPreferencesDto {
    health;
    activity;
    medication;
    care_team;
}
exports.UpdateNotificationPreferencesDto = UpdateNotificationPreferencesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Health-related notification settings' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationChannelDto),
    __metadata("design:type", NotificationChannelDto)
], UpdateNotificationPreferencesDto.prototype, "health", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Activity-related notification settings' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationChannelDto),
    __metadata("design:type", NotificationChannelDto)
], UpdateNotificationPreferencesDto.prototype, "activity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Medication-related notification settings' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationChannelDto),
    __metadata("design:type", NotificationChannelDto)
], UpdateNotificationPreferencesDto.prototype, "medication", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Care team-related notification settings' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationChannelDto),
    __metadata("design:type", NotificationChannelDto)
], UpdateNotificationPreferencesDto.prototype, "care_team", void 0);
//# sourceMappingURL=update-notification-preferences.dto.js.map