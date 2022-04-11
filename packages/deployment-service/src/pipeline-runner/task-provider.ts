import { PipelineEntity } from '../entities/pipeline.entity'
import { TaskEntity } from '../entities/task.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TaskProvider {
  constructor(@InjectRepository(TaskEntity) private readonly repository: Repository<TaskEntity>) {}

  async deleteForPipeline(pipeline: PipelineEntity): Promise<void> {
    const tasks = await this.repository
      .createQueryBuilder('t')
      .leftJoin('t.pipelineRunner', 'pr')
      .leftJoin('pr.pipeline', 'p')
      .where('p.id = :pipelineId', { pipelineId: pipeline.id })
      .getMany()

    if (tasks.length >= 1) await this.repository.delete(tasks.map((task) => task.id as string))
  }
}
