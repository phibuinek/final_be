import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

@ApiTags('beds')
@Controller('beds')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new bed (Admin only)' })
  @ApiResponse({ status: 201, description: 'The bed has been successfully created.' })
  create(@Body() createBedDto: CreateBedDto) {
    return this.bedsService.create(createBedDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get all beds (Admin/Staff only)' })
  findAll() {
    return this.bedsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Staff)
  @ApiOperation({ summary: 'Get a single bed by ID (Admin/Staff only)' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bedsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a bed (Admin only)' })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateBedDto: UpdateBedDto) {
    return this.bedsService.update(id, updateBedDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a bed (Admin only)' })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bedsService.remove(id);
  }
} 