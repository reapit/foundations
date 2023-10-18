import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerModule } from '../pipeline-runner'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { App } from '@octokit/app'
import GithubConfig from '../config/github'
import { GithubWebhookController } from './github-webhook-controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GithubRepositoryEntity } from './github.repository.entity'
import { GithubRepositoryProvider } from './github.repository.provider'

@Module({
  imports: [
    ConfigModule.forFeature(GithubConfig),
    PipelineModule,
    PipelineRunnerModule,
    EventModule,
    TypeOrmModule.forFeature([GithubRepositoryEntity]),
  ],
  providers: [
    {
      provide: App,
      useFactory: (config: ConfigService) => new App(config.get('github')),
      inject: [ConfigService],
    },
    GithubRepositoryProvider,
  ],
  controllers: [GithubWebhookController],
  exports: [App],
})
export class GithubModule {}
