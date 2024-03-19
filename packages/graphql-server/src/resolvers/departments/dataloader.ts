import DataLoader from 'dataloader'
import { getDepartments } from './services'
import { ServerContext } from '../../utils'
import { DepartmentModel, DepartmentModelPagedResult } from '@reapit/foundations-ts-definitions'
import handleError from '../../utils/handle-error'

export const generateDepartmentBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const departmentsResult = (await getDepartments({ id: keys }, context)) as DepartmentModelPagedResult
    const result = keys.map((key: string) => {
      return (departmentsResult?._embedded ?? []).find((department: DepartmentModel) => department.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateDepartmentBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateDepartmentLoader = (context: ServerContext) =>
  new DataLoader(generateDepartmentBatchLoaderFn(context))
