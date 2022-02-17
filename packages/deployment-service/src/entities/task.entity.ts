import { Entity, Column, ManyToOne, TreeParent, Tree } from 'typeorm'
import { TaskModelInterface } from '@reapit/foundations-ts-definitions'
import { CodeBuild } from 'aws-sdk'
import { AbstractEntity } from './abstract-entity'
import { PipelineRunnerEntity } from './pipeline-runner.entity'

@Entity('tasks')
@Tree('adjacency-list')
export class TaskEntity extends AbstractEntity implements TaskModelInterface {
  @ManyToOne(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.tasks)
  pipelineRunner?: PipelineRunnerEntity

  @Column({
    type: 'varchar',
  })
  functionName?: CodeBuild.BuildPhaseType

  @TreeParent()
  parent?: TaskEntity

  @Column({ type: 'varchar' })
  buildStatus?: CodeBuild.StatusType

  @Column({ type: 'timestamp', nullable: true })
  startTime?: Date

  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date

  @Column({ nullable: true })
  elapsedTime?: string
}
