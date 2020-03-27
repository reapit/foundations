import { PropertyModel, PropertyImageModel, PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'

export const getPropertyQuery = (properties: PropertyModel[]) =>
  properties
    .map((property: PropertyModel) => {
      if (property.id) {
        return property.id
      }
    })
    .reduce((prev, next, index) => `${prev}${index ? '&' : '?'}propertyId=${next}`, '')

export const getPropertyImages = async (
  properties: PropertyModel[],
  apiKey: string,
): Promise<Record<string, PropertyImageModel>> => {
  const propertyQuery = getPropertyQuery(properties)
  const response = await fetcher<PagedResultPropertyImageModel_, null>({
    url: `${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET}/propertyImages/${propertyQuery}`,
    headers: getClientHeaders(apiKey),
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
