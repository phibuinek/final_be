import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum BedStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
}

@Schema({ timestamps: true })
export class Bed extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true })
  room: string;

  @Prop({
    type: String,
    enum: Object.values(BedStatus),
    default: BedStatus.AVAILABLE,
  })
  status: BedStatus;

  @Prop({ type: String, trim: true })
  notes?: string;
}

export const BedSchema = SchemaFactory.createForClass(Bed); 