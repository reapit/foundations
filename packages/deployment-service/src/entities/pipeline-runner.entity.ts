import { PipelineRunnerModelInterface, PipelineRunnerType } from '@reapit/foundations-ts-definitions'
import { Type } from 'class-transformer'
import { AfterInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract-entity'
import { CodeBuild } from 'aws-sdk'
import { PipelineEntity } from './pipeline.entity'
import { TaskEntity } from './task.entity'

@Entity('pipeline_runners')
export class PipelineRunnerEntity extends AbstractEntity implements PipelineRunnerModelInterface {
  @Column({ type: 'varchar', default: 'QUEUED' })
  buildStatus?: CodeBuild.BuildPhaseType

  @Column({
    nullable: true,
  })
  S3Location?: string

  @OneToMany(() => TaskEntity, (task) => task.pipelineRunner, {
    eager: true,
    cascade: true,
  })
  tasks: TaskEntity[]

  @Type(() => PipelineEntity)
  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.runners, {
    cascade: true,
  })
  @Type(() => PipelineEntity)
  pipeline?: PipelineEntity

  @Column({ nullable: true, type: 'varchar' })
  codebuildId?: string

  @Column({ nullable: true, length: 400, type: 'varchar' })
  s3BuildLogsLocation?: string

  /**
   * Release or pipeline runner build
   */
  @Column({ default: PipelineRunnerType.BUILD, type: 'varchar' })
  type?: PipelineRunnerType

  /**
   * Version provided from package or manual build
   */
  @Column({ nullable: true })
  buildVersion?: string

  /**
   * Is this the currently deployed version?
   */
  @Column({ default: false })
  currentlyDeployed: boolean = false

  @AfterInsert()
  afterInsert() {
    this.S3Location = `${this.pipeline?.uniqueRepoName}/${this.id}.zip`
  }
}
