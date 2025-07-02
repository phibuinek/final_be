"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bed_schema_1 = require("./schemas/bed.schema");
let BedsService = class BedsService {
    bedModel;
    constructor(bedModel) {
        this.bedModel = bedModel;
    }
    async create(createBedDto) {
        const createdBed = new this.bedModel(createBedDto);
        return createdBed.save();
    }
    async findAll() {
        return this.bedModel.find().exec();
    }
    async findOne(id) {
        const bed = await this.bedModel.findById(id).exec();
        if (!bed) {
            throw new common_1.NotFoundException(`Bed with ID "${id}" not found`);
        }
        return bed;
    }
    async update(id, updateBedDto) {
        const existingBed = await this.bedModel
            .findByIdAndUpdate(id, updateBedDto, { new: true })
            .exec();
        if (!existingBed) {
            throw new common_1.NotFoundException(`Bed with ID "${id}" not found`);
        }
        return existingBed;
    }
    async remove(id) {
        const result = await this.bedModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Bed with ID "${id}" not found`);
        }
        return { deleted: true };
    }
    async updateStatus(id, status) {
        return this.update(id, { status });
    }
    async findAvailableBedInRoom(roomId) {
        return this.bedModel.findOne({
            room: roomId,
            status: bed_schema_1.BedStatus.AVAILABLE
        }).exec();
    }
    async findByRoom(roomId) {
        return this.bedModel.find({ room: roomId }).exec();
    }
    async findAvailableBeds() {
        return this.bedModel.find({ status: bed_schema_1.BedStatus.AVAILABLE }).exec();
    }
};
exports.BedsService = BedsService;
exports.BedsService = BedsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bed_schema_1.Bed.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BedsService);
//# sourceMappingURL=beds.service.js.map