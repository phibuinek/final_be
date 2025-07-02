import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
class MedicationRecord {
  @Prop({ required: true })
  medication_name: string;

  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  frequency: string;
}

@Schema({ _id: false })
class EmergencyContact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  relationship: string;
}

@Schema({ timestamps: true })
export class Resident extends Document {
  @Prop({ required: true, trim: true })
  @ApiProperty({ description: 'Họ và tên đầy đủ của cư dân' })
  full_name: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'Ngày sinh' })
  date_of_birth: Date;

  @Prop({ enum: ['male', 'female'], required: true })
  @ApiProperty({ description: 'Giới tính', enum: ['male', 'female'] })
  gender: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'Ngày nhập viện' })
  admission_date: Date;

  @Prop()
  @ApiProperty({ description: 'Ngày xuất viện (nếu có)' })
  discharge_date?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ description: 'ID thành viên gia đình phụ trách' })
  family_member_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  @ApiProperty({ description: 'Tiền sử bệnh án' })
  medical_history: string;

  @Prop({ type: [MedicationRecord], default: [] })
  @ApiProperty({ description: 'Thuốc hiện tại đang sử dụng' })
  current_medications: MedicationRecord[];

  @Prop({ type: [String], default: [] })
  @ApiProperty({ description: 'Danh sách dị ứng' })
  allergies: string[];

  @Prop({ type: EmergencyContact, required: true })
  @ApiProperty({ description: 'Thông tin liên hệ khẩn cấp' })
  emergency_contact: EmergencyContact;

  @Prop({ 
    type: String, 
    enum: ['basic', 'intermediate', 'intensive'],
    default: 'basic'
  })
  @ApiProperty({ description: 'Mức độ chăm sóc cần thiết' })
  care_level: string;

  @Prop({ 
    type: String, 
    enum: ['active', 'discharged', 'deceased'],
    default: 'active'
  })
  @ApiProperty({ description: 'Trạng thái hiện tại của cư dân' })
  status: string;
}

export const ResidentSchema = SchemaFactory.createForClass(Resident); 