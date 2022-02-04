import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  TreeParent,
  Tree,
  BeforeInsert,
} from 'typeorm'
import {
  PipelineRunnerModelInterface,
  AppTypeEnum,
  PipelineModelInterface,
  PackageManagerEnum,
  TaskModelInterface,
  PipelineRunnerType,
} from '@reapit/foundations-ts-definitions'
import { Type } from 'class-transformer'
import { CodeBuild } from 'aws-sdk'

abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @CreateDateColumn()
  created?: string

  @UpdateDateColumn()
  modified?: string
}

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
  tasks?: TaskEntity[]

  @Type(() => PipelineEntity)
  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.runners, {
    cascade: true,
  })
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

  @BeforeInsert()
  beforeInsert() {
    this.S3Location = `${this.pipeline?.uniqueRepoName}/${this.id}.zip`
  }
}

@Entity('pipelines')
export class PipelineEntity extends AbstractEntity implements PipelineModelInterface {
  @Column()
  name?: string

  @Column({
    default: AppTypeEnum.REACT,
    type: 'varchar',
  })
  appType?: AppTypeEnum

  @Column()
  buildCommand?: string = 'build'

  @Column({
    default: PackageManagerEnum.NPM,
    type: 'varchar',
  })
  packageManager?: PackageManagerEnum

  @Column()
  repository?: string

  @OneToMany(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.pipeline)
  runners?: PipelineRunnerEntity[]

  @Column()
  developerId?: string

  @Column()
  outDir?: string = 'build'

  @Column()
  clientId?: string

  @Column({ type: 'varchar' })
  buildStatus?: CodeBuild.StatusType = 'CREATING_ARCHITECTURE'

  @Column({ nullable: true })
  subDomain?: string

  @Column({ nullable: true })
  cloudFrontId?: string

  @Column({ nullable: true })
  aRecordId?: string

  @Column()
  appId?: string

  get uniqueRepoName(): string {
    return `${this.developerId}/${this.subDomain}`
  }
}

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
