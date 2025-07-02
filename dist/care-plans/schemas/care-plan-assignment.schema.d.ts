import { Document, Schema as MongooseSchema } from 'mongoose';
declare class FamilyPreferences {
    preferred_room_gender: string;
    preferred_floor: number;
    special_requests: string;
}
declare class MedicationRecord {
    medication_name: string;
    dosage: string;
    frequency: string;
}
export declare class CarePlanAssignment extends Document {
    staff_id: MongooseSchema.Types.ObjectId;
    care_plan_ids: MongooseSchema.Types.ObjectId[];
    resident_id: MongooseSchema.Types.ObjectId;
    family_member_id: MongooseSchema.Types.ObjectId;
    registration_date: Date;
    consultation_notes: string;
    selected_room_type: string;
    assigned_room_id: MongooseSchema.Types.ObjectId;
    assigned_bed_id: MongooseSchema.Types.ObjectId;
    family_preferences: FamilyPreferences;
    total_monthly_cost: number;
    room_monthly_cost: number;
    care_plans_monthly_cost: number;
    start_date: Date;
    end_date: Date;
    additional_medications: MedicationRecord[];
    status: string;
    payment_status: string;
    notes: string;
}
export declare const CarePlanAssignmentSchema: MongooseSchema<CarePlanAssignment, import("mongoose").Model<CarePlanAssignment, any, any, any, Document<unknown, any, CarePlanAssignment, any> & CarePlanAssignment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CarePlanAssignment, Document<unknown, {}, import("mongoose").FlatRecord<CarePlanAssignment>, {}> & import("mongoose").FlatRecord<CarePlanAssignment> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
