import database from '../config/database'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'

@Module({
  imports: [ConfigModule.forFeature(database)],
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
  ],
  exports: [DataMapper],
})
export class AwsModule {}
