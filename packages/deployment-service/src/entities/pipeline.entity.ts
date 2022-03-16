import { AppTypeEnum, PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { Column, Entity, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract-entity'
import { PipelineRunnerEntity } from './pipeline-runner.entity'
import { CodeBuild } from 'aws-sdk'

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
  buildStatus?: CodeBuild.StatusType = 'CREATED'

  @Column({ nullable: true })
  subDomain?: string

  @Column({ nullable: true })
  cloudFrontId?: string

  @Column({ nullable: true })
  aRecordId?: string

  @Column()
  appId?: string

  @Column({ nullable: true, type: 'varchar', length: 20 })
  installationId?: number

  @Column({ nullable: true, type: 'varchar', length: 20 })
  repositoryId?: number

  @Column({ default: 'master' })
  branch?: string

  get uniqueRepoName(): string {
    return `${this.developerId}/${this.subDomain}`
  }
}
