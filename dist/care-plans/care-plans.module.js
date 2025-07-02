"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarePlansModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const care_plans_service_1 = require("./care-plans.service");
const care_plans_controller_1 = require("./care-plans.controller");
const care_plan_schema_1 = require("./schemas/care-plan.schema");
const care_plan_assignment_schema_1 = require("./schemas/care-plan-assignment.schema");
const rooms_module_1 = require("../rooms/rooms.module");
const beds_module_1 = require("../beds/beds.module");
const users_module_1 = require("../users/users.module");
const residents_module_1 = require("../residents/residents.module");
let CarePlansModule = class CarePlansModule {
};
exports.CarePlansModule = CarePlansModule;
exports.CarePlansModule = CarePlansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: care_plan_schema_1.CarePlan.name, schema: care_plan_schema_1.CarePlanSchema },
                { name: care_plan_assignment_schema_1.CarePlanAssignment.name, schema: care_plan_assignment_schema_1.CarePlanAssignmentSchema }
            ]),
            rooms_module_1.RoomsModule,
            beds_module_1.BedsModule,
            users_module_1.UsersModule,
            residents_module_1.ResidentsModule
        ],
        controllers: [care_plans_controller_1.CarePlansController],
        providers: [care_plans_service_1.CarePlansService],
        exports: [care_plans_service_1.CarePlansService],
    })
], CarePlansModule);
//# sourceMappingURL=care-plans.module.js.map