import { connect } from './../core'
import { PipelineEntity, PipelineRunnerEntity, TaskEntity } from './../entities'

export const createTask = async (dto: Partial<TaskEntity> & { pipelineId: string }): Promise<TaskEntity> => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  return repo.save(repo.create(dto))
}

export const createBatchTasks = async (
  pipelineRunner: PipelineRunnerEntity,
  dtos: Partial<TaskEntity>[],
): Promise<TaskEntity[]> => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  return repo.save(
    repo.create(
      dtos.map((dto) => ({
        pipelineRunner,
        ...dto,
      })),
    ),
  )
}

export const updateTask = async (model: TaskEntity, dto: Partial<TaskEntity>) => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  return repo.save({
    ...model,
    ...dto,
  })
}

export const batchUpdateTask = async (tasks: TaskEntity[]) => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  return repo.save(tasks)
}

export const findByPipelineId = async (pipelineRunnerId: string): Promise<TaskEntity[]> => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  return repo.find({
    where: {
      pipelineRunner: {
        id: pipelineRunnerId,
      },
    },
  })
}

export const findTaskById = async (taskId: string): Promise<TaskEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  return repo.findOne(taskId, {
    relations: ['pipelineRunner', 'pipelineRunner.pipeline'],
  })
}

export const deleteTasksFromPipeline = async (pipeline: PipelineEntity): Promise<void> => {
  const connection = await connect()
  const repo = connection.getTreeRepository(TaskEntity)

  await repo
    .createQueryBuilder('t')
    .leftJoin('t.pipelineRunner', 'pr', 'pr.id = t.pipeline_runner_id')
    .leftJoin('pr.pipeline', 'p', 'p.id = pr.pipeline_id')
    .where('p.id = :pipelineId', {
      pipelineId: pipeline.id,
    })
    .delete()
    .execute()
}
