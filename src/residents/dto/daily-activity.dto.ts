import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class ActivityItemDto {
  @ApiProperty({ description: 'Time of the activity' })
  @Type(() => Date)
  @IsDate()
  time: Date;

  @ApiProperty({ description: 'Type of activity', enum: ['meal', 'medication', 'exercise', 'bath', 'sleep', 'recreation', 'other'] })
  @IsEnum(['meal', 'medication', 'exercise', 'bath', 'sleep', 'recreation', 'other'])
  type: string;

  @ApiProperty({ description: 'Description of the activity' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Status of the activity', enum: ['completed', 'skipped', 'refused', 'pending'] })
  @IsEnum(['completed', 'skipped', 'refused', 'pending'])
  status: string;

  @ApiProperty({ description: 'Mood during activity', enum: ['happy', 'neutral', 'sad', 'angry', 'anxious'] })
  @IsEnum(['happy', 'neutral', 'sad', 'angry', 'anxious'])
  mood: string;

  @ApiProperty({ description: 'Additional notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class MealTrackingDto {
  @ApiProperty({ description: 'Whether breakfast was eaten' })
  @IsBoolean()
  eaten: boolean;

  @ApiProperty({ description: 'Notes about the meal' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class SleepTrackingDto {
  @ApiProperty({ description: 'Sleep start time' })
  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: 'Sleep end time' })
  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @ApiProperty({ description: 'Sleep quality', enum: ['good', 'fair', 'poor'] })
  @IsEnum(['good', 'fair', 'poor'])
  quality: string;

  @ApiProperty({ description: 'Notes about sleep' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class DailyActivityDto {
  @ApiProperty({ description: 'Resident ID' })
  @IsNotEmpty()
  @IsString()
  residentId: string;

  @ApiProperty({ description: 'Date of activities' })
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'List of activities', type: [ActivityItemDto] })
  activities: ActivityItemDto[];

  @ApiProperty({ description: 'Meal tracking for the day' })
  meals: {
    breakfast: MealTrackingDto;
    lunch: MealTrackingDto;
    dinner: MealTrackingDto;
    snacks: { time: Date; notes: string; }[];
  };

  @ApiProperty({ description: 'Sleep tracking' })
  sleep: SleepTrackingDto;

  @ApiProperty({ description: 'Overall notes for the day' })
  @IsOptional()
  @IsString()
  dailyNotes?: string;

  @ApiProperty({ description: 'Whether the day record is completed' })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
} 