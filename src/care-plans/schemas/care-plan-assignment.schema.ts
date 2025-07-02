import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
class FamilyPreferences {
  @Prop({ type: String, enum: ['male', 'female'] })
  preferred_room_gender: string;

  @Prop({ type: Number })
  preferred_floor: number;

  @Prop({ type: String })
  special_requests: string;
}

@Schema({ _id: false })
class MedicationRecord {
  @Prop({ required: true })
  medication_name: string;

  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  frequency: string;
}

@Schema({ timestamps: true })
export class CarePlanAssignment extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ description: 'Staff phụ trách đăng ký' })
  staff_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CarePlan' }], required: true })
  @ApiProperty({ description: 'Danh sách gói dịch vụ đã chọn' })
  care_plan_ids: MongooseSchema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Resident', required: true })
  @ApiProperty({ description: 'Resident được đăng ký' })
  resident_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ description: 'Thành viên gia đình đăng ký' })
  family_member_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ description: 'Ngày đăng ký dịch vụ' })
  registration_date: Date;

  @Prop({ type: String })
  @ApiProperty({ description: 'Ghi chú tư vấn' })
  consultation_notes: string;

  @Prop({ 
    type: String, 
    enum: ['2_bed', '3_bed', '4_5_bed', '6_8_bed'],
    required: true
  })
  @ApiProperty({ description: 'Loại phòng đã chọn' })
  selected_room_type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room' })
  @ApiProperty({ description: 'Phòng được phân bổ' })
  assigned_room_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bed' })
  @ApiProperty({ description: 'Giường được phân bổ' })
  assigned_bed_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: FamilyPreferences })
  @ApiProperty({ description: 'Sở thích của gia đình' })
  family_preferences: FamilyPreferences;

  @Prop({ required: true })
  @ApiProperty({ description: 'Tổng chi phí hàng tháng (VND)' })
  total_monthly_cost: number;

  @Prop({ required: true })
  @ApiProperty({ description: 'Chi phí phòng hàng tháng (VND)' })
  room_monthly_cost: number;

  @Prop({ required: true })
  @ApiProperty({ description: 'Chi phí các gói dịch vụ hàng tháng (VND)' })
  care_plans_monthly_cost: number;

  @Prop({ required: true })
  @ApiProperty({ description: 'Ngày bắt đầu dịch vụ' })
  start_date: Date;

  @Prop()
  @ApiProperty({ description: 'Ngày kết thúc dịch vụ' })
  end_date: Date;

  @Prop({ type: [MedicationRecord], default: [] })
  @ApiProperty({ description: 'Thuốc bổ sung' })
  additional_medications: MedicationRecord[];

  @Prop({ 
    type: String, 
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  })
  @ApiProperty({ description: 'Trạng thái đăng ký' })
  status: string;

  @Prop({ 
    type: String, 
    enum: ['pending', 'partially_paid', 'fully_paid', 'overdue'],
    default: 'pending'
  })
  @ApiProperty({ description: 'Trạng thái thanh toán' })
  payment_status: string;

  @Prop({ type: String })
  @ApiProperty({ description: 'Ghi chú thêm' })
  notes: string;
}

export const CarePlanAssignmentSchema = SchemaFactory.createForClass(CarePlanAssignment); 