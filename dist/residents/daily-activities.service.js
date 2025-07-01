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
exports.DailyActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const daily_activity_schema_1 = require("./schemas/daily-activity.schema");
let DailyActivitiesService = class DailyActivitiesService {
    dailyActivityModel;
    constructor(dailyActivityModel) {
        this.dailyActivityModel = dailyActivityModel;
    }
    async create(dailyActivityDto) {
        const newActivity = new this.dailyActivityModel(dailyActivityDto);
        return newActivity.save();
    }
    async findByResident(residentId, startDate, endDate) {
        const query = { resident: residentId };
        if (startDate && endDate) {
            query.date = { $gte: startDate, $lte: endDate };
        }
        return this.dailyActivityModel.find(query).exec();
    }
    async findOne(id) {
        const activity = await this.dailyActivityModel.findById(id).exec();
        if (!activity) {
            throw new common_1.NotFoundException(`Daily activity record with ID ${id} not found`);
        }
        return activity;
    }
    async findOrCreateForDate(residentId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        let dailyActivity = await this.dailyActivityModel.findOne({
            resident: residentId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });
        if (!dailyActivity) {
            dailyActivity = new this.dailyActivityModel({
                resident: residentId,
                date: date,
                activities: [],
                meals: {
                    breakfast: { eaten: false },
                    lunch: { eaten: false },
                    dinner: { eaten: false },
                    snacks: []
                },
                sleep: {},
                isCompleted: false
            });
            await dailyActivity.save();
        }
        return dailyActivity;
    }
    async addActivity(id, activity) {
        return this.dailyActivityModel.findByIdAndUpdate(id, { $push: { activities: activity } }, { new: true });
    }
    async updateActivity(id, index, activityUpdate) {
        const key = `activities.${index}`;
        return this.dailyActivityModel.findByIdAndUpdate(id, { $set: { [key]: activityUpdate } }, { new: true });
    }
    async updateMeals(id, meals) {
        return this.dailyActivityModel.findByIdAndUpdate(id, { $set: { meals: meals } }, { new: true });
    }
    async updateSleep(id, sleep) {
        return this.dailyActivityModel.findByIdAndUpdate(id, { $set: { sleep: sleep } }, { new: true });
    }
    async completeDay(id) {
        return this.dailyActivityModel.findByIdAndUpdate(id, { isCompleted: true }, { new: true });
    }
    async getActivityStats(residentId, startDate, endDate) {
        const activities = await this.findByResident(residentId, startDate, endDate);
        return {
            totalActivities: activities.reduce((sum, day) => sum + day.activities.length, 0),
            sleepQuality: activities.reduce((stats, day) => {
                if (day.sleep?.quality) {
                    stats[day.sleep.quality] = (stats[day.sleep.quality] || 0) + 1;
                }
                return stats;
            }, { good: 0, fair: 0, poor: 0 }),
            mostCommonMood: this.getMostCommonMood(activities)
        };
    }
    getMostCommonMood(days) {
        const moodCounts = days.reduce((counts, day) => {
            day.activities.forEach((activity) => {
                if (activity.mood) {
                    counts[activity.mood] = (counts[activity.mood] || 0) + 1;
                }
            });
            return counts;
        }, {});
        if (Object.keys(moodCounts).length === 0) {
            return null;
        }
        const [mostFrequentMood] = Object.entries(moodCounts).reduce((a, b) => (a[1] > b[1] ? a : b));
        return mostFrequentMood;
    }
};
exports.DailyActivitiesService = DailyActivitiesService;
exports.DailyActivitiesService = DailyActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(daily_activity_schema_1.DailyActivity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DailyActivitiesService);
//# sourceMappingURL=daily-activities.service.js.map