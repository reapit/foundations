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
} from 'typeorm'
import {
  PipelineRunnerModelInterface,
  AppTypeEnum,
  PipelineModelInterface,
  PackageManagerEnum,
  TaskModelInterface,
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
  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.runners)
  pipeline?: PipelineEntity

  @Column({ nullable: true, type: 'varchar' })
  codebuildId?: string
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

  get uniqueRepoName(): string {
    return `${this.developerId}/${this.repository?.split('/').pop()}`
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

  @Column({ type: 'timestamp' })
  startTime?: string

  @Column({ type: 'timestamp' })
  endTime?: string

  @Column()
  elapsedTime?: string
}

@Entity('releases')
export class ReleaseEntity extends AbstractEntity {
  @Column()
  zipLocation?: string

  @Column()
  version?: string

  @Column()
  currentlyDeployed?: boolean

  @Column()
  projectName?: string

  @Column()
  developerId?: string
}
