import { DeploymentModule } from '../deployment'
import { EventModule } from '../events'
import { GithubModule } from '../github-module'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerModule } from '../pipeline-runner'
import { S3Module } from '../s3'
import { Module } from '@nestjs/common'
import { BitbucketProvider } from './bitbucket-provider'
import { CodebuildExecutorWorkflow } from './codebuild-executor-workflow'
import { SoruceProvider } from './source-provider'

@Module({
  imports: [PipelineModule, PipelineRunnerModule, S3Module, GithubModule, EventModule, DeploymentModule],
  providers: [BitbucketProvider, SoruceProvider, CodebuildExecutorWorkflow],
})
export class CodeBuildModule {}
