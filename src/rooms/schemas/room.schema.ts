import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  QUAD = 'quad',
}

export enum RoomStatus {
  AVAILABLE = 'available',
  FULL = 'full',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
}

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true })
  floor: number;

  @Prop({
    type: String,
    enum: Object.values(RoomType),
    required: true,
  })
  type: RoomType;

  @Prop({ required: true, min: 1 })
  capacity: number;

  @Prop({
    type: String,
    enum: Object.values(RoomStatus),
    default: RoomStatus.AVAILABLE,
  })
  status: RoomStatus;

  @Prop({ type: String, trim: true })
  description?: string;

  @Prop({ type: String, trim: true })
  notes?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room); 