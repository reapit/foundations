import { Injectable } from '@nestjs/common'
import { PipelineEntity } from '../entities/pipeline.entity'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'

@Injectable()
export class PipelineProvider {
  constructor(
    @InjectRepository(PipelineEntity)
    private readonly repository: Repository<PipelineEntity>,
  ) {}

  async findById(id: string): Promise<PipelineEntity | null> {
    return this.repository.findOne({ where: { id } })
  }

  async findByCertificateArn(certificateArn: string): Promise<PipelineEntity | null> {
    return this.repository.findOne({ where: { certificateArn } })
  }

  async paginate(page: number, developerId?: string, appId?: string): Promise<Pagination<PipelineEntity>> {
    const qb = this.repository.createQueryBuilder('p')
    if (developerId) {
      qb.where('p.developerId = :developerId', { developerId })
    }

    qb.leftJoinAndMapOne('p.repository', 'repositories', 'rp', 'p.repositoryId = rp.id')

    qb.addOrderBy('p.created', 'DESC')

    if (appId) {
      qb.where('p.appId = :appId', { appId })
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
      where: { appId },
    })
  }

  async findByRepo(repositoryUrl: string): Promise<PipelineEntity | null> {
    return this.repository.findOne({ where: { repository: { repositoryUrl } } })
  }

  async findByRepos(repositories: string[]): Promise<PipelineEntity[]> {
    return this.repository.find({
      where: {
        repository: {
          repositoryUrl: In(repositories),
        },
      },
      relations: ['repository'],
    })
  }

  async findBySubDomain(subDomain: string): Promise<PipelineEntity | null> {
    return this.repository.findOne({
      where: {
        subDomain,
      },
    })
  }

  async findByDeveloperId(developerId: string): Promise<PipelineEntity[]> {
    return this.repository.find({
      where: {
        developerId,
      },
    })
  }

  async saveAll(pipelines: PipelineEntity[]): Promise<PipelineEntity[]> {
    return this.repository.save(pipelines)
  }

  async removeBitbucketClient(bitbucketClient: BitbucketClientEntity): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ bitbucketClient: null })
      .where('bitbucketClientId = :bitbucketClientId', {
        bitbucketClientId: bitbucketClient.id,
      })
      .execute()
  }

  async findByRepositoryId(repositoryId: number): Promise<PipelineEntity | null> {
    return this.repository.findOne({
      where: {
        repository: {
          repositoryId,
        },
      },
      relations: ['repository'],
    })
  }

  async findPipelinesByRepositoryUrl(repositoryUrl: string): Promise<PipelineEntity[]> {
    return this.repository.find({
      where: {
        repository: {
          repositoryUrl,
        },
      },
      relations: ['repository'],
    })
  }

  async findPipelinesByRepositoryId(repositoryId: number): Promise<PipelineEntity[]> {
    return this.repository.find({
      where: {
        repository: {
          repositoryId,
        },
      },
      relations: ['repository'],
    })
  }
}
