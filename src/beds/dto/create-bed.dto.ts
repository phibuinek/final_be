import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { BedStatus } from '../schemas/bed.schema';

export class CreateBedDto {
  @ApiProperty({ description: 'The name of the bed (e.g., "101-A")', example: '101-A' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The room where the bed is located', example: '101' })
  @IsNotEmpty()
  @IsString()
  room: string;

  @ApiProperty({
    description: 'The current status of the bed',
    enum: BedStatus,
    default: BedStatus.AVAILABLE,
    required: false,
  })
  @IsOptional()
  @IsEnum(BedStatus)
  status?: BedStatus;

  @ApiProperty({ description: 'Optional notes about the bed', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
} 