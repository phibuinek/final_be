import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class VitalSignDto {
  @ApiProperty({ description: 'Resident ID' })
  @IsNotEmpty()
  @IsString()
  residentId: string;

  @ApiProperty({ description: 'Temperature in Celsius' })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiProperty({ description: 'Blood pressure (systolic/diastolic)' })
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @ApiProperty({ description: 'Heart rate (beats per minute)' })
  @IsOptional()
  @IsNumber()
  heartRate?: number;

  @ApiProperty({ description: 'Respiratory rate (breaths per minute)' })
  @IsOptional()
  @IsNumber()
  respiratoryRate?: number;

  @ApiProperty({ description: 'Oxygen saturation (%)' })
  @IsOptional()
  @IsNumber()
  oxygenSaturation?: number;

  @ApiProperty({ description: 'Notes about vital signs' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Date and time of vital sign recording' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  recordedAt?: Date;
} 