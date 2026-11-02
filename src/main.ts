
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>('PORT');

  // Swagger / OpenAPI configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Syllens API')
    .setDescription(
      'Student-focused Agentic RAG learning platform with evidence-backed answers.',
    )
    .setVersion('1.0.0')
    .addTag('Health', 'Application health endpoints')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, documentFactory, {
    jsonDocumentUrl: 'api/docs-json',
  });


  await app.listen(port);

  console.log(`Syllens API running on port ${port}`);
}

void bootstrap();
