import { TextMapPropagator } from '@opentelemetry/api';
import { Provider } from '@nestjs/common';
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { PROPAGATOR_PROVIDER_TOKEN } from '../tracing.constants';

export const CompositePropagatorProvider: Provider<TextMapPropagator> = {
  useFactory: () =>
    new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
        new JaegerPropagator(),
        new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
      ],
    }),
  provide: PROPAGATOR_PROVIDER_TOKEN,
};
