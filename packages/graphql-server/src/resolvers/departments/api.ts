import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../utils'
import { GetDepartmentByIdArgs, GetDepartmentsArgs, GetDepartmentByIdReturn, GetDepartmentsReturn } from './departments'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetDepartmentByIdAPI = async (
  args: GetDepartmentByIdArgs,
  context: ServerContext,
): GetDepartmentByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetDepartmentByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetDepartmentByIdReturn>(
      `${URLS.departments}/${args.id}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetDepartmentByIdAPI' })
    return handleErrorResult
  }
}

export const callGetDepartmentsAPI = async (args: GetDepartmentsArgs, context: ServerContext): GetDepartmentsReturn => {
  const traceId = context.traceId
  logger.info('callGetDepartmentsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetDepartmentsReturn>(`${URLS.departments}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetDepartmentsAPI' })
    return handleErrorResult
  }
}
