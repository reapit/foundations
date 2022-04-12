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

@Module({
  imports: [
    EventModule,
    AuthModule,
    TypeOrmModule.forFeature([PipelineEntity, PipelineRunnerEntity, TaskEntity]),
    S3Module,
    forwardRef(() => PipelineRunnerModule),
  ],
  providers: [PipelineProvider, PipelineTearDownStartWorkflow, PipelineTearDownWorkflow, PipelineSetupWorkflow],
  controllers: [PipelineController],
  exports: [PipelineProvider],
})
export class PipelineModule {}
