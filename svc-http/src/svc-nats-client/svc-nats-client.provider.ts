import { Provider } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SVC_NATS_CLIENT_TOKEN } from './svc-nats-client.constants';
import { ConfigService } from '../config/config.service';

export const SvcNatsClientProvider: Provider<ClientProxy> = {
  provide: SVC_NATS_CLIENT_TOKEN,
  inject: [ConfigService],
  useFactory: (config: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [config.getProperties().nats.endpoint],
      },
    }),
};
