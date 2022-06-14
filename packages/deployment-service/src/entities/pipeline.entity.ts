import { AppTypeEnum, PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract-entity'
import { PipelineRunnerEntity } from './pipeline-runner.entity'
import { PipelineBuildStatus } from '../pipeline/pipeline-dto'
import { BitbucketClientEntity } from './bitbucket-client.entity'
import { Exclude, Type } from 'class-transformer'

export const pipelineDeploymentDisabled = [
  'PROVISIONING',
  'PROVISION_REQUEST',
  'FAILED_TO_PROVISION',
  'PRE_PROVISIONED',
  'DELETING',
  'DELETED',
  'SCHEDULED_FOR_DELETION',
]
export const pipelineNotDeletable = [
  'IN_PROGRESS',
  'DELETING',
  'PROVISION_REQUEST',
  'PROVISIONING',
  'QUEUED',
  'SCHEDULED_FOR_DELETION',
]
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

  @ManyToOne(() => BitbucketClientEntity, (bitbucketClient) => bitbucketClient.pipelines, { eager: true })
  @Exclude({
    toPlainOnly: true,
  })
  @Type(() => BitbucketClientEntity)
  bitbucketClient?: BitbucketClientEntity

  @Column()
  developerId?: string

  @Column()
  outDir?: string = 'build'

  @Column()
  clientId?: string

  @Column({ type: 'varchar' })
  buildStatus?: PipelineBuildStatus = 'CREATED'

  @Column({ nullable: true })
  subDomain?: string

  @Column({ nullable: true })
  @Exclude()
  cloudFrontId?: string

  @Column({ nullable: true })
  @Exclude()
  aRecordId?: string

  @Column()
  appId?: string

  @Column({ nullable: true, type: 'varchar', length: 20 })
  installationId?: number

  @Column({ nullable: true, type: 'varchar', length: 20 })
  repositoryId?: number

  @Column({ default: 'master' })
  branch?: string

  get hasDistro(): boolean {
    return this.cloudFrontId !== null && this.cloudFrontId !== undefined && this.cloudFrontId !== ''
  }

  get hasRepositoryConfigured(): boolean {
    return this.repository !== undefined && this.repository !== ''
  }

  get hasRepositoryInstalled(): boolean {
    return this.repositoryId !== undefined
  }
  get hasRoute53(): boolean {
    return this.aRecordId !== undefined && this.aRecordId !== ''
  }

  get uniqueRepoName(): string {
    return `${this.developerId}/${this.subDomain}`
  }

  get isPipelineDeletable(): boolean {
    return !this.buildStatus || !pipelineNotDeletable.includes(this.buildStatus)
  }

  get isPipelineDeploymentDisabled(): boolean {
    return !this.buildStatus || pipelineDeploymentDisabled.includes(this.buildStatus)
  }
}
