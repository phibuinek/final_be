import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseSeeder } from './database/seeder';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  
  const seeder = appContext.get(DatabaseSeeder);
  
  try {
    console.log('Starting the seeding process...');
    await seeder.seed();
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await appContext.close();
  }
}

bootstrap(); 