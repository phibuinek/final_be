export declare class CreateFamilyMemberDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    relationship: string;
    residentIds?: string[];
    notes?: string;
    notificationPreferences?: {
        health?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
        activity?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
        medication?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
        care_team?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
    };
}
