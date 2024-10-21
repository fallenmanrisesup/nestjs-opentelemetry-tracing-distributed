import { Module, OnModuleInit, Inject, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { OtelSDKTracingProvider } from './tracing.provider';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Tracer } from './tracer/tracer.service';
import { Propagator } from './propagator/propagator.service';
import { CompositePropagatorProvider } from './propagator/propagator.provider';
import { SDK_TOKEN } from './tracing.constants';

@Module({
  imports: [ConfigModule],
  providers: [OtelSDKTracingProvider, CompositePropagatorProvider, Tracer, Propagator],
  exports: [Propagator, Tracer],
})
export class TracingModule implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(SDK_TOKEN) private readonly sdk: NodeSDK) {}

  async onModuleInit() {
    await this.sdk.start();
  }

  async onModuleDestroy() {
    await this.sdk.shutdown();
  }
}
