import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';
export declare class User extends Document {
    email: string;
    password: string;
    fullName: string;
    roles: Role[];
    isActive: boolean;
    username: string;
    phoneNumber?: string;
    address?: string;
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
