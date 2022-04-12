import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { App } from '@octokit/app'
import GithubConfig from './config/github'

@Module({
  imports: [ConfigModule.forFeature(GithubConfig)],
  providers: [
    {
      provide: App,
      useFactory: (config: ConfigService) => new App(config.get('github')),
      inject: [ConfigService],
    },
  ],
})
export class GithubModule {}
