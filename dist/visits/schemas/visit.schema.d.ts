import { Document, Types } from 'mongoose';
export declare enum VisitStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Visit extends Document {
    resident: Types.ObjectId;
    familyMember: Types.ObjectId;
    scheduledDate: Date;
    scheduledTime: string;
    duration: number;
    status: VisitStatus;
    purpose?: string;
    notes?: string;
    staffNotes?: string;
    approvedBy?: Types.ObjectId;
    approvedAt?: Date;
    actualStartTime?: Date;
    actualEndTime?: Date;
}
export declare const VisitSchema: import("mongoose").Schema<Visit, import("mongoose").Model<Visit, any, any, any, Document<unknown, any, Visit, any> & Visit & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Visit, Document<unknown, {}, import("mongoose").FlatRecord<Visit>, {}> & import("mongoose").FlatRecord<Visit> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
