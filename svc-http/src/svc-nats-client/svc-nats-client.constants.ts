import { Inject } from '@nestjs/common';

export const SVC_NATS_CLIENT_TOKEN = Symbol.for('SvcNatsClient');

export const InjectSvcNatsClient = () => Inject(SVC_NATS_CLIENT_TOKEN);
