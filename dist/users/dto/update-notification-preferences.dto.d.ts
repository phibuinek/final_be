export declare class NotificationChannelDto {
    email: boolean;
    push: boolean;
    sms: boolean;
}
export declare class UpdateNotificationPreferencesDto {
    health?: NotificationChannelDto;
    activity?: NotificationChannelDto;
    medication?: NotificationChannelDto;
    care_team?: NotificationChannelDto;
}
