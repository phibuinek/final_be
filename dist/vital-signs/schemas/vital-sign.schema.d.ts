import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class VitalSign extends Document {
    resident_id: MongooseSchema.Types.ObjectId;
    recorded_by: MongooseSchema.Types.ObjectId;
    date_time: Date;
    temperature?: number;
    heart_rate?: number;
    blood_pressure?: string;
    respiratory_rate?: number;
    oxygen_level?: number;
    weight?: number;
    height?: number;
    bmi?: number;
    blood_sugar?: number;
    notes?: string;
    overall_status?: string;
}
export declare const VitalSignSchema: MongooseSchema<VitalSign, import("mongoose").Model<VitalSign, any, any, any, Document<unknown, any, VitalSign, any> & VitalSign & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VitalSign, Document<unknown, {}, import("mongoose").FlatRecord<VitalSign>, {}> & import("mongoose").FlatRecord<VitalSign> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
