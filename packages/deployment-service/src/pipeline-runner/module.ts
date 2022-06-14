import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { TaskEntity } from '../entities/task.entity'
import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerController } from './pipeline-runner-controller'
import { PipelineRunnerProvider } from './pipeline-runner-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '@reapit/utils-node'
import { TaskProvider } from './task-provider'
import { DeploymentModule } from '../deployment'
import { S3Module } from '../s3'

@Module({
  imports: [
    TypeOrmModule.forFeature([PipelineRunnerEntity, PipelineEntity, TaskEntity]),
    EventModule,
    AuthModule,
    forwardRef(() => PipelineModule),
    DeploymentModule,
    S3Module,
  ],
  providers: [PipelineRunnerProvider, TaskProvider],
  controllers: [PipelineRunnerController],
  exports: [PipelineRunnerProvider, TaskProvider],
})
export class PipelineRunnerModule {}
