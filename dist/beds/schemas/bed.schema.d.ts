import { Document } from 'mongoose';
export declare enum BedStatus {
    AVAILABLE = "available",
    OCCUPIED = "occupied",
    MAINTENANCE = "maintenance"
}
export declare class Bed extends Document {
    name: string;
    room: string;
    status: BedStatus;
    notes?: string;
}
export declare const BedSchema: import("mongoose").Schema<Bed, import("mongoose").Model<Bed, any, any, any, Document<unknown, any, Bed, any> & Bed & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bed, Document<unknown, {}, import("mongoose").FlatRecord<Bed>, {}> & import("mongoose").FlatRecord<Bed> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
