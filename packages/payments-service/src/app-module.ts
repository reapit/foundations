import { Module } from '@nestjs/common'
import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from './config/database'
import { AuthModule } from '@reapit/utils-nest'
import { SessionModule } from './session'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    AuthModule.forRoot(),
    SessionModule,
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
  ],
  exports: [DataMapper],
})
export class AppModule {}
