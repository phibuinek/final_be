import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
export declare class DatabaseSeeder {
    private userModel;
    constructor(userModel: Model<User>);
    seed(): Promise<void>;
    private seedAdminUser;
}
