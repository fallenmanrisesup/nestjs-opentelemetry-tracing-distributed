const defaultOTLPCollectorEndpoint = 'http://otel-collector:4318/v1/traces';
const defaultNATSENdpoint = 'nats://nats:4222';
const defaultServiceName = 'svc-http';

export interface OTLPProperties {
  collectorEndpoint: string;
}

export interface NATSProperties {
  endpoint: string;
}

export interface ConfigProperties {
  serviceName: string;
  otlp: OTLPProperties;
  nats: NATSProperties;
}

export interface InstanceInfo {
  hostname: string;
  version: string;
}

export const load = (): ConfigProperties => {
  return {
    serviceName: process.env.SERVICE_NAME || defaultServiceName,
    nats: {
      endpoint: process.env.NATS_ENDPOINT || defaultNATSENdpoint,
    },
    otlp: {
      collectorEndpoint:
        process.env.OTLP_COLLECTOR_ENDPOINT || defaultOTLPCollectorEndpoint,
    },
  };
};
