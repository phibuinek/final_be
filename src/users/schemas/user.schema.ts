import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

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
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ type: [String], enum: Role, default: [Role.FamilyMember] })
  roles: Role[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 