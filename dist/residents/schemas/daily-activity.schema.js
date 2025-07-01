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
exports.DailyActivitySchema = exports.DailyActivity = exports.ActivityDetail = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let ActivityDetail = class ActivityDetail {
    time;
    type;
    description;
    status;
    notes;
    mood;
    performedBy;
};
exports.ActivityDetail = ActivityDetail;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], ActivityDetail.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['meal', 'medication', 'exercise', 'bath', 'sleep', 'recreation', 'other'], required: true }),
    __metadata("design:type", String)
], ActivityDetail.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ActivityDetail.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['completed', 'skipped', 'refused', 'pending'], default: 'pending' }),
    __metadata("design:type", String)
], ActivityDetail.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ActivityDetail.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['happy', 'neutral', 'sad', 'angry', 'anxious'], required: true }),
    __metadata("design:type", String)
], ActivityDetail.prototype, "mood", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], ActivityDetail.prototype, "performedBy", void 0);
exports.ActivityDetail = ActivityDetail = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ActivityDetail);
const ActivityDetailSchema = mongoose_1.SchemaFactory.createForClass(ActivityDetail);
let MealDetail = class MealDetail {
    eaten;
    notes;
};
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], MealDetail.prototype, "eaten", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MealDetail.prototype, "notes", void 0);
MealDetail = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MealDetail);
const MealDetailSchema = mongoose_1.SchemaFactory.createForClass(MealDetail);
let Snack = class Snack {
    time;
    notes;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Snack.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Snack.prototype, "notes", void 0);
Snack = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Snack);
const SnackSchema = mongoose_1.SchemaFactory.createForClass(Snack);
let Meals = class Meals {
    breakfast;
    lunch;
    dinner;
    snacks;
};
__decorate([
    (0, mongoose_1.Prop)({ type: MealDetailSchema, default: () => ({}) }),
    __metadata("design:type", MealDetail)
], Meals.prototype, "breakfast", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: MealDetailSchema, default: () => ({}) }),
    __metadata("design:type", MealDetail)
], Meals.prototype, "lunch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: MealDetailSchema, default: () => ({}) }),
    __metadata("design:type", MealDetail)
], Meals.prototype, "dinner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SnackSchema], default: [] }),
    __metadata("design:type", Array)
], Meals.prototype, "snacks", void 0);
Meals = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Meals);
const MealsSchema = mongoose_1.SchemaFactory.createForClass(Meals);
let Sleep = class Sleep {
    startTime;
    endTime;
    quality;
    notes;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Sleep.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Sleep.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['good', 'fair', 'poor'] }),
    __metadata("design:type", String)
], Sleep.prototype, "quality", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Sleep.prototype, "notes", void 0);
Sleep = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Sleep);
const SleepSchema = mongoose_1.SchemaFactory.createForClass(Sleep);
let DailyActivity = class DailyActivity {
    resident;
    date;
    activities;
    meals;
    sleep;
    dailyNotes;
    isCompleted;
};
exports.DailyActivity = DailyActivity;
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'Resident' }),
    (0, swagger_1.ApiProperty)({ description: 'Resident ID' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], DailyActivity.prototype, "resident", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    (0, swagger_1.ApiProperty)({ description: 'Date of activities' }),
    __metadata("design:type", Date)
], DailyActivity.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ActivityDetailSchema], default: [] }),
    (0, swagger_1.ApiProperty)({ description: 'List of activities for the day' }),
    __metadata("design:type", Array)
], DailyActivity.prototype, "activities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: MealsSchema, default: () => ({}) }),
    (0, swagger_1.ApiProperty)({ description: 'Meal tracking for the day' }),
    __metadata("design:type", Meals)
], DailyActivity.prototype, "meals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SleepSchema, default: () => ({}) }),
    (0, swagger_1.ApiProperty)({ description: 'Sleep tracking' }),
    __metadata("design:type", Sleep)
], DailyActivity.prototype, "sleep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({ description: 'Overall notes for the day' }),
    __metadata("design:type", String)
], DailyActivity.prototype, "dailyNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    (0, swagger_1.ApiProperty)({ description: 'Whether the day record is completed' }),
    __metadata("design:type", Boolean)
], DailyActivity.prototype, "isCompleted", void 0);
exports.DailyActivity = DailyActivity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DailyActivity);
exports.DailyActivitySchema = mongoose_1.SchemaFactory.createForClass(DailyActivity);
//# sourceMappingURL=daily-activity.schema.js.map