import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CareTeamDocument = CareTeam & Document;

@Schema({ timestamps: true })
export class CareTeam {
  @Prop({ required: true, ref: 'User' })
  @ApiProperty({ description: 'Primary doctor ID' })
  primaryDoctor: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  @ApiProperty({ description: 'List of nurse IDs' })
  nurses: MongooseSchema.Types.ObjectId[];

  @Prop({ required: true, ref: 'Resident' })
  @ApiProperty({ description: 'Resident ID' })
  resident: MongooseSchema.Types.ObjectId;

  @Prop([{
    userId: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['doctor', 'nurse'], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  }])
  @ApiProperty({ description: 'Care team schedule' })
  schedule: Record<string, any>[];

  @Prop({ type: String })
  @ApiProperty({ description: 'Additional notes about care team' })
  notes: string;
}

export const CareTeamSchema = SchemaFactory.createForClass(CareTeam); 