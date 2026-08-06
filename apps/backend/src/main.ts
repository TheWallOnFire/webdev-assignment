import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend integration
  app.enableCors();
  
  // Setup OpenAPI (Swagger)
  const config = new DocumentBuilder()
    .setTitle('G-Scores API')
    .setDescription('API documentation for the G-Scores application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger docs are available at: ${await app.getUrl()}/api/docs`);
}
bootstrap();
