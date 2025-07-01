import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { IsVietnameseName, IsVietnamesePhoneNumber, IsValidRelationship, IsValidNote, IsArrayOfMongoIds } from '../../common/validators/custom.validator';

export class CreateFamilyMemberDto {
  @ApiProperty({ 
    description: 'Họ và tên đầy đủ của thành viên gia đình',
    example: 'Nguyễn Văn A'
  })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsVietnameseName()
  fullName: string;

  @ApiProperty({ 
    description: 'Địa chỉ email dùng để đăng nhập',
    example: 'nguyenvana@example.com'
  })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ 
    description: 'Số điện thoại',
    example: '0912345678'
  })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsVietnamesePhoneNumber()
  phoneNumber: string;

  @ApiProperty({ 
    description: 'Mối quan hệ với người cư trú',
    example: 'con_trai',
    enum: ['con', 'con_trai', 'con_gai', 'vo', 'chong', 'cha', 'me', 'anh', 'chi', 'em', 'chau', 'khac']
  })
  @IsNotEmpty({ message: 'Mối quan hệ không được để trống' })
  @IsValidRelationship()
  relationship: string;

  @ApiProperty({ 
    description: 'Danh sách ID của người cư trú được liên kết',
    type: [String],
    example: ['507f1f77bcf86cd799439011']
  })
  @IsOptional()
  @IsArray({ message: 'residentIds phải là một mảng' })
  @IsArrayOfMongoIds()
  residentIds?: string[];

  @ApiProperty({ 
    description: 'Ghi chú bổ sung',
    example: 'Thường xuyên đến thăm vào cuối tuần'
  })
  @IsOptional()
  @IsValidNote()
  notes?: string;

  @ApiProperty({ 
    description: 'Cài đặt thông báo',
    example: {
      health: { email: true, push: true, sms: false },
      activity: { email: true, push: true, sms: false }
    }
  })
  @IsOptional()
  notificationPreferences?: {
    health?: { email: boolean; push: boolean; sms: boolean; };
    activity?: { email: boolean; push: boolean; sms: boolean; };
    medication?: { email: boolean; push: boolean; sms: boolean; };
    care_team?: { email: boolean; push: boolean; sms: boolean; };
  };
} 