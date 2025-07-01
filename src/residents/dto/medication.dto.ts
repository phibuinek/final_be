import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class MedicationDto {
  @ApiProperty({ description: 'Name of the medication' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dosage of the medication' })
  @IsNotEmpty()
  @IsString()
  dosage: string;

  @ApiProperty({ description: 'Frequency of administration' })
  @IsNotEmpty()
  @IsString()
  frequency: string;

  @ApiProperty({ description: 'Start date of medication' })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'End date of medication (optional)' })
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Special instructions for administration' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ description: 'ID of the resident' })
  @IsNotEmpty()
  @IsString()
  residentId: string;
} 