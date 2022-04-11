import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { EventModule } from './events'
import { PipelineModule } from './pipeline'
import { PipelineRunnerModule } from './pipeline-runner'
import { S3Module } from './s3'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from './config/db'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get<MysqlConnectionOptions>('database') as MysqlConnectionOptions,
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AuthModule,
    EventModule,
    PipelineModule,
    PipelineRunnerModule,
    S3Module,
  ],
  exports: [EventModule, AuthModule],
})
export class AppModule {}
