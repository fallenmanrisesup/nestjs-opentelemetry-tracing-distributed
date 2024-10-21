import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';
import * as os from 'os';
import { ConfigProperties, InstanceInfo } from './config';

@Injectable()
export class ConfigService {
  constructor(private readonly config: Config) {}

  getProperties(): ConfigProperties & InstanceInfo {
    return {
      serviceName: this.config.get('serviceName'),
      nats: this.config.get('nats'),
      otlp: this.config.get('otlp'),
      hostname: os.hostname(),
      version: '0.0.1',
    };
  }
}
