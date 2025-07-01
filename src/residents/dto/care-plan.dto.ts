import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CarePlanDto {
  @ApiProperty({ description: 'Resident ID' })
  @IsNotEmpty()
  @IsString()
  residentId: string;

  @ApiProperty({ description: 'Care plan title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Care plan description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Care goals' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  goals?: string[];

  @ApiProperty({ description: 'Care interventions' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interventions?: string[];

  @ApiProperty({ description: 'Care actions' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  actions?: string[];

  @ApiProperty({ description: 'Start date of care plan' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ description: 'End date of care plan' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({ description: 'Staff responsible for care plan' })
  @IsOptional()
  @IsString()
  responsibleStaff?: string;
} 