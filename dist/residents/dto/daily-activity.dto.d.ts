export declare class ActivityItemDto {
    time: Date;
    type: string;
    description?: string;
    status: string;
    mood: string;
    notes?: string;
}
export declare class MealTrackingDto {
    eaten: boolean;
    notes?: string;
}
export declare class SleepTrackingDto {
    startTime: Date;
    endTime: Date;
    quality: string;
    notes?: string;
}
export declare class DailyActivityDto {
    residentId: string;
    date: Date;
    activities: ActivityItemDto[];
    meals: {
        breakfast: MealTrackingDto;
        lunch: MealTrackingDto;
        dinner: MealTrackingDto;
        snacks: {
            time: Date;
            notes: string;
        }[];
    };
    sleep: SleepTrackingDto;
    dailyNotes?: string;
    isCompleted?: boolean;
}
