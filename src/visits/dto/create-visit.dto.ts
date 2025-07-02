import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, Min, Max, Matches } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({ description: 'ID of the resident to visit' })
  @IsNotEmpty()
  @IsString()
  resident: string;

  @ApiProperty({ description: 'Date of the visit', example: '2025-07-01' })
  @IsNotEmpty()
  @IsDateString()
  scheduledDate: string;

  @ApiProperty({ description: 'Time of the visit in HH:MM format', example: '14:30' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'scheduledTime must be in HH:MM format (e.g., 14:30)',
  })
  scheduledTime: string;

  @ApiProperty({ description: 'Duration of visit in minutes', default: 60, minimum: 15, maximum: 240 })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(240)
  duration?: number;

  @ApiProperty({ description: 'Purpose of the visit', required: false })
  @IsOptional()
  @IsString()
  purpose?: string;

  @ApiProperty({ description: 'Additional notes for the visit', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
} 