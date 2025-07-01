import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Kinolar sayti API')
    .setDescription('Foydalanuvchi, obuna va admin panel uchun OpenAPI hujjati')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);


  await app.listen(process.env.PORT ?? 1709);
  console.log("http://localhost:1709/api/swagger");
}
bootstrap();
