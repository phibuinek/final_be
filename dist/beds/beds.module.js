"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const beds_service_1 = require("./beds.service");
const beds_controller_1 = require("./beds.controller");
const bed_schema_1 = require("./schemas/bed.schema");
let BedsModule = class BedsModule {
};
exports.BedsModule = BedsModule;
exports.BedsModule = BedsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: bed_schema_1.Bed.name, schema: bed_schema_1.BedSchema }])],
        controllers: [beds_controller_1.BedsController],
        providers: [beds_service_1.BedsService],
        exports: [beds_service_1.BedsService],
    })
], BedsModule);
//# sourceMappingURL=beds.module.js.map