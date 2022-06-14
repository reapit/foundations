import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { EventModule } from './events'
import { PipelineModule } from './pipeline'
import { PipelineRunnerModule } from './pipeline-runner'
import { S3Module } from './s3'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig, { liveDatabaseConfig } from './config/db'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { GithubModule } from './github'
import config from '../config.json'
import { AppEventModule } from './app-event'
import { BitbucketModule } from './bitbucket'
import { DefaultHeaderInterceptor } from './default-header-interceptor'
import { AwsModule } from './aws'
import { CodeBuildModule } from './codebuild'
import { APP_INTERCEPTOR } from '@nestjs/core'

process.env = {
  ...process.env,
  ...config,
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config.json',
      encoding: 'json',
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
          return liveDatabaseConfig()
        }

        return config.get<MysqlConnectionOptions>('database') as MysqlConnectionOptions
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AuthModule,
    EventModule,
    PipelineModule,
    PipelineRunnerModule,
    S3Module,
    GithubModule,
    AppEventModule,
    BitbucketModule,
    AwsModule,
    CodeBuildModule,
  ],
  providers: [
    DefaultHeaderInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [EventModule, AuthModule, GithubModule],
})
export class AppModule {}
