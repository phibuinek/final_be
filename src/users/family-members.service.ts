import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FamilyMember } from './schemas/family-member.schema';
import { User } from './schemas/user.schema';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class FamilyMembersService {
  constructor(
    @InjectModel(FamilyMember.name) private familyMemberModel: Model<FamilyMember>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createFamilyMemberDto: CreateFamilyMemberDto) {
    // Check if email already exists
    const existingUser = await this.userModel.findOne({ email: createFamilyMemberDto.email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Generate temporary password
    const temporaryPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    let user;
    try {
      // Create user account
      user = new this.userModel({
        email: createFamilyMemberDto.email,
        username: createFamilyMemberDto.email,
        password: hashedPassword,
        fullName: createFamilyMemberDto.fullName,
        roles: [Role.FamilyMember],
      });
      await user.save();
    } catch (error) {
        throw new InternalServerErrorException('Failed to create user account.', error.message);
    }
    

    // Create family member profile
    try {
      const familyMember = new this.familyMemberModel({
        user: user._id,
        fullName: createFamilyMemberDto.fullName,
        phoneNumber: createFamilyMemberDto.phoneNumber,
        relationship: createFamilyMemberDto.relationship,
        residents: createFamilyMemberDto.residentIds,
        notes: createFamilyMemberDto.notes,
        notificationPreferences: createFamilyMemberDto.notificationPreferences || {
          health: { email: true, push: false, sms: false },
          activity: { email: true, push: false, sms: false },
          medication: { email: true, push: false, sms: false },
          care_team: { email: true, push: false, sms: false }
        }
      });
      await familyMember.save();
      
      await this.sendLoginCredentials(createFamilyMemberDto.email, temporaryPassword);
  
      return familyMember.populate('user residents');

    } catch (error) {
        // Rollback user creation if family member creation fails
        await this.userModel.findByIdAndDelete(user._id);
        throw new InternalServerErrorException('Failed to create family member profile.', error.message);
    }
  }

  async findAll() {
    return this.familyMemberModel.find({ isActive: true }).populate('user residents');
  }

  async findOne(id: string) {
    const familyMember = await this.familyMemberModel.findById(id).populate('user residents');
    if (!familyMember || !familyMember.isActive) {
      throw new NotFoundException('Family member not found');
    }
    return familyMember;
  }

  async findByUser(userId: string) {
    const familyMember = await this.familyMemberModel.findOne({ user: userId }).populate('user residents');
    if (!familyMember || !familyMember.isActive) {
      throw new NotFoundException('Family member profile not found');
    }
    return familyMember;
  }

  async update(id: string, updateData: Partial<CreateFamilyMemberDto>) {
    const familyMember = await this.familyMemberModel.findById(id);
    if (!familyMember || !familyMember.isActive) {
      throw new NotFoundException('Family member not found');
    }

    // Update associated user if email or fullName is provided
    if (updateData.email || updateData.fullName) {
      const userUpdate: Partial<User> = {};
      if (updateData.email) {
        // Check if the new email is already taken by another user
        const existingUser = await this.userModel.findOne({ email: updateData.email, _id: { $ne: familyMember.user } });
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        }
        userUpdate.email = updateData.email;
      }
      if (updateData.fullName) {
        userUpdate.fullName = updateData.fullName;
      }
      await this.userModel.findByIdAndUpdate(familyMember.user, userUpdate);
    }

    // Update family member profile
    const { email, residentIds, ...profileData } = updateData;
    if(residentIds) {
      (profileData as any).residents = residentIds;
    }

    return this.familyMemberModel
      .findByIdAndUpdate(id, profileData, { new: true })
      .populate('user residents');
  }

  async deactivate(id: string) {
    const familyMember = await this.familyMemberModel.findById(id);
    if (!familyMember) {
      throw new NotFoundException('Family member not found');
    }

    // Deactivate user account
    await this.userModel.findByIdAndUpdate(familyMember.user, { isActive: false });

    // Deactivate family member profile
    await this.familyMemberModel.findByIdAndUpdate(id, { isActive: false });

    return { message: 'Family member deactivated successfully' };
  }

  async addResident(id: string, residentId: string) {
    // Ensure resident exists before adding
    // const resident = await this.residentModel.findById(residentId);
    // if (!resident) {
    //   throw new NotFoundException('Resident not found');
    // }

    const familyMember = await this.familyMemberModel.findById(id);
    if (!familyMember || !familyMember.isActive) {
      throw new NotFoundException('Family member not found');
    }

    if (!familyMember.residents.includes(residentId as any)) {
      familyMember.residents.push(residentId as any);
      await familyMember.save();
    }

    return familyMember.populate('user residents');
  }

  async removeResident(id: string, residentId: string) {
    const familyMember = await this.familyMemberModel.findById(id);
    if (!familyMember || !familyMember.isActive) {
      throw new NotFoundException('Family member not found');
    }

    familyMember.residents = familyMember.residents.filter(
      (id) => id.toString() !== residentId
    );
    await familyMember.save();

    return familyMember.populate('user residents');
  }

  async updateNotificationPreferences(id: string, preferences: UpdateNotificationPreferencesDto) {
    const familyMember = await this.familyMemberModel.findById(id);
    if (!familyMember || !familyMember.isActive) {
      throw new NotFoundException('Family member not found');
    }

    // Merge new preferences with existing ones
    const updatedPreferences = {
      ...familyMember.notificationPreferences,
      ...preferences
    };

    return this.familyMemberModel.findByIdAndUpdate(
      id,
      { notificationPreferences: updatedPreferences },
      { new: true }
    );
  }

  async completeSetup(id: string) {
    const familyMember = await this.familyMemberModel.findByIdAndUpdate(
        id, 
        { hasCompletedSetup: true }, 
        { new: true }
    );
    if (!familyMember) {
        throw new NotFoundException('Family member not found');
    }
    return familyMember;
  }

  async resendCredentials(id: string) {
    const familyMember = await this.findOne(id); // findOne also handles not found and populates user
    if (!familyMember.user) {
        throw new InternalServerErrorException('Family member is not associated with a user account.');
    }

    const temporaryPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
    
    const user = familyMember.user as User;
    await this.userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    await this.sendLoginCredentials(user.email, temporaryPassword);

    return { message: 'New credentials have been sent successfully.' };
  }

  private async sendLoginCredentials(email: string, password: string) {
    // In a real application, use a mail service (e.g., Nodemailer, SendGrid)
    console.log(`Sending credentials to ${email}. Password: ${password}`);
    // This should be an async operation that sends an email.
    // e.g., await this.mailService.sendUserCredentials(email, password);
  }
} 