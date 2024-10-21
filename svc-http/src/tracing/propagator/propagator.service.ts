import { Inject, Injectable } from '@nestjs/common';
import {
  Context,
  defaultTextMapGetter,
  defaultTextMapSetter,
  TextMapPropagator,
} from '@opentelemetry/api';
import { Carrier, IPropagator } from './propagator.interface';
import { PROPAGATOR_PROVIDER_TOKEN } from '../tracing.constants';

@Injectable()
export class Propagator implements IPropagator {
  constructor(
    @Inject(PROPAGATOR_PROVIDER_TOKEN)
    private readonly propagator: TextMapPropagator,
  ) {}

  inject(context: Context, carrier: Carrier) {
    return this.propagator.inject(context, carrier, defaultTextMapSetter);
  }
  extract(context: Context, carrier: Carrier): Context {
    return this.propagator.extract(context, carrier, defaultTextMapGetter);
  }
}
