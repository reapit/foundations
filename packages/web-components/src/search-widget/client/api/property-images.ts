import { PropertyModel, PropertyImageModel, PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'

export const getPropertyImages = async (
  result: PropertyModel[],
  apiKey: string,
): Promise<Record<string, PropertyImageModel>> => {
  const propertyIds = result.map((property: PropertyModel) => property?.id)

  const url = new URL(`${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET as string}/propertyimages`)
  url.searchParams.append('propertyIds', propertyIds.join(','))

  const response = await fetcher<PagedResultPropertyImageModel_, null>({
    url: String(url),
    headers: getClientHeaders(apiKey),
  })

  if (response && response._embedded) {
    const imageMap: Record<string, PropertyImageModel> = {}
    for (const propertyImage of response._embedded) {
      const propertyId = propertyImage?.propertyId || 'invalid'
      imageMap[propertyId] = propertyImage
    }

    return imageMap
  }
  return {} as Record<string, PropertyImageModel>
}
