import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async seed() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    // Check if admin user already exists
    const adminExists = await this.userModel.findOne({ roles: Role.Admin });
    if (adminExists) {
      console.log('Admin user already exists, skipping seeding.');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await this.userModel.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'System Administrator',
      roles: [Role.Admin],
      phoneNumber: '1234567890',
      address: 'System Address',
    });

    console.log('Admin user created successfully:', adminUser.email);
  }
} 