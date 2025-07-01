import { Document, Schema as MongooseSchema } from 'mongoose';
export type DailyActivityDocument = DailyActivity & Document;
export declare class ActivityDetail {
    time: Date;
    type: string;
    description: string;
    status: string;
    notes: string;
    mood: string;
    performedBy: MongooseSchema.Types.ObjectId;
}
declare class MealDetail {
    eaten: boolean;
    notes: string;
}
declare class Snack {
    time: Date;
    notes: string;
}
declare class Meals {
    breakfast: MealDetail;
    lunch: MealDetail;
    dinner: MealDetail;
    snacks: Snack[];
}
declare class Sleep {
    startTime: Date;
    endTime: Date;
    quality: string;
    notes: string;
}
export declare class DailyActivity {
    resident: MongooseSchema.Types.ObjectId;
    date: Date;
    activities: ActivityDetail[];
    meals: Meals;
    sleep: Sleep;
    dailyNotes: string;
    isCompleted: boolean;
}
export declare const DailyActivitySchema: MongooseSchema<DailyActivity, import("mongoose").Model<DailyActivity, any, any, any, Document<unknown, any, DailyActivity, any> & DailyActivity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DailyActivity, Document<unknown, {}, import("mongoose").FlatRecord<DailyActivity>, {}> & import("mongoose").FlatRecord<DailyActivity> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
