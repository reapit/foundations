import { EventModule } from '../events'
import { forwardRef, Module } from '@nestjs/common'
import { PipelineController } from './pipeline-controller'
import { PipelineProvider } from './pipeline-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { TaskEntity } from '../entities/task.entity'
import { S3Module } from '../s3'
import { AuthModule } from '@reapit/utils-nest'
import { PipelineRunnerModule } from '../pipeline-runner'
import { PipelineTearDownStartWorkflow } from './pipeline-teardown-start-workflow'
import { PipelineTearDownWorkflow } from './pipeline-teardown-workflow'
import { PipelineSetupWorkflow } from './pipeline-setup-workflow'
import { ParameterProvider } from './parameter-provider'
import { ParameterController } from './parameter-controller'
import { AwsModule } from '../aws'
import { RepositoryProvider } from './repository.provider'
import { RepositoryEntity } from '../entities/repository.entity'
import { MarketplaceModule } from '../marketplace'

@Module({
  imports: [
    EventModule,
    AuthModule,
    TypeOrmModule.forFeature([PipelineEntity, PipelineRunnerEntity, TaskEntity, RepositoryEntity]),
    S3Module,
    forwardRef(() => PipelineRunnerModule),
    AwsModule,
    MarketplaceModule,
  ],
  providers: [
    PipelineProvider,
    PipelineTearDownStartWorkflow,
    PipelineTearDownWorkflow,
    PipelineSetupWorkflow,
    ParameterProvider,
    RepositoryProvider,
  ],
  controllers: [PipelineController, ParameterController],
  exports: [PipelineProvider, ParameterProvider, RepositoryProvider],
})
export class PipelineModule {}
