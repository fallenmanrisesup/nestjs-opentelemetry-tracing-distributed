import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Tracer } from './tracing/tracer/tracer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tracer: Tracer,
  ) {}

  @Get()
  get(): string {
    const span = this.tracer.startSpan(`${AppController.name} get req`);

    return this.tracer.withSpan(span, () => {
      span.setAttribute('handler', AppController.name);

      const result = this.appService.getHello();

      span.end();
      return result;
    });
  }
}
