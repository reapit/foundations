import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  TreeParent,
  TreeChildren,
  Tree,
} from 'typeorm'
import {
  PipelineRunnerModelInterface,
  DeploymentStatus,
  AppTypeEnum,
  PipelineModelInterface,
  PackageManagerEnum,
  TaskModelInterface,
  TaskRunnerFunctions,
} from '@reapit/foundations-ts-definitions'

abstract class AbsrtactEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @CreateDateColumn()
  created?: string

  @UpdateDateColumn()
  modified?: string
}

@Entity('pipeline_runners')
export class PipelineRunnerEntity extends AbsrtactEntity implements PipelineRunnerModelInterface {
  @Column({ default: DeploymentStatus.PENDING, type: 'enum', enum: DeploymentStatus })
  buildStatus?: DeploymentStatus

  @Column({
    nullable: true,
  })
  S3Location?: string

  @OneToMany(() => TaskEntity, (task) => task.pipelineRunner, {
    eager: true,
  })
  tasks?: TaskEntity[]

  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.runners)
  pipeline?: PipelineEntity
}

@Entity('pipelines')
export class PipelineEntity extends AbsrtactEntity implements PipelineModelInterface {
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
}

@Entity('tasks')
@Tree('nested-set')
export class TaskEntity extends AbsrtactEntity implements TaskModelInterface {
  @ManyToOne(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.tasks)
  pipelineRunner?: PipelineRunnerEntity

  @Column({
    type: 'varchar',
  })
  functionName?: TaskRunnerFunctions

  @TreeChildren()
  children?: TaskEntity[]

  @TreeParent()
  parent?: TaskEntity

  @Column({ default: DeploymentStatus.PENDING, type: 'varchar' })
  status?: DeploymentStatus
}
