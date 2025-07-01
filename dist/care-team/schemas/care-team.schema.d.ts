import { Document, Schema as MongooseSchema } from 'mongoose';
export type CareTeamDocument = CareTeam & Document;
export declare class CareTeam {
    primaryDoctor: MongooseSchema.Types.ObjectId;
    nurses: MongooseSchema.Types.ObjectId[];
    resident: MongooseSchema.Types.ObjectId;
    schedule: Record<string, any>[];
    notes: string;
}
export declare const CareTeamSchema: MongooseSchema<CareTeam, import("mongoose").Model<CareTeam, any, any, any, Document<unknown, any, CareTeam, any> & CareTeam & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CareTeam, Document<unknown, {}, import("mongoose").FlatRecord<CareTeam>, {}> & import("mongoose").FlatRecord<CareTeam> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
