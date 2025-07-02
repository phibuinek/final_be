import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class VitalSign extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Resident', required: true })
  @ApiProperty({ description: 'ID của cư dân' })
  resident_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ description: 'Nhân viên ghi lại thông tin' })
  recorded_by: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ description: 'Thời gian đo' })
  date_time: Date;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Nhiệt độ cơ thể (°C)' })
  temperature?: number;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Nhịp tim (bpm)' })
  heart_rate?: number;

  @Prop({ type: String })
  @ApiProperty({ description: 'Huyết áp (mmHg) - ví dụ: "120/80"' })
  blood_pressure?: string;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Nhịp thở (lần/phút)' })
  respiratory_rate?: number;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Nồng độ oxy trong máu (%)' })
  oxygen_level?: number;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Cân nặng (kg)' })
  weight?: number;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Chiều cao (cm)' })
  height?: number;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Chỉ số BMI' })
  bmi?: number;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Đường huyết (mg/dL)' })
  blood_sugar?: number;

  @Prop({ type: String })
  @ApiProperty({ description: 'Ghi chú thêm' })
  notes?: string;

  @Prop({ 
    type: String, 
    enum: ['normal', 'abnormal', 'critical'],
    default: 'normal'
  })
  @ApiProperty({ description: 'Đánh giá tổng quan' })
  overall_status?: string;
}

export const VitalSignSchema = SchemaFactory.createForClass(VitalSign); 