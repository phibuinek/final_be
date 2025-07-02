import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class CarePlan extends Document {
  @Prop({ required: true })
  @ApiProperty({ description: 'Tên gói dịch vụ chăm sóc' })
  plan_name: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'Mô tả chi tiết về gói dịch vụ' })
  description: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'Giá tháng (VND)' })
  monthly_price: number;

  @Prop({ 
    required: true, 
    enum: [
      'cham_soc_tieu_chuan',
      'cham_soc_tich_cuc', 
      'cham_soc_dac_biet',
      'cham_soc_sa_sut_tri_tue',
      'ho_tro_dinh_duong',
      'cham_soc_vet_thuong',
      'vat_ly_tri_lieu',
      'cham_soc_tieu_duong',
      'phuc_hoi_chuc_nang',
      'cham_soc_giam_nhe',
      'cham_soc_hau_phau_thuat',
      'tri_lieu_nghe_nghiep'
    ]
  })
  @ApiProperty({ description: 'Loại gói chăm sóc' })
  plan_type: string;

  @Prop({ 
    required: true, 
    enum: ['main', 'supplementary'],
    default: 'main'
  })
  @ApiProperty({ description: 'Danh mục: chính hoặc phụ' })
  category: string;

  @Prop({ type: [String], required: true })
  @ApiProperty({ description: 'Danh sách dịch vụ bao gồm' })
  services_included: string[];

  @Prop({ required: true })
  @ApiProperty({ description: 'Tỷ lệ nhân viên:bệnh nhân' })
  staff_ratio: string;

  @Prop({ 
    required: true, 
    enum: ['monthly', 'weekly', 'daily'],
    default: 'monthly'
  })
  @ApiProperty({ description: 'Loại thời gian tính phí' })
  duration_type: string;

  @Prop({ type: [String], default: [] })
  @ApiProperty({ description: 'Thuốc mặc định trong gói' })
  default_medications: string[];

  @Prop({ type: [String], default: [] })
  @ApiProperty({ description: 'Điều kiện tiên quyết' })
  prerequisites: string[];

  @Prop({ type: [String], default: [] })
  @ApiProperty({ description: 'Chống chỉ định' })
  contraindications: string[];

  @Prop({ type: Boolean, default: true })
  @ApiProperty({ description: 'Gói có đang hoạt động không' })
  is_active: boolean;
}

export const CarePlanSchema = SchemaFactory.createForClass(CarePlan); 