import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Tracer } from './tracing/tracer/tracer.service';
import { ClientProxy } from '@nestjs/microservices';
import { Propagator } from './tracing/propagator/propagator.service';
import { InjectSvcNatsClient } from './svc-nats-client/svc-nats-client.constants';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly log = new Logger('AppService');

  async onModuleInit() {
    await this.client.connect();
    this.log.log('connected to nats');
  }

  constructor(
    private readonly tracer: Tracer,
    @InjectSvcNatsClient() private readonly client: ClientProxy,
    private readonly propagator: Propagator,
  ) {}

  getHello(): string {
    const span = this.tracer.startSpan(
      `${AppService.name} get hello`,
      {},
      this.tracer.activeContext(),
    );
    const headers = {};
    this.propagator.inject(this.tracer.activeContext(), headers);
    this.client.send('my.topic', { data: 'hello-world', headers })
    .subscribe(() => this.log.log('sending'));
    span.end();
    return 'Hello World!!!2';
  }
}
