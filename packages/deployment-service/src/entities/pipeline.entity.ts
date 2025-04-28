import {
  AppTypeEnum,
  PackageManagerEnum,
  pipelineDeploymentDisabled,
  PipelineModelInterface,
  pipelineNotDeletable,
} from '@reapit/foundations-ts-definitions'
import type { PipelineBuildStatus } from '@reapit/foundations-ts-definitions'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract-entity'
import { PipelineRunnerEntity } from './pipeline-runner.entity'
import { BitbucketClientEntity } from './bitbucket-client.entity'
import { Exclude, Expose, Type } from 'class-transformer'
import { RepositoryEntity } from './repository.entity'

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

  @ManyToOne(() => RepositoryEntity, (repository) => repository.pipelines, {
    cascade: ['remove', 'insert'],
    eager: true,
  })
  @Type(() => RepositoryEntity)
  repository?: RepositoryEntity

  @OneToMany(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.pipeline)
  runners?: PipelineRunnerEntity[]

  @ManyToOne(() => BitbucketClientEntity, (bitbucketClient) => bitbucketClient.pipelines, { eager: true })
  @Exclude({
    toPlainOnly: true,
  })
  @Type(() => BitbucketClientEntity)
  bitbucketClient?: BitbucketClientEntity | null

  @Column()
  bitbucketClientId?: string

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
  @Expose({
    groups: ['ReapitEmployeeFoundationsAdmin'],
  })
  cloudFrontId?: string

  @Column({ nullable: true })
  @Expose({
    groups: ['ReapitEmployeeFoundationsAdmin'],
  })
  aRecordId?: string

  @Column()
  appId?: string

  @Column({ default: 'master' })
  branch?: string

  // TODO remove from migration
  // @Column({ nullable: true })
  // verifyDnsValue?: string

  // @Column({ nullable: true })
  // verifyDnsName?: string

  @Column({ nullable: true })
  customDomain?: string

  // @Column({ default: false })
  // domainVerified: boolean = false

  @Column({ nullable: true })
  @Expose({
    groups: ['ReapitEmployeeFoundationsAdmin'],
  })
  certificateArn?: string

  // @Column({ default: 'unverified' })
  // certificateStatus?: string

  @Column()
  certificateError?: string

  get hasDistro(): boolean {
    return this.cloudFrontId !== null && this.cloudFrontId !== undefined && this.cloudFrontId !== ''
  }

  get hasRepositoryConfigured(): boolean {
    return this.repository !== undefined && this.repository.repositoryUrl !== ''
  }

  get hasRepositoryInstalled(): boolean {
    return this.repository !== undefined && this.repository.repositoryId !== undefined
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
