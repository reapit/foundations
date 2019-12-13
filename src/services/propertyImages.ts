import {
  PropertyModel,
  PagedResultPropertyImageModel_,
  PropertyImageModel
} from '@reapit/foundations-ts-definitions'
import { IMAGE_API_URL } from '@/constants'

export const getPropertyImages = async (result: PropertyModel[]) => {
  const propertyIds = result.map(
    (property: PropertyModel) => property && property.id
  )

  const url = new URL(IMAGE_API_URL)
  url.searchParams.append('propertyIds', propertyIds.join(','))

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: process.env.API_KEY
    }
  })

  const parsedResponse: PagedResultPropertyImageModel_ = await response.json()
  if (!parsedResponse.data) {
    return {}
  }

  const imageMap: Record<string, PropertyImageModel> = {}
  for (const propertyImage of parsedResponse.data) {
    const propertyId = (propertyImage && propertyImage.id) || 'invalid'
    imageMap[propertyId] = propertyImage
  }

  return imageMap
}
