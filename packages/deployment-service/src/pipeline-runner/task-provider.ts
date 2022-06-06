import { PipelineEntity } from '../entities/pipeline.entity'
import { TaskEntity } from '../entities/task.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TaskProvider {
  constructor(@InjectRepository(TaskEntity) private readonly repository: Repository<TaskEntity>) {}

  async deleteForPipeline(pipeline: PipelineEntity): Promise<void> {
    await this.repository
      .createQueryBuilder('t')
      .leftJoin('t.pipelineRunner', 'pr')
      .where('pr.pipelineId = :pipelineId', { pipelineId: pipeline.id })
      .delete()
      .execute()
  }

  async update(task: TaskEntity, dto: Partial<TaskEntity>): Promise<TaskEntity> {
    return this.repository.save({
      ...task,
      ...dto,
    })
  }
}
