import { Document } from 'mongoose';
export declare class User extends Document {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    username: string;
    role: string;
    is_super_admin?: boolean;
    position?: string;
    qualification?: string;
    join_date?: Date;
    relationship?: string;
    residents?: string[];
    address?: string;
    isActive: boolean;
    notes?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
