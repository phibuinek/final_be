import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NotificationChannelDto {
  @ApiProperty({ description: 'Enable/disable email notifications' })
  @IsBoolean()
  email: boolean;

  @ApiProperty({ description: 'Enable/disable push notifications' })
  @IsBoolean()
  push: boolean;

  @ApiProperty({ description: 'Enable/disable SMS notifications' })
  @IsBoolean()
  sms: boolean;
}

export class UpdateNotificationPreferencesDto {
  @ApiProperty({ description: 'Health-related notification settings' })
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  health?: NotificationChannelDto;

  @ApiProperty({ description: 'Activity-related notification settings' })
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  activity?: NotificationChannelDto;

  @ApiProperty({ description: 'Medication-related notification settings' })
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  medication?: NotificationChannelDto;

  @ApiProperty({ description: 'Care team-related notification settings' })
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  care_team?: NotificationChannelDto;
} 