import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VisitStatus } from '../schemas/visit.schema';

export class VisitApprovalDto {
  @ApiProperty({ 
    description: 'New status for the visit', 
    enum: [VisitStatus.APPROVED, VisitStatus.REJECTED] 
  })
  @IsEnum([VisitStatus.APPROVED, VisitStatus.REJECTED])
  status: VisitStatus.APPROVED | VisitStatus.REJECTED;

  @ApiProperty({ description: 'Staff notes regarding the approval/rejection', required: false })
  @IsOptional()
  @IsString()
  staffNotes?: string;
} 