import DataLoader from 'dataloader'
import { getNegotiators } from './services'
import { ServerContext } from '@/index'
import logger from '@/logger'
import handleError from '@/utils/handle-error'
import { PagedResultNegotiatorModel_, NegotiatorModel } from '@/types'

export const generateNegotiatorBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  logger.info('generateNegotiatorBatchLoaderFn', { traceId })
  try {
    const negotiatorsResult = (await getNegotiators({ id: keys }, context)) as PagedResultNegotiatorModel_
    const result = keys.map((key: string) => {
      return (negotiatorsResult?._embedded ?? []).find((negotiator: NegotiatorModel) => negotiator.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateNegotiatorBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateNegotiatorLoader = (context: ServerContext) =>
  new DataLoader(generateNegotiatorBatchLoaderFn(context))
