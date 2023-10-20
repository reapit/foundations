import { AbstractEntity } from './abstract-entity'
import { PipelineEntity } from './pipeline.entity'
import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { GithubRepositoryInterface } from '@reapit/foundations-ts-definitions'

@Entity('repositories')
@Unique('repositoryUrl-organisationId', ['organiationId', 'repositoryUrl'])
export class RepositoryEntity extends AbstractEntity implements GithubRepositoryInterface {
  @OneToMany(() => PipelineEntity, (pipeline) => pipeline.repository)
  pipelines?: PipelineEntity[]

  @Column()
  repositoryUrl?: string

  @Column({ nullable: true, type: 'varchar', length: 20 })
  installationId?: number

  @Column({ nullable: true, type: 'varchar', length: 20 })
  repositoryId?: number

  @Column()
  organisationId: string

  get isGithub(): boolean {
    return this.repositoryUrl !== undefined && this.repositoryUrl.includes('github')
  }

  get isBitbucket(): boolean {
    return this.repositoryUrl !== undefined && this.repositoryUrl.includes('bitbucket')
  }
}
