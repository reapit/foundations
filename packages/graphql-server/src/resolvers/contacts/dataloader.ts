import DataLoader from 'dataloader'
import { getContacts } from './services'
import { ServerContext } from '../../utils'
import handleError from '../../utils/handle-error'
import { ContactModel, ContactModelPagedResult } from '@reapit/foundations-ts-definitions'

export const generateContactBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const contactsResult = (await getContacts({ id: keys }, context)) as ContactModelPagedResult
    const result = keys.map((key: string) => {
      return (contactsResult?._embedded ?? []).find((negotiator: ContactModel) => negotiator.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateContactBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateContactLoader = (context: ServerContext) => new DataLoader(generateContactBatchLoaderFn(context))
