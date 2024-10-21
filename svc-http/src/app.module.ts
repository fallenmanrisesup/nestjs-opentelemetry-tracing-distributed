import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracingModule } from './tracing/tracing.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './svc-nats-client/svc-nats-client.module';

@Module({
  imports: [ConfigModule, TracingModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
