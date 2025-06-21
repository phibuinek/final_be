import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ResidentDocument = Resident & Document;

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
}

export const ResidentSchema = SchemaFactory.createForClass(Resident); 