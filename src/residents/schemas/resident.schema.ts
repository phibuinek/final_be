import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ResidentDocument = Resident & Document;

@Schema({ _id: false })
class CarePlan {
  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  actions: string[];
}

@Schema({ timestamps: true })
export class Resident {
  @Prop({ required: true, trim: true })
  @ApiProperty({ description: 'Full name of the resident' })
  fullName: string;

  @Prop()
  @ApiProperty({ description: 'Date of birth of the resident' })
  dateOfBirth: Date;

  @Prop({ enum: ['male', 'female', 'other'] })
  @ApiProperty({ description: 'Gender of the resident', enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ unique: true, sparse: true })
  @ApiProperty({ description: 'Contact information of the resident (must be unique)' })
  contactInfo: string;

  @Prop()
  @ApiProperty({ description: 'Medical history of the resident' })
  medicalHistory: string;

  @Prop()
  @ApiProperty({ description: 'Allergies of the resident' })
  allergies: string;

  @Prop()
  @ApiProperty({ description: 'Emergency contact information' })
  emergencyContact: string;

  @Prop({ default: true })
  @ApiProperty({ description: 'Whether the resident is active' })
  isActive: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bed' })
  @ApiProperty({ description: 'The bed occupied by the resident' })
  bed: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'FamilyMember' }] })
  @ApiProperty({ description: 'Family members related to the resident' })
  familyMembers: MongooseSchema.Types.ObjectId[];

  @Prop([{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    instructions: String,
    isActive: { type: Boolean, default: true }
  }])
  @ApiProperty({ description: 'Medications prescribed to the resident' })
  medications: Record<string, any>[];

  @Prop({ type: [CarePlan] })
  @ApiProperty({ description: 'Care plans for the resident' })
  carePlans: CarePlan[];
}

export const ResidentSchema = SchemaFactory.createForClass(Resident); 