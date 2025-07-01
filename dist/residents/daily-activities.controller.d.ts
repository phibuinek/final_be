import { DailyActivitiesService } from './daily-activities.service';
import { DailyActivityDto } from './dto/daily-activity.dto';
export declare class DailyActivitiesController {
    private readonly dailyActivitiesService;
    constructor(dailyActivitiesService: DailyActivitiesService);
    create(dailyActivityDto: DailyActivityDto): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    findByResident(residentId: string, startDate?: string, endDate?: string): Promise<import("./schemas/daily-activity.schema").DailyActivity[]>;
    findOne(id: string): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    addActivity(id: string, activity: any): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    updateActivity(id: string, index: number, activityUpdate: any): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    updateMeals(id: string, meals: any): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    updateSleep(id: string, sleep: any): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    completeDay(id: string): Promise<import("./schemas/daily-activity.schema").DailyActivity>;
    getActivityStats(residentId: string, startDate: string, endDate: string): Promise<{
        totalActivities: number;
        sleepQuality: {
            good: number;
            fair: number;
            poor: number;
        };
        mostCommonMood: string | null;
    }>;
}
