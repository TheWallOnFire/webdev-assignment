import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables at the very beginning of the application
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('G-Scores', { colors: true }),
          ),
        }),
      ],
    }),
  });

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 1. Tự động thêm tiền tố 'api' cho TOÀN BỘ hệ thống
  app.setGlobalPrefix('api');

  // 2. Kích hoạt tính năng Versioning mạnh mẽ của NestJS
  app.enableVersioning({
    type: VersioningType.URI, // Khai báo dùng URI (ví dụ: /v1/)
    defaultVersion: '1',      // Mặc định mọi API đều là v1 nếu không khai báo
  });

  const config = new DocumentBuilder()
    .setTitle('G-Scores API')
    .setDescription('API documentation for the G-Scores application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger docs are available at: ${await app.getUrl()}/api/docs`);
}
bootstrap();
