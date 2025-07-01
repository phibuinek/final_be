"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const seeder_1 = require("./database/seeder");
async function bootstrap() {
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seeder = appContext.get(seeder_1.DatabaseSeeder);
    try {
        console.log('Starting the seeding process...');
        await seeder.seed();
        console.log('Seeding completed successfully.');
    }
    catch (error) {
        console.error('Seeding failed:', error);
    }
    finally {
        await appContext.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map