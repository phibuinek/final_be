import { Document, Schema as MongooseSchema } from 'mongoose';
export type ResidentDocument = Resident & Document;
declare class CarePlan {
    startDate: Date;
    endDate: Date;
    description: string;
    actions: string[];
}
export declare class Resident {
    fullName: string;
    dateOfBirth: Date;
    gender: string;
    contactInfo: string;
    medicalHistory: string;
    allergies: string;
    emergencyContact: string;
    isActive: boolean;
    bed: MongooseSchema.Types.ObjectId;
    familyMembers: MongooseSchema.Types.ObjectId[];
    medications: Record<string, any>[];
    carePlans: CarePlan[];
}
export declare const ResidentSchema: MongooseSchema<Resident, import("mongoose").Model<Resident, any, any, any, Document<unknown, any, Resident, any> & Resident & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resident, Document<unknown, {}, import("mongoose").FlatRecord<Resident>, {}> & import("mongoose").FlatRecord<Resident> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
