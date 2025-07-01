import { Model } from 'mongoose';
import { FamilyMember } from './schemas/family-member.schema';
import { User } from './schemas/user.schema';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
export declare class FamilyMembersService {
    private familyMemberModel;
    private userModel;
    constructor(familyMemberModel: Model<FamilyMember>, userModel: Model<User>);
    create(createFamilyMemberDto: CreateFamilyMemberDto): Promise<Omit<import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByUser(userId: string): Promise<import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateData: Partial<CreateFamilyMemberDto>): Promise<(import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deactivate(id: string): Promise<{
        message: string;
    }>;
    addResident(id: string, residentId: string): Promise<Omit<import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    removeResident(id: string, residentId: string): Promise<Omit<import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    updateNotificationPreferences(id: string, preferences: UpdateNotificationPreferencesDto): Promise<(import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    completeSetup(id: string): Promise<import("mongoose").Document<unknown, {}, FamilyMember, {}> & FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    resendCredentials(id: string): Promise<{
        message: string;
    }>;
    private sendLoginCredentials;
}
