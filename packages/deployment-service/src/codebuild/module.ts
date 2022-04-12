import { DeploymentModule } from '../deployment'
import { EventModule } from '../events'
import { GithubModule } from '../github-module'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerModule } from '../pipeline-runner'
import { S3Module } from '../s3'
import { Module } from '@nestjs/common'
import { CodebuildExecutorWorkflow } from './codebuild-executor-workflow'
import { SoruceProvider } from './source-provider'
import { BitbucketModule } from '../bitbucket'

@Module({
  imports: [
    PipelineModule,
    PipelineRunnerModule,
    S3Module,
    GithubModule,
    EventModule,
    DeploymentModule,
    BitbucketModule,
  ],
  providers: [SoruceProvider, CodebuildExecutorWorkflow],
})
export class CodeBuildModule {}
