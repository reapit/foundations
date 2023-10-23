import { AbstractEntity } from './abstract-entity'
import { PipelineEntity } from './pipeline.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { GithubRepositoryInterface } from '@reapit/foundations-ts-definitions'
import { Exclude } from 'class-transformer'

@Entity('repositories')
// @Unique('repositoryUrl-organisationId', ['organiationId', 'repositoryUrl']) // TODO likely to be developerId instead
export class RepositoryEntity extends AbstractEntity implements GithubRepositoryInterface {
  @OneToMany(() => PipelineEntity, (pipeline) => pipeline.repository)
  pipelines?: PipelineEntity[]

  @Column()
  repositoryUrl?: string

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @Exclude({})
  installationId?: number

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @Exclude({})
  repositoryId?: number

  // @Column()
  // organisationId: string // TODO likely to be changed to developerId

  get isGithub(): boolean {
    return this.repositoryUrl !== undefined && this.repositoryUrl.includes('github')
  }

  get isBitbucket(): boolean {
    return this.repositoryUrl !== undefined && this.repositoryUrl.includes('bitbucket')
  }
}
