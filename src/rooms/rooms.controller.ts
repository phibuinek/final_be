import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { RoomStatus } from './schemas/room.schema';

@ApiTags('rooms')
@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new room (Admin only)' })
  @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get all rooms (Admin/Staff only)' })
  @ApiQuery({ name: 'floor', required: false, type: Number, description: 'Filter by floor number' })
  @ApiQuery({ name: 'status', required: false, enum: RoomStatus, description: 'Filter by room status' })
  findAll(@Query('floor') floor?: number, @Query('status') status?: RoomStatus) {
    if (floor) {
      return this.roomsService.findByFloor(floor);
    }
    if (status) {
      return this.roomsService.findByStatus(status);
    }
    return this.roomsService.findAll();
  }

  @Get('statistics')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get room statistics (Admin/Staff only)' })
  @ApiResponse({ status: 200, description: 'Room statistics retrieved successfully.' })
  getStatistics() {
    return this.roomsService.getRoomStatistics();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get a single room by ID (Admin/Staff only)' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a room (Admin only)' })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Patch(':id/status')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Update room status (Admin/Staff only)' })
  updateStatus(@Param('id', ParseObjectIdPipe) id: string, @Body() statusDto: { status: RoomStatus }) {
    return this.roomsService.updateStatus(id, statusDto.status);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a room (Admin only)' })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.roomsService.remove(id);
  }
} 