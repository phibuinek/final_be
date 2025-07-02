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

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ type: String, enum: ['admin', 'staff', 'family'], required: true })
  role: string;

  // Admin specific fields
  @Prop({ type: Boolean, default: false })
  is_super_admin?: boolean;

  // Staff specific fields  
  @Prop({ type: String })
  position?: string; // "Điều dưỡng", "Bác sĩ", "Nhân viên chăm sóc"

  @Prop({ type: String })
  qualification?: string; // "Cử nhân Điều dưỡng", "Thạc sĩ Y khoa"

  @Prop({ type: Date })
  join_date?: Date;

  // Family specific fields
  @Prop({ type: String })
  relationship?: string; // "con gái", "con trai", "vợ/chồng"

  @Prop({ type: [{ type: String }], default: [] })
  residents?: string[]; // Array of resident IDs

  @Prop({ type: String })
  address?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String })
  notes?: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 