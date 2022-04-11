import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { TaskEntity } from '../entities/task.entity'
import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerController } from './pipeline-runner-controller'
import { PipelineRunnerProvider } from './pipeline-runner-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AuthModule } from '../auth'
import { TaskProvider } from './task-provider'

@Module({
  imports: [
    TypeOrmModule.forFeature([PipelineRunnerEntity, PipelineEntity, TaskEntity]),
    PipelineModule,
    EventModule,
    AuthModule,
  ],
  providers: [PipelineRunnerProvider, TaskProvider],
  controllers: [PipelineRunnerController],
  exports: [PipelineRunnerProvider, TaskProvider],
})
export class PipelineRunnerModule {}
