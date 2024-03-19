import DataLoader from 'dataloader'
import { getConveyancing } from './services'
import { ServerContext } from '../../utils'
import { ConveyancingModel, ConveyancingModelPagedResult } from '@reapit/foundations-ts-definitions'
import handleError from '../../utils/handle-error'

export const generateConveyancingBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const conveyancingResult = (await getConveyancing({ id: keys }, context)) as ConveyancingModelPagedResult
    const result = keys.map((key: string) => {
      return (conveyancingResult?._embedded ?? []).find((conveyancing: ConveyancingModel) => conveyancing.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateConveyancingBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateConveyancingLoader = (context: ServerContext) =>
  new DataLoader(generateConveyancingBatchLoaderFn(context))
