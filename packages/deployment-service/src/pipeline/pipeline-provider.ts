import { Injectable } from '@nestjs/common'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { SqsProvider } from '../events'
import { QueueNamesEnum } from '../constants'

@Injectable()
export class PipelineProvider {
  constructor(
    @InjectRepository(PipelineEntity)
    private readonly repository: Repository<PipelineEntity>,
    private readonly sqsProvider: SqsProvider,
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

  async triggerPipelineSetup(pipeline: PipelineEntity): Promise<void> {
    this.sqsProvider.send(QueueNamesEnum.PIPELINE_SETUP, pipeline)
  }

  async triggerPipelineTearDown(pipeline: PipelineEntity): Promise<void> {
    this.sqsProvider.send(QueueNamesEnum.PIPELINE_TEAR_DOWN_START, pipeline)
  }
}
