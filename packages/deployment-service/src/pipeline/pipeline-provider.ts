import { Injectable } from '@nestjs/common'
import { PipelineEntity } from '../entities/pipeline.entity'
import { In, Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'

@Injectable()
export class PipelineProvider {
  constructor(
    @InjectRepository(PipelineEntity)
    private readonly repository: Repository<PipelineEntity>,
  ) {}

  async findById(id: string): Promise<PipelineEntity | undefined> {
    return this.repository.findOne(id)
  }

  async paginate(page: number, developerId: string, appId?: string): Promise<Pagination<PipelineEntity>> {
    const qb = this.repository.createQueryBuilder()
    qb.where('developerId = :developerId', { developerId })
    qb.addOrderBy('created', 'DESC')

    if (appId) {
      qb.where('appId = :appId', { appId })
    }

    return paginate(qb, { limit: 10, page })
  }

  async create(dto: Partial<PipelineEntity>): Promise<PipelineEntity> {
    return this.repository.save(this.repository.create(dto))
  }

  async update(pipeline: PipelineEntity, dto: Partial<PipelineEntity>): Promise<PipelineEntity> {
    return this.repository.save({
      ...pipeline,
      ...dto,
    })
  }

  async delete(pipeline: PipelineEntity): Promise<void> {
    await this.repository.delete({
      id: pipeline.id,
    })
  }

  async findByAppId(appId: string): Promise<PipelineEntity[]> {
    return this.repository.find({
      appId,
    })
  }

  async findByRepo(repository: string): Promise<PipelineEntity | undefined> {
    return this.repository.findOne({ repository })
  }

  async findByRepos(repositories: string[]): Promise<PipelineEntity[]> {
    return this.repository.find({
      repository: In(repositories),
    })
  }

  async saveAll(pipelines: PipelineEntity[]): Promise<PipelineEntity[]> {
    return this.repository.save(pipelines)
  }

  async removeBitbucketClient(bitbucketClient: BitbucketClientEntity): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ bitbucketClient: undefined })
      .where('bitbucketClientId = :bitbucketClientId', {
        bitbucketClientId: bitbucketClient.id,
      })
      .execute()
  }

  async findByRepositoryId(repositoryId: number): Promise<PipelineEntity | undefined> {
    return this.repository.findOne({
      repositoryId,
    })
  }

  async findPipelinesByRepositoryId(repositoryId: number): Promise<PipelineEntity[]> {
    return this.repository.find({
      repositoryId,
    })
  }

  async updatePipelinesWithRepo(repository, data: Partial<PipelineEntity>): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('repository = :repository', {
        repository,
      })
      .execute()
  }
}
