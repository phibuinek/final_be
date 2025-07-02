import { Document } from 'mongoose';
export declare enum RoomType {
    SINGLE = "single",
    DOUBLE = "double",
    TRIPLE = "triple",
    QUAD = "quad"
}
export declare enum RoomStatus {
    AVAILABLE = "available",
    FULL = "full",
    MAINTENANCE = "maintenance",
    CLEANING = "cleaning"
}
export declare class Room extends Document {
    name: string;
    floor: number;
    type: RoomType;
    capacity: number;
    status: RoomStatus;
    description?: string;
    notes?: string;
}
export declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any, any, Document<unknown, any, Room, any> & Room & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Room, Document<unknown, {}, import("mongoose").FlatRecord<Room>, {}> & import("mongoose").FlatRecord<Room> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
