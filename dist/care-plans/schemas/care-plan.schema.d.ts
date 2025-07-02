import { Document } from 'mongoose';
export declare class CarePlan extends Document {
    plan_name: string;
    description: string;
    monthly_price: number;
    plan_type: string;
    category: string;
    services_included: string[];
    staff_ratio: string;
    duration_type: string;
    default_medications: string[];
    prerequisites: string[];
    contraindications: string[];
    is_active: boolean;
}
export declare const CarePlanSchema: import("mongoose").Schema<CarePlan, import("mongoose").Model<CarePlan, any, any, any, Document<unknown, any, CarePlan, any> & CarePlan & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CarePlan, Document<unknown, {}, import("mongoose").FlatRecord<CarePlan>, {}> & import("mongoose").FlatRecord<CarePlan> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
