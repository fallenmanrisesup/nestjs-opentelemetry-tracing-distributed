import { Injectable } from '@nestjs/common';
import {
  Context,
  Span,
  trace,
  context,
  Tracer as OTELTracer,
  SpanOptions,
} from '@opentelemetry/api';
import { ConfigService } from '../../config/config.service';
import { ITracer } from './tracer.interface';
@Injectable()
export class Tracer implements ITracer {
  private readonly tracer: OTELTracer;

  constructor(config: ConfigService) {
    this.tracer = trace.getTracer(config.getProperties().serviceName);
  }

  setSpan(context: Context, span: Span): Context {
    return trace.setSpan(context, span);
  }

  startSpan(name: string, options?: SpanOptions, context?: Context): Span {
    return this.tracer.startSpan(name, options, context);
  }

  activeContext(): Context {
    return context.active();
  }

  withSpan<T>(span: Span, fn: () => T): T {
    return context.with(trace.setSpan(context.active(), span), fn);
  }
}
