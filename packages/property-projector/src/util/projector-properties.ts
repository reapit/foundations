import { ReapitConnectSession } from '@reapit/connect-session'
import { getProperties } from '../platform-api/properties-api'
import { getAllPropertyImages } from '../platform-api/property-images-api'

const getProjectorProperties = async (session: ReapitConnectSession, config: any) => {
  const { departments } = config

  // get all properties using a given criteria
  let properties: any[] = await Promise.all(
    departments.map(async department => {
      const params = buildPropertyUrlSearchParams(config, department)
      return (await getProperties(session as ReapitConnectSession, params.toString()))?._embedded
    }),
  )

  // turn array of property arrays into a single array
  properties = properties.reduce((arr, properties) => arr.concat(properties))

  // no properties found with criteria
  if (properties.length === 0) {
    throw new Error('NO_PROPERTIES_FOUND')
  }

  const propertyImagesParams = new URLSearchParams()

  properties.forEach(({ id }) => propertyImagesParams.append('propertyId', id))

  //get all property images for the properties in filtered array
  const propertyImages = await getAllPropertyImages(session as ReapitConnectSession, propertyImagesParams)

  return mergePropertyImagesById(properties, propertyImages)
}

const buildPropertyUrlSearchParams = ({ minPrice, maxPrice, sortBy, offices, minRent, maxRent }, department: any) => {
  const params = new URLSearchParams()
  const [departmentId, departmentPropertyTypes]: any = Object.entries(department)[0]

  params.append('departmentId', departmentId)

  departmentPropertyTypes.forEach(type => {
    params.append('type', type)
  })

  offices.forEach(id => {
    params.append('officeId', id)
  })

  params.append('sortBy', sortBy)

  if (minPrice > 0) params.append('priceFrom', minPrice)

  if (maxPrice > 0) params.append('priceTo', maxPrice)

  if (minRent > 0) params.append('rentFrom', minRent)

  if (maxRent > 0) params.append('rentTo', maxRent)

  return params
}

const mergePropertyImagesById = (properties: any[], propertyImages: any[]) => {
  const propertyImagesFormatted = {}

  propertyImages.forEach(image => {
    if (Array.isArray(propertyImagesFormatted[image.propertyId])) {
      return (propertyImagesFormatted[image.propertyId] = [...propertyImagesFormatted[image.propertyId], image.url])
    } else {
      return (propertyImagesFormatted[image.propertyId] = [image.url])
    }
  })

  return properties.map(property => {
    if (propertyImagesFormatted[property.id] !== undefined) {
      return {
        ...property,
        images: propertyImagesFormatted[property.id],
      }
    }
    return property
  })
}

export default getProjectorProperties
