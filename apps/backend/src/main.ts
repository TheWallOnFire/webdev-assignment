import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpErrorFilter } from './common/filters/http-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function createNestServer(expressInstance: express.Express) {
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('G-Scores', { colors: true }),
      ),
    }),
  ];

  if (!process.env.VERCEL) {
    transports.push(
      new winston.transports.File({
        filename: path.join(process.cwd(), 'logs', 'error.log'),
        level: 'error',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      }),
      new winston.transports.File({
        filename: path.join(process.cwd(), 'logs', 'combined.log'),
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      }),
    );
  }

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      logger: WinstonModule.createLogger({
        transports,
      }),
    }
  );

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const frontendUrls = configService.get<string>('FRONTEND_URL', 'http://localhost:5173');
  const allowedOrigins = frontendUrls.split(',').map(url => url.trim());

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https:`, `'unsafe-inline'`],
      },
    },
  }));

  app.enableCors({
    origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
    credentials: true,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('G-Scores API')
      .setDescription('API documentation for the G-Scores application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());

  await app.init();
  return app;
}

// Vercel Serverless Export
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    await createNestServer(server);
    cachedServer = server;
  }
  return cachedServer(req, res);
};

// Fallback for local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  createNestServer(server).then((app) => {
    const configService = app.get(ConfigService);
    const port = parseInt(configService.get<string>('PORT', '3000'), 10);
    app.listen(port, () => {
      console.log(`Application is running on port ${port}`);
    });
  });
}
