import { db } from '@/core'
import { TaskEntity } from '@/entities'

export const createTask = (dto: Partial<TaskEntity> & { pipelineId: string }): Promise<TaskEntity> => {
  return db.put(Object.assign(new TaskEntity(), dto))
}

export const createBatchTasks = async (dtos: Partial<TaskEntity> & { pipelineId: string }[]): Promise<TaskEntity[]> => {
  const results = await db.batchPut(dtos.map((dto) => Object.assign(new TaskEntity(), dto)))

  return asyncIteratorToArray<TaskEntity>(results)
}

export const updateTask = (model: TaskEntity, dto: Partial<TaskEntity>) => {
  return db.put(
    Object.assign(new TaskEntity(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const batchUpdateTask = (models: TaskEntity[]) => {
  return db.batchPut(
    models.map((model) =>
      Object.assign(new TaskEntity(), {
        ...model,
        modified: new Date().toISOString(),
      }),
    ),
  )
}

export const findByPipelineId = async (pipelineId: string): Promise<TaskEntity[]> => {
  const results = await db.query(TaskEntity, {
    keyConditions: {
      pipelineId,
    },
  })

  return asyncIteratorToArray<TaskEntity>(results)
}

const asyncIteratorToArray = async <T>(asyncIterator): Promise<T[]> => {
  const result: T[] = []
  for await (const i of asyncIterator) result.push(i)

  return result
}
