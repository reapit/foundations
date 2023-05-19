import { Module } from '@nestjs/common'
import { DynamoDB } from 'aws-sdk'
import { ApiKeyController } from './api-key-controller'
import { ApiKeyProvider } from './api-key-provider'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from '../config/database'
import { AuthModule } from '@reapit/utils-nest'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    AuthModule.forRootAsync({
      useFactory: () => ({
        env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
      }),
    }),
  ],
  providers: [
    {
      provide: DynamoDB,
      useFactory: (config: ConfigService) => new DynamoDB(config.get('database')),
      inject: [ConfigService],
    },
    {
      provide: DataMapper,
      useFactory: (client: DynamoDB) =>
        new DataMapper({
          client,
        }),
      inject: [DynamoDB],
    },
    ApiKeyProvider,
  ],
  controllers: [ApiKeyController],
  exports: [ApiKeyProvider],
})
export class ApiKeyModule {}
