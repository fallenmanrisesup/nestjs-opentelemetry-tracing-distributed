import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const tempApp = await NestFactory.create(AppModule);
  const conf = tempApp.get(ConfigService);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [conf.getProperties().nats.endpoint],
    },
  });

  await app.listen();
}
bootstrap();
