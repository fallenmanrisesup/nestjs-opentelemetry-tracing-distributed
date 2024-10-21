import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Tracer } from './tracing/tracer/tracer.service';
import { Propagator } from './tracing/propagator/propagator.service';

@Controller()
export class AppController {
  private readonly log = new Logger('NatsController');

  constructor(
    private readonly appService: AppService,
    private readonly tracer: Tracer,
    private readonly propagator: Propagator,
  ) {}

  @EventPattern('my.topic')
  handleMessage(@Payload() message: any) {
    const { data, headers } = message;
    const ctx = this.propagator.extract(this.tracer.activeContext(), headers);
    const span = this.tracer.startSpan(`${AppController.name} event pattern call`, {}, ctx);
    this.tracer.withSpan(span, () => {
      this.tracer.setSpan(ctx, span);
    });


    this.log.log('received message', { message });

    span.setAttribute('data', JSON.stringify(data));
    span.end();
  }
}
