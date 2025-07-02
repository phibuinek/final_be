"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const residents_module_1 = require("./residents/residents.module");
const beds_module_1 = require("./beds/beds.module");
const rooms_module_1 = require("./rooms/rooms.module");
const visits_module_1 = require("./visits/visits.module");
const care_plans_module_1 = require("./care-plans/care-plans.module");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async () => {
                    const mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
                    const uri = mongod.getUri();
                    return {
                        uri: uri,
                    };
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            residents_module_1.ResidentsModule,
            beds_module_1.BedsModule,
            rooms_module_1.RoomsModule,
            visits_module_1.VisitsModule,
            care_plans_module_1.CarePlansModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map