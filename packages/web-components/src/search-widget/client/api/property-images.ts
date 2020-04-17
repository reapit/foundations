import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { PickedPagedResultPropertyImageModel_, PickedPropertyImageModel, PickedPropertyModel } from '../../types'

export const getPropertyQuery = (properties: PickedPropertyModel[]) =>
  properties
    .map((property: PickedPropertyModel) => {
      if (property.id) {
        return property.id
      }
    })
    .reduce((prev, next, index) => `${prev}${index ? '&' : '?'}propertyId=${next}`, '')

export const getPropertyImages = async (
  properties: PickedPropertyModel[],
  apiKey: string,
): Promise<Record<string, PickedPropertyImageModel[]>> => {
  const propertyQuery = getPropertyQuery(properties)
  const response = await fetcher<PickedPagedResultPropertyImageModel_, null>({
    url: `${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET}/propertyImages/${propertyQuery}`,
    headers: getClientHeaders(apiKey),
  })

  if (response && response._embedded) {
    const imageMap: Record<string, PickedPropertyImageModel[]> = {}
    for (const propertyImage of response._embedded) {
      const propertyId = propertyImage.propertyId || 'invalid'
      if (imageMap[propertyId]) {
        imageMap[propertyId].push(propertyImage)
      } else {
        imageMap[propertyId] = [propertyImage]
      }
    }

    return imageMap
  }
  return {} as Record<string, PickedPropertyImageModel[]>
}
