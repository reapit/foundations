import DataLoader from 'dataloader'
import { getProperties } from './services'
import { ServerContext } from '@/index'
import { PropertyModel, PagedResultPropertyModel_ } from '@/types'
import logger from '@/logger'
import handleError from '@/utils/handle-error'

export const generatePropertyBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  logger.info('generatePropertyBatchLoaderFn', { traceId })
  try {
    const propertiesResult = (await getProperties({ id: keys }, context)) as PagedResultPropertyModel_
    const result = keys.map((key: string) => {
      return propertiesResult?._embedded?.find((property: PropertyModel) => property.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generatePropertyBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generatePropertyLoader = (context: ServerContext) => new DataLoader(generatePropertyBatchLoaderFn(context))
