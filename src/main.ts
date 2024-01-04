import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import './config/xlsx';

async function bootstrap() {
    (await import('dotenv')).config();
    const { name, description, version } = await import('./../package.json');

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(description)
        .setVersion(version)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors();

    await app.listen(process.env.PORT);
}
bootstrap();
