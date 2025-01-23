import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 5000;

  // Set a global prefix for all routes
  app.setGlobalPrefix('api'); // Adds 'api/' to all routes

  // Enable CORS
  app.enableCors({
    origin: [
      "https://landing-page-frontend-lilac.vercel.app", // Deployed frontend
      "http://localhost:3000", // Local development frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies if necessary
  });

  // Serve static files from the 'uploads' directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Files will be accessible via '/uploads/' path
  });

  // Start the application
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
