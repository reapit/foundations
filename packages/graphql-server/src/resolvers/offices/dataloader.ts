import DataLoader from 'dataloader'
import { getOffices } from './services'
import { ServerContext } from '../../utils'
import handleError from '../../utils/handle-error'
import { OfficeModelPagedResult, OfficeModel } from '@reapit/foundations-ts-definitions'

export const generateOfficeBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const officesResult = (await getOffices({ id: keys }, context)) as OfficeModelPagedResult
    const result = keys.map((key: string) => {
      return (officesResult?._embedded ?? []).find((office: OfficeModel) => office.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateOfficeBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateOfficeLoader = (context: ServerContext) => new DataLoader(generateOfficeBatchLoaderFn(context))
