import { TaskRunnerFunctions, TaskModelInterface, DeploymentStatus } from '@reapit/foundations-ts-definitions'
import { Entity, ManyToOne, Column, Tree, TreeChildren, TreeParent } from 'typeorm'
import { AbsrtactEntity } from './abstract-entity'
import { PipelineRunnerEntity } from './pipeline-runner.entity'

@Entity('tasks')
@Tree('nested-set')
export class TaskEntity extends AbsrtactEntity implements TaskModelInterface {
  @ManyToOne(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.tasks)
  pipelineRunner?: PipelineRunnerEntity

  @Column()
  functionName?: TaskRunnerFunctions

  @TreeChildren()
  children?: TaskEntity[]

  @TreeParent()
  parent?: TaskEntity

  @Column({ default: DeploymentStatus.PENDING })
  status?: DeploymentStatus
}
