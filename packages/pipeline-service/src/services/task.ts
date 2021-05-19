import { db } from '@/core'
import { TaskModel } from '@/models'

export const createTask = (dto: Partial<TaskModel> & { pipelineId: string }): Promise<TaskModel> => {
  return db.put(Object.assign(new TaskModel(), dto))
}

export const createBatchTasks = async (dtos: Partial<TaskModel> & { pipelineId: string }[]): Promise<TaskModel[]> => {
  const results = await db.batchPut(dtos.map((dto) => Object.assign(new TaskModel(), dto)))

  return asyncIteratorToArray<TaskModel>(results)
}

export const updateTask = (model: TaskModel, dto: Partial<TaskModel>) => {
  return db.put(
    Object.assign(new TaskModel(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const findByPipelineId = async (pipelineId: string): Promise<TaskModel[]> => {
  const results = await db.query(TaskModel, {
    keyConditions: {
      pipelineId,
    },
  })

  return asyncIteratorToArray<TaskModel>(results)
}

const asyncIteratorToArray = async <T>(asyncIterator): Promise<T[]> => {
  const result: T[] = []
  for await (const i of asyncIterator) result.push(i)

  return result
}
