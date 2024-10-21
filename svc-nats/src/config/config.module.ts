import { ConfigModule as Config } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { load } from './config';
import { ConfigService } from './config.service';

@Module({
  imports: [
    Config.forRoot({
      load: [load],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
