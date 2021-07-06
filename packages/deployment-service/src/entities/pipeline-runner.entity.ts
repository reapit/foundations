import { PipelineRunnerModelInterface, DeploymentStatus } from '@reapit/foundations-ts-definitions'
import { AbsrtactEntity } from './abstract-entity'
import { PipelineEntity } from './pipeline.entity'
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { TaskEntity } from './task.entity'

@Entity('pipeline_runners')
export class PipelineRunnerEntity extends AbsrtactEntity implements PipelineRunnerModelInterface {
  @Column({ default: DeploymentStatus.PENDING })
  buildStatus?: DeploymentStatus

  @Column()
  S3Location?: string

  @OneToMany(() => TaskEntity, (task) => task.pipelineRunner)
  tasks?: TaskEntity[]

  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.runners)
  pipeline?: PipelineEntity
}
