import { Provider } from '@nestjs/common';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { TextMapPropagator } from '@opentelemetry/api';
import { ConfigService } from '../config/config.service';
import { PROPAGATOR_PROVIDER_TOKEN, SDK_TOKEN } from './tracing.constants';

export const OtelSDKTracingProvider: Provider<NodeSDK> = {
  provide: SDK_TOKEN,
  inject: [ConfigService, PROPAGATOR_PROVIDER_TOKEN],
  useFactory: (config: ConfigService, propagator: TextMapPropagator) => {
    const props = config.getProperties();

    return new NodeSDK({
      spanProcessor: new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: config.getProperties().otlp.collectorEndpoint,
        }),
      ),
      resource: new Resource({
        [ATTR_SERVICE_NAME]: props.serviceName,
      }),
      instrumentations: [
        new HttpInstrumentation(),
        getNodeAutoInstrumentations(),
      ],
      textMapPropagator: propagator,
    });
  },
};
