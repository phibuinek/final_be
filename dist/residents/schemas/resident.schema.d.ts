import { Document, Schema as MongooseSchema } from 'mongoose';
declare class MedicationRecord {
    medication_name: string;
    dosage: string;
    frequency: string;
}
declare class EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
}
export declare class Resident extends Document {
    full_name: string;
    date_of_birth: Date;
    gender: string;
    admission_date: Date;
    discharge_date?: Date;
    family_member_id: MongooseSchema.Types.ObjectId;
    medical_history: string;
    current_medications: MedicationRecord[];
    allergies: string[];
    emergency_contact: EmergencyContact;
    care_level: string;
    status: string;
}
export declare const ResidentSchema: MongooseSchema<Resident, import("mongoose").Model<Resident, any, any, any, Document<unknown, any, Resident, any> & Resident & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resident, Document<unknown, {}, import("mongoose").FlatRecord<Resident>, {}> & import("mongoose").FlatRecord<Resident> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
