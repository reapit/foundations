import DataLoader from 'dataloader'
import { getPropertyImages } from './services'
import { PropertyImageModel, PropertyImageModelPagedResult } from '@reapit/foundations-ts-definitions'
import { ServerContext } from '../../utils'
import handleError from '../../utils/handle-error'

export const generatePropertyImageBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const propertyImagesResult = (await getPropertyImages({ id: keys }, context)) as PropertyImageModelPagedResult
    const result = keys.map((key: string) => {
      return (propertyImagesResult?._embedded ?? []).find((property: PropertyImageModel) => property.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generatePropertyImageBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generatePropertyImageLoader = (context: ServerContext) =>
  new DataLoader(generatePropertyImageBatchLoaderFn(context))
