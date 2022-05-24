import { DeploymentModule } from '../deployment'
import { EventModule } from '../events'
import { GithubModule } from '../github'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerModule } from '../pipeline-runner'
import { S3Module } from '../s3'
import { Module } from '@nestjs/common'
import { CodebuildExecutorWorkflow } from './codebuild-executor-workflow'
import { SoruceProvider } from './source-provider'
import { BitbucketModule } from '../bitbucket'
import { CodebuildPipelineUpdaterEventHandler } from './codebuild-pipeline-updater-event-handler'
import { CodebuildDeployWorkflow } from './coebuild-deploy-workflow'
import { CodeBuild } from 'aws-sdk'
import { ConfigModule, ConfigService } from '@nestjs/config'
import roleCredentials, { RoleCredentialsType } from '@/config/role-credentials'
import { getRoleCredentials } from '@/s3/assumed-s3-client'

@Module({
  imports: [
    PipelineModule,
    PipelineRunnerModule,
    S3Module,
    GithubModule,
    EventModule,
    DeploymentModule,
    BitbucketModule,
    ConfigModule.forFeature(roleCredentials),
  ],
  providers: [
    {
      provide: CodeBuild,
      useFactory: async (config: ConfigService) =>
        new CodeBuild({
          credentials: await getRoleCredentials(
            config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType,
          ),
        }),
      inject: [ConfigService],
    },
    SoruceProvider,
    CodebuildExecutorWorkflow,
    CodebuildPipelineUpdaterEventHandler,
    CodebuildDeployWorkflow,
  ],
})
export class CodeBuildModule {}
