import { ReapitConnectSession } from '@reapit/connect-session'
import { getProperties } from '../platform-api/properties-api'
import { getAllPropertyImages } from '../platform-api/property-images-api'

const getProjectorProperties = async (session: ReapitConnectSession, config: any) => {
  const { propertyLimit, departments } = config

  // get all properties using a given criteria
  let properties: any[] = await Promise.all(
    Object.entries(departments).map(async department => {
      const params = buildPropertyUrlSearchParams(config, department)
      return (await getProperties(session as ReapitConnectSession, params.toString()))?._embedded
    }),
  )

  // turn array of property arrays into a single array
  properties = properties.reduce((arr, properties) => arr.concat(properties)).slice(0, propertyLimit)

  // no properties found with criteria
  if (properties.length === 0) {
    throw new Error('NO_PROPERTIES_FOUND')
  }

  const propertyImagesParams = new URLSearchParams()

  properties.forEach(({ id }) => propertyImagesParams.append('propertyId', id))

  // only retrieve photographs
  propertyImagesParams.append('type', 'photograph')

  // only retrieve photographs
  propertyImagesParams.append('sortBy', 'order')

  //get all property images for the properties in filtered array
  const propertyImages = await getAllPropertyImages(session as ReapitConnectSession, propertyImagesParams)

  properties = mergePropertyImagesById(properties, propertyImages).filter(property => property.images !== undefined)

  if (properties.length === 0) {
    throw new Error('NO_PROPERTIES_WITH_IMAGES_FOUND')
  }

  return properties
}

const buildPropertyUrlSearchParams = (
  { minPrice, maxPrice, sortBy, offices, minRent, maxRent, marketingMode, sellingStatuses, lettingStatuses },
  department: any,
) => {
  const params = new URLSearchParams()
  const [departmentId, departmentPropertyTypes]: any = department

  params.append('departmentId', departmentId)

  departmentPropertyTypes.forEach(type => {
    params.append('type', type)
  })

  offices.forEach(id => {
    params.append('officeId', id)
  })

  params.append('sortBy', sortBy)

  marketingMode.forEach(mode => params.append('marketingMode', mode))

  if (marketingMode.includes('selling')) {
    if (minPrice > 0) params.append('priceFrom', minPrice)
    if (maxPrice > 0) params.append('priceTo', maxPrice)
    if (sellingStatuses.length > 0) sellingStatuses.forEach(status => params.append('sellingStatus', status))
  }

  if (marketingMode.includes('letting')) {
    if (minRent > 0) params.append('rentFrom', minRent)
    if (maxRent > 0) params.append('rentTo', maxRent)
    if (lettingStatuses.length > 0) lettingStatuses.forEach(status => params.append('lettingStatus', status))
  }

  return params
}

const mergePropertyImagesById = (properties: any[], propertyImages: any[]) => {
  const propertyImagesFormatted = {}

  propertyImages.forEach(image => {
    if (Array.isArray(propertyImagesFormatted[image.propertyId])) {
      // there should only be a max of 3 images returned
      /*
       * TO DO:
       * The API is returning incorrect image locations. To work around that we have removed "/SBOX" from the URLs.
       * This is not a permenant fix and should be removed once the issue with the API has been resolved.
       */
      if (propertyImagesFormatted[image.propertyId].length === 3) return
      return (propertyImagesFormatted[image.propertyId] = [
        ...propertyImagesFormatted[image.propertyId],
        image.url.replace('/SBOX', ''),
      ])
    } else {
      return (propertyImagesFormatted[image.propertyId] = [image.url.replace('/SBOX', '')])
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
