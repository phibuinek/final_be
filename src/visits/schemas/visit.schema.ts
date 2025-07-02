import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum VisitStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Visit extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Resident', required: true })
  resident: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'FamilyMember', required: true })
  familyMember: Types.ObjectId;

  @Prop({ required: true })
  scheduledDate: Date;

  @Prop({ required: true })
  scheduledTime: string; // Format: "HH:MM"

  @Prop({ default: 60 }) // Duration in minutes
  duration: number;

  @Prop({
    type: String,
    enum: Object.values(VisitStatus),
    default: VisitStatus.PENDING,
  })
  status: VisitStatus;

  @Prop({ type: String, trim: true })
  purpose?: string;

  @Prop({ type: String, trim: true })
  notes?: string;

  @Prop({ type: String, trim: true })
  staffNotes?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @Prop()
  approvedAt?: Date;

  @Prop()
  actualStartTime?: Date;

  @Prop()
  actualEndTime?: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit); 