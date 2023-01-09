import { Module } from '@nestjs/common'
import { DynamoDB } from 'aws-sdk'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from './config/database'
import { AuthModule } from '@reapit/utils-nest'
import { SessionModule } from './session'
import { DynamoDBModule } from './dynamo'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    AuthModule.forRoot(),
    SessionModule,
    DynamoDBModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => new DynamoDB(config.get('database')),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
