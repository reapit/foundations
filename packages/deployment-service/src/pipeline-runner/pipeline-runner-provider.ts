import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { Injectable } from '@nestjs/common'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PipelineEntity } from '../entities/pipeline.entity'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'

@Injectable()
export class PipelineRunnerProvider {
  constructor(
    @InjectRepository(PipelineRunnerEntity) private readonly repository: Repository<PipelineRunnerEntity>,
  ) {}

  async create(dto: Partial<PipelineRunnerEntity>): Promise<PipelineRunnerEntity> {
    return this.repository.save(this.repository.create(dto))
  }

  async paginate(pipeline: PipelineEntity, page: number): Promise<Pagination<PipelineRunnerEntity>> {
    return paginate(
      this.repository,
      { limit: 10, page },
      {
        relations: ['pipeline'],
        where: {
          pipeline,
        },
        order: {
          created: 'DESC',
        },
      },
    )
  }

  async update(entity: PipelineRunnerEntity, dto: Partial<PipelineRunnerEntity>): Promise<PipelineRunnerEntity> {
    return this.repository.save({
      ...entity,
      ...dto,
    })
  }

  async findById(
    id: string,
    extra?: {
      relations: string[]
    },
  ): Promise<PipelineRunnerEntity | undefined> {
    return this.repository.findOne({
      where: { id },
      ...extra,
    })
  }

  async save(entity: PipelineRunnerEntity): Promise<PipelineRunnerEntity> {
    return this.repository.save(entity)
  }

  async deleteForPipeline(pipeline: PipelineEntity): Promise<void> {
    await this.repository.delete(pipeline)
  }

  async resetCurrentlyDeployed(pipeline: PipelineEntity): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        currentlyDeployed: false,
      })
      .where('pipelineId = :pipelineId', { pipelineId: pipeline.id })
      .execute()
  }

  async pipelineRunnerCountRunning(pipeline: PipelineEntity): Promise<number> {
    return this.repository.count({
      where: {
        pipeline,
        buildStatus: In(['IN_PROGRESS', 'QUEUED']),
      },
    })
  }

  async findByCodebuildId(codebuildId: string): Promise<PipelineRunnerEntity | undefined> {
    return this.repository.findOne({ codebuildId })
  }
}
