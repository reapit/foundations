import { EventModule } from '../events'
import { forwardRef, Module } from '@nestjs/common'
import { PipelineController } from './pipeline-controller'
import { PipelineProvider } from './pipeline-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { TaskEntity } from '../entities/task.entity'
import { S3Module } from '../s3'
import { AuthModule } from '../auth'
import { PipelineRunnerModule } from '../pipeline-runner'
import { PipelineTearDownStartWorkflow } from './pipeline-teardown-start-workflow'
import { PipelineTearDownWorkflow } from './pipeline-teardown-workflow'
import { PipelineSetupWorkflow } from './pipeline-setup-workflow'
import { ParameterProvider } from './parameter-provider'
import { SSM } from 'aws-sdk'
import { getRoleCredentials } from '../s3/assumed-s3-client'
import { ConfigModule, ConfigService } from '@nestjs/config'
import roleCredentials, { RoleCredentialsType } from '../config/role-credentials'
import { ParameterController } from './parameter-controller'

@Module({
  imports: [
    EventModule,
    AuthModule,
    TypeOrmModule.forFeature([PipelineEntity, PipelineRunnerEntity, TaskEntity]),
    S3Module,
    forwardRef(() => PipelineRunnerModule),
    ConfigModule.forFeature(roleCredentials),
  ],
  providers: [
    PipelineProvider,
    PipelineTearDownStartWorkflow,
    PipelineTearDownWorkflow,
    PipelineSetupWorkflow,
    {
      provide: SSM,
      useFactory: async (config: ConfigService) =>
        new SSM({
          credentials: await getRoleCredentials(
            config.get<RoleCredentialsType>('role-credentials') as RoleCredentialsType,
          ),
        }),
      inject: [ConfigService],
    },
    ParameterProvider,
  ],
  controllers: [PipelineController, ParameterController],
  exports: [PipelineProvider, ParameterProvider],
})
export class PipelineModule {}
