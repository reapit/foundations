import { getAccessToken } from 'poc-archive/src/utils/get-access-token'
import { PropertyModel, PropertyImageModel } from '@reapit/foundations-ts-definitions'
import { IMAGE_API_URL } from 'poc-archive/src/constants'

export const getPropertyImages = async (result: PropertyModel[]) => {
  const propertyIds = result.map((property: PropertyModel) => property?.id)

  const url = new URL(IMAGE_API_URL)
  url.searchParams.append('propertyIds', propertyIds.join(','))

  const token = await getAccessToken()
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: token,
    },
  })

  const parsedResponse = await response.json()
  if (!parsedResponse._embedded) {
    return {}
  }

  const imageMap: Record<string, PropertyImageModel> = {}
  for (const propertyImage of parsedResponse._embedded) {
    const propertyId = propertyImage?.propertyId || 'invalid'
    imageMap[propertyId] = propertyImage
  }

  return imageMap
}
