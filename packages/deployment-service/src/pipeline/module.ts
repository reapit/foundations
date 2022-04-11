import { EventModule } from '../events'
import { Module } from '@nestjs/common'
import { PipelineController } from './pipeline-controller'
import { PipelineProvider } from './pipeline-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { TaskEntity } from '../entities/task.entity'

@Module({
  imports: [EventModule, TypeOrmModule.forFeature([PipelineEntity, PipelineRunnerEntity, TaskEntity])],
  providers: [PipelineProvider],
  controllers: [PipelineController],
})
export class PipelineModule {}
