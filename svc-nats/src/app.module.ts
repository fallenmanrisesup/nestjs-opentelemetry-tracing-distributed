import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TracingModule } from './tracing/tracing.module';

@Module({
  imports: [ConfigModule, TracingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
