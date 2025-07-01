import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.schema';

export type FamilyMemberDocument = FamilyMember & Document;

@Schema({ _id: false })
export class NotificationSetting {
  @Prop({ type: Boolean, default: true })
  email: boolean;

  @Prop({ type: Boolean, default: false })
  push: boolean;

  @Prop({ type: Boolean, default: false })
  sms: boolean;
}

const NotificationSettingSchema = SchemaFactory.createForClass(NotificationSetting);

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    },
  },
})
export class FamilyMember extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ description: 'User account associated with family member' })
  user: User;

  @Prop({ required: true })
  @ApiProperty({ description: 'Full name of the family member' })
  fullName: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'Phone number of the family member' })
  phoneNumber: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'Relationship with the resident (son, daughter, spouse, etc.)' })
  relationship: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Resident' }] })
  @ApiProperty({ description: 'List of related residents' })
  residents: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  @ApiProperty({ description: 'Whether the family member is active' })
  isActive: boolean;

  @Prop({
    type: {
      health: NotificationSettingSchema,
      activity: NotificationSettingSchema,
      medication: NotificationSettingSchema,
      care_team: NotificationSettingSchema
    },
    _id: false,
    default: () => ({
      health: {},
      activity: {},
      medication: {},
      care_team: {}
    })
  })
  @ApiProperty({ description: 'Notification preferences' })
  notificationPreferences: {
    health: NotificationSetting;
    activity: NotificationSetting;
    medication: NotificationSetting;
    care_team: NotificationSetting;
  };

  @Prop({ type: Date })
  @ApiProperty({ description: 'Last login date' })
  lastLogin: Date;

  @Prop({ type: Boolean, default: false })
  @ApiProperty({ description: 'Whether the family member has completed initial setup' })
  hasCompletedSetup: boolean;

  @Prop({ type: String })
  @ApiProperty({ description: 'Additional notes' })
  notes: string;
}

export const FamilyMemberSchema = SchemaFactory.createForClass(FamilyMember); 