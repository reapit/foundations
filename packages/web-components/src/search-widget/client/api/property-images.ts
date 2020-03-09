import { PropertyModel, PropertyImageModel, PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { API_BASE_URL } from './constants'

export const getPropertyImages = async (
  properties: PropertyModel[],
  apiKey: string,
): Promise<Record<string, PropertyImageModel>> => {
  const propertyIds = properties.map((property: PropertyModel) => {
    if (property.id) {
      return property.id
    }
  }) as string[]

  const url = new URL(`${API_BASE_URL}/propertyimages`)

  const response = await fetcher<PagedResultPropertyImageModel_, { propertyIds: string[] }>({
    url: String(url),
    headers: getClientHeaders(apiKey),
    body: {
      propertyIds,
    },
  })

  if (response && response._embedded) {
    const imageMap: Record<string, PropertyImageModel> = {}
    for (const propertyImage of response._embedded) {
      const propertyId = propertyImage.propertyId || 'invalid'
      imageMap[propertyId] = propertyImage
    }

    return imageMap
  }
  return {} as Record<string, PropertyImageModel>
}
