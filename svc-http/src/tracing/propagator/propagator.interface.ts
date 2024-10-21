import { Context } from '@opentelemetry/api';

export type Carrier = Record<string, string>;

export interface IPropagator {
  inject(context: Context, carrier: Carrier): void;
  extract(context: Context, carrier: Carrier): Context;
}
