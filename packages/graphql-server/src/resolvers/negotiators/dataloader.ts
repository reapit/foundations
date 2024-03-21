import DataLoader from 'dataloader'
import { getNegotiators } from './services'
import { ServerContext } from '../../utils'
import handleError from '../../utils/handle-error'
import { NegotiatorModelPagedResult, NegotiatorModel } from '@reapit/foundations-ts-definitions'

export const generateNegotiatorBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const negotiatorsResult = (await getNegotiators({ id: keys }, context)) as NegotiatorModelPagedResult
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
