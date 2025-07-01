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
exports.DailyActivityDto = exports.SleepTrackingDto = exports.MealTrackingDto = exports.ActivityItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ActivityItemDto {
    time;
    type;
    description;
    status;
    mood;
    notes;
}
exports.ActivityItemDto = ActivityItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time of the activity' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActivityItemDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of activity', enum: ['meal', 'medication', 'exercise', 'bath', 'sleep', 'recreation', 'other'] }),
    (0, class_validator_1.IsEnum)(['meal', 'medication', 'exercise', 'bath', 'sleep', 'recreation', 'other']),
    __metadata("design:type", String)
], ActivityItemDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the activity' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the activity', enum: ['completed', 'skipped', 'refused', 'pending'] }),
    (0, class_validator_1.IsEnum)(['completed', 'skipped', 'refused', 'pending']),
    __metadata("design:type", String)
], ActivityItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mood during activity', enum: ['happy', 'neutral', 'sad', 'angry', 'anxious'] }),
    (0, class_validator_1.IsEnum)(['happy', 'neutral', 'sad', 'angry', 'anxious']),
    __metadata("design:type", String)
], ActivityItemDto.prototype, "mood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityItemDto.prototype, "notes", void 0);
class MealTrackingDto {
    eaten;
    notes;
}
exports.MealTrackingDto = MealTrackingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether breakfast was eaten' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MealTrackingDto.prototype, "eaten", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes about the meal' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MealTrackingDto.prototype, "notes", void 0);
class SleepTrackingDto {
    startTime;
    endTime;
    quality;
    notes;
}
exports.SleepTrackingDto = SleepTrackingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep start time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepTrackingDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep end time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepTrackingDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep quality', enum: ['good', 'fair', 'poor'] }),
    (0, class_validator_1.IsEnum)(['good', 'fair', 'poor']),
    __metadata("design:type", String)
], SleepTrackingDto.prototype, "quality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes about sleep' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SleepTrackingDto.prototype, "notes", void 0);
class DailyActivityDto {
    residentId;
    date;
    activities;
    meals;
    sleep;
    dailyNotes;
    isCompleted;
}
exports.DailyActivityDto = DailyActivityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resident ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DailyActivityDto.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of activities' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DailyActivityDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of activities', type: [ActivityItemDto] }),
    __metadata("design:type", Array)
], DailyActivityDto.prototype, "activities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Meal tracking for the day' }),
    __metadata("design:type", Object)
], DailyActivityDto.prototype, "meals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep tracking' }),
    __metadata("design:type", SleepTrackingDto)
], DailyActivityDto.prototype, "sleep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overall notes for the day' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DailyActivityDto.prototype, "dailyNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the day record is completed' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DailyActivityDto.prototype, "isCompleted", void 0);
//# sourceMappingURL=daily-activity.dto.js.map