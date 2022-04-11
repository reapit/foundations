import { PipelineRunnerEntity } from '@/entities/pipeline-runner.entity'
import { PipelineEntity } from '@/entities/pipeline.entity'
import { TaskEntity } from '@/entities/task.entity'
import { EventModule } from '@/events'
import { PipelineModule } from '@/pipeline/module'
import { PipelineRunnerController } from './pipeline-runner-controller'
import { PipelineRunnerProvider } from './pipeline-runner-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([PipelineRunnerEntity, PipelineEntity, TaskEntity]), PipelineModule, EventModule],
  providers: [PipelineRunnerProvider],
  controllers: [PipelineRunnerController],
})
export class PipelineRunnerModule {}
