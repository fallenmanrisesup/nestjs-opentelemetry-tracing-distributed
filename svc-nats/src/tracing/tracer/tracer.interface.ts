import { Context, Span, SpanOptions } from '@opentelemetry/api';

export interface ITracer {
  setSpan(context: Context, span: Span): Context;
  startSpan(name: string, options?: SpanOptions, context?: Context): Span;
  activeContext(): Context;
  withSpan<T>(span: Span, fn: () => T): T;
}
