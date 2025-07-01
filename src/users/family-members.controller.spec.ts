import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMembersController } from './family-members.controller';
import { FamilyMembersService } from './family-members.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

describe('FamilyMembersController', () => {
  let controller: FamilyMembersController;
  let service: FamilyMembersService;

  const mockFamilyMembersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'test-secret',
          signOptions: { expiresIn: '1d' },
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/test'),
      ],
      controllers: [FamilyMembersController],
      providers: [
        {
          provide: FamilyMembersService,
          useValue: mockFamilyMembersService,
        },
      ],
    }).compile();

    controller = module.get<FamilyMembersController>(FamilyMembersController);
    service = module.get<FamilyMembersService>(FamilyMembersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new family member successfully', async () => {
      const createDto: CreateFamilyMemberDto = {
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phoneNumber: '0912345678',
        relationship: 'con_trai',
        residentIds: ['507f1f77bcf86cd799439011'],
        notes: 'Thường xuyên đến thăm vào cuối tuần',
        notificationPreferences: {
          health: { email: true, push: true, sms: false },
          activity: { email: true, push: true, sms: false }
        }
      };

      const expectedResult = {
        _id: '507f1f77bcf86cd799439012',
        ...createDto,
      };

      mockFamilyMembersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);
      expect(result).toEqual(expectedResult);
      expect(mockFamilyMembersService.create).toHaveBeenCalledWith(createDto);
    });

    it('should throw error for invalid Vietnamese name', async () => {
      const invalidDto: CreateFamilyMemberDto = {
        fullName: '123', // Invalid name
        email: 'nguyenvana@example.com',
        phoneNumber: '0912345678',
        relationship: 'con_trai',
      };

      await expect(controller.create(invalidDto)).rejects.toThrow();
    });

    it('should throw error for invalid phone number', async () => {
      const invalidDto: CreateFamilyMemberDto = {
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phoneNumber: '123', // Invalid phone number
        relationship: 'con_trai',
      };

      await expect(controller.create(invalidDto)).rejects.toThrow();
    });

    it('should throw error for invalid relationship', async () => {
      const invalidDto: CreateFamilyMemberDto = {
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phoneNumber: '0912345678',
        relationship: 'invalid_relationship', // Invalid relationship
      };

      await expect(controller.create(invalidDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of family members', async () => {
      const expectedResult = [
        {
          _id: '507f1f77bcf86cd799439012',
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phoneNumber: '0912345678',
          relationship: 'con_trai',
        },
      ];

      mockFamilyMembersService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
      expect(mockFamilyMembersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single family member', async () => {
      const id = '507f1f77bcf86cd799439012';
      const expectedResult = {
        _id: id,
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phoneNumber: '0912345678',
        relationship: 'con_trai',
      };

      mockFamilyMembersService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(mockFamilyMembersService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw error for invalid id', async () => {
      const invalidId = 'invalid-id';
      mockFamilyMembersService.findOne.mockRejectedValue(new Error('Invalid ID'));

      await expect(controller.findOne(invalidId)).rejects.toThrow('Invalid ID');
    });
  });
}); 