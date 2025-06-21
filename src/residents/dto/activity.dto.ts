import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class ActivityDto {
  @ApiProperty({ description: 'Resident ID' })
  @IsNotEmpty()
  @IsString()
  residentId: string;

  @ApiProperty({ description: 'Activity name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Activity description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Activity date and time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  scheduledTime?: Date;

  @ApiProperty({ description: 'Activity duration in minutes' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ description: 'Activity location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Staff responsible for activity' })
  @IsOptional()
  @IsString()
  responsibleStaff?: string;

  @ApiProperty({ description: 'Whether the resident participated in the activity' })
  @IsOptional()
  @IsBoolean()
  participated?: boolean;

  @ApiProperty({ description: 'Notes about resident participation' })
  @IsOptional()
  @IsString()
  participationNotes?: string;
} 