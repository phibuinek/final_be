import { FamilyMembersService } from './family-members.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
export declare class FamilyMembersController {
    private readonly familyMembersService;
    constructor(familyMembersService: FamilyMembersService);
    create(createFamilyMemberDto: CreateFamilyMemberDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateFamilyMemberDto: CreateFamilyMemberDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addResident(id: string, residentId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    removeResident(id: string, residentId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    updateNotificationPreferences(id: string, preferences: UpdateNotificationPreferencesDto, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    completeSetup(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/family-member.schema").FamilyMember, {}> & import("./schemas/family-member.schema").FamilyMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deactivate(id: string): Promise<{
        message: string;
    }>;
    resendCredentials(id: string): Promise<{
        message: string;
    }>;
}
