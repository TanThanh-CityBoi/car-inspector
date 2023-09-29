import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  app.enableCors({
    origin:
      config.get('env') === 'production' ? [config.get('clientUrl')] : true,
    allowedHeaders: [
      'Accept',
      'Accept-Version',
      'Content-Type',
      'Api-Version',
      'Origin',
      'X-Requested-With',
      'Authorization',
    ],
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.enableShutdownHooks();
  await app.listen(config.get('port'), () => {
    Logger.debug(`APPLICATION IS RUNNING ON PORT: ${config.get('port')}`);
  });
}
bootstrap();
