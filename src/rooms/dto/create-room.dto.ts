import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { RoomType, RoomStatus } from '../schemas/room.schema';

export class CreateRoomDto {
  @ApiProperty({ description: 'The name/number of the room', example: '101' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The floor number where the room is located', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  floor: number;

  @ApiProperty({
    description: 'The type of room',
    enum: RoomType,
    example: RoomType.DOUBLE,
  })
  @IsNotEmpty()
  @IsEnum(RoomType)
  type: RoomType;

  @ApiProperty({ description: 'Maximum number of beds in the room', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Current status of the room',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
    required: false,
  })
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @ApiProperty({ description: 'Description of the room', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Additional notes about the room', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
} 