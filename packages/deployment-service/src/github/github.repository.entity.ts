import { AbstractEntity } from '../entities/abstract-entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { GithubRepositoryInterface } from '@reapit/foundations-ts-definitions'

@Entity('github_repositories')
export class GithubRepositoryEntity extends AbstractEntity implements GithubRepositoryInterface {
  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.repository)
  pipelines?: PipelineEntity[]

  @Column()
  repositoryUrl?: string

  @Column({ nullable: true, type: 'varchar', length: 20 })
  installationId?: number

  @Column({ nullable: true, type: 'varchar', length: 20 })
  repositoryId?: number
}
