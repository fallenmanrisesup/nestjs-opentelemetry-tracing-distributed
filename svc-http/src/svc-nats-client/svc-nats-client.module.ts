import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SvcNatsClientProvider } from './svc-nats-client.provider';
import { SVC_NATS_CLIENT_TOKEN } from './svc-nats-client.constants';

@Module({
  imports: [ConfigModule],
  providers: [SvcNatsClientProvider],
  exports: [SVC_NATS_CLIENT_TOKEN],
})
export class ClientModule {}
