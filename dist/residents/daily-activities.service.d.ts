import { Model } from 'mongoose';
import { DailyActivity, DailyActivityDocument } from './schemas/daily-activity.schema';
import { DailyActivityDto } from './dto/daily-activity.dto';
export declare class DailyActivitiesService {
    private dailyActivityModel;
    constructor(dailyActivityModel: Model<DailyActivityDocument>);
    create(dailyActivityDto: DailyActivityDto): Promise<DailyActivity>;
    findByResident(residentId: string, startDate?: Date, endDate?: Date): Promise<DailyActivity[]>;
    findOne(id: string): Promise<DailyActivity>;
    findOrCreateForDate(residentId: string, date: Date): Promise<import("mongoose").Document<unknown, {}, DailyActivityDocument, {}> & DailyActivity & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addActivity(id: string, activity: any): Promise<DailyActivity>;
    updateActivity(id: string, index: number, activityUpdate: any): Promise<DailyActivity>;
    updateMeals(id: string, meals: any): Promise<DailyActivity>;
    updateSleep(id: string, sleep: any): Promise<DailyActivity>;
    completeDay(id: string): Promise<DailyActivity>;
    getActivityStats(residentId: string, startDate: Date, endDate: Date): Promise<{
        totalActivities: number;
        sleepQuality: {
            good: number;
            fair: number;
            poor: number;
        };
        mostCommonMood: string | null;
    }>;
    private getMostCommonMood;
}
