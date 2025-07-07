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
import { Octokit } from '@octokit/rest'
import { GithubPullRequestProvider } from './github-pull-request-provider'

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
    {
      provide: Octokit,
      useFactory: (config: ConfigService) => {
        console.log('PAT', config.get<string>('github.PAT'))
        return new Octokit({
          auth: config.get<string>('github.PAT'),
        })
      },
      inject: [ConfigService],
    },
    GithubPullRequestProvider,
    GithubAuthProvider,
  ],
  controllers: [GithubWebhookController, GithubAuthController],
  exports: [App, GithubPullRequestProvider],
})
export class GithubModule {}
