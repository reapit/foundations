import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerModule } from '../pipeline-runner'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { App } from '@octokit/app'
import GithubConfig from '../config/github'
import { GithubWebhookController } from './github-webhook-controller'
import { GithubAuthProvider } from './github-auth-provider'
import { GithubAuthController } from './github-auth-controller'
import { HttpModule } from '@nestjs/axios'
import githubAuth from '../config/github-auth'

@Module({
  imports: [
    ConfigModule.forFeature(GithubConfig),
    ConfigModule.forFeature(githubAuth),
    PipelineModule,
    PipelineRunnerModule,
    EventModule,
    HttpModule,
  ],
  providers: [
    {
      provide: App,
      useFactory: (config: ConfigService) => new App(config.get('github')),
      inject: [ConfigService],
    },
    GithubAuthProvider,
  ],
  controllers: [GithubWebhookController, GithubAuthController],
  exports: [App],
})
export class GithubModule {}
