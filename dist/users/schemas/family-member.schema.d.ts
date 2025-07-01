import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
export type FamilyMemberDocument = FamilyMember & Document;
export declare class NotificationSetting {
    email: boolean;
    push: boolean;
    sms: boolean;
}
export declare class FamilyMember extends Document {
    user: User;
    fullName: string;
    phoneNumber: string;
    relationship: string;
    residents: MongooseSchema.Types.ObjectId[];
    isActive: boolean;
    notificationPreferences: {
        health: NotificationSetting;
        activity: NotificationSetting;
        medication: NotificationSetting;
        care_team: NotificationSetting;
    };
    lastLogin: Date;
    hasCompletedSetup: boolean;
    notes: string;
}
export declare const FamilyMemberSchema: MongooseSchema<FamilyMember, import("mongoose").Model<FamilyMember, any, any, any, Document<unknown, any, FamilyMember, any> & FamilyMember & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FamilyMember, Document<unknown, {}, import("mongoose").FlatRecord<FamilyMember>, {}> & import("mongoose").FlatRecord<FamilyMember> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
