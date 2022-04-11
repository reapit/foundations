import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { Injectable } from '@nestjs/common'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PipelineEntity } from '../entities/pipeline.entity'
import { SqsProvider } from '../events'
import { QueueNamesEnum } from '../constants'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'

@Injectable()
export class PipelineRunnerProvider {
  constructor(
    @InjectRepository(PipelineRunnerEntity) private readonly repository: Repository<PipelineRunnerEntity>,
    private readonly sqsProvider: SqsProvider,
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

  async findById(id: string): Promise<PipelineRunnerEntity | undefined> {
    return this.repository.findOne(id)
  }

  async deleteForPipeline(pipeline: PipelineEntity): Promise<void> {
    await this.repository.delete(pipeline)
  }

  async pipelineRunnerCountRunning(pipeline: PipelineEntity): Promise<number> {
    return this.repository.count({
      where: {
        pipeline,
        buildStatus: In(['IN_PROGRESS', 'QUEUED']),
      },
    })
  }

  async triggerCodebuildExecutor(pipelineRunner: PipelineRunnerEntity): Promise<void> {
    return this.sqsProvider.send(QueueNamesEnum.CODEBUILD_EXECUTOR, pipelineRunner)
  }
}
