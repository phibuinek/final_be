import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate, IsBoolean, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResidentDto {
  @ApiProperty({ description: 'Full name of the resident' })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  fullName: string;

  @ApiProperty({ description: 'Date of birth of the resident', required: false })
  @IsOptional()
  @IsDate({ message: 'Date of birth must be a valid date' })
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Gender of the resident', required: false, enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  gender?: string;

  @ApiProperty({ description: 'Contact information of the resident (must be unique)', required: false })
  @IsOptional()
  @IsString({ message: 'Contact info must be a string' })
  contactInfo?: string;

  @ApiProperty({ description: 'Medical history of the resident', required: false })
  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @ApiProperty({ description: 'Allergies of the resident', required: false })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiProperty({ description: 'Emergency contact information', required: false })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiProperty({ description: 'Whether the resident is active', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'The bed occupied by the resident', required: false })
  @IsOptional()
  @IsMongoId()
  bed?: string;

  @ApiProperty({ description: 'Family members related to the resident', required: false, type: [String] })
  @IsOptional()
  @IsMongoId({ each: true })
  familyMembers?: string[];
} 