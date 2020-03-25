import { PropertyModel, PropertyImageModel } from '@reapit/foundations-ts-definitions'
import { INVALID_BACKGROUND_AS_BASE64, DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../common/utils/constants'
import { loader } from '../../../common/utils/loader'

export const getLatLng = (property: PropertyModel) => {
  const latitude = property?.address?.geolocation?.latitude ?? DEFAULT_CENTER.lat
  const longitude = property?.address?.geolocation?.longitude ?? DEFAULT_CENTER.lng
  return {
    latitude,
    longitude,
  }
}

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
})

export const getPrice = (result: PropertyModel, searchType: 'Sale' | 'Rent') => {
  if (searchType === 'Rent') {
    const rent = result?.letting?.rent || 0
    const formattedPrice = currencyFormatter.format(rent)
    let rentFrequency = result?.letting?.rentFrequency || ''
    if (rentFrequency.length > 0) {
      rentFrequency = rentFrequency.charAt(0).toUpperCase() + rentFrequency.substr(1, rentFrequency.length - 1)
    }
    return `${formattedPrice} ${rentFrequency}`
  }

  const price = result?.selling?.price || 0
  const qualifier = result?.selling?.qualifier || ''
  return formatPriceAndQuantifier(price, qualifier)
}

export const formatPriceAndQuantifier = (price: number, quantifier: string) => {
  const formattedPrice = currencyFormatter.format(price)
  switch (quantifier) {
    case 'askingPrice':
      return formattedPrice
    case 'priceOnApplication':
      return 'POA'
    case 'guidePrice':
      return `Guide Price ${formattedPrice}`
    case 'offersInRegion':
      return `OIRO ${formattedPrice}`
    case 'offersOver':
      return `Offers Over ${formattedPrice}`
    case 'offersInExcess':
      return `OIEO ${formattedPrice}`
    case 'fixedPrice':
      return `Fixed Price ${formattedPrice}`
    case 'priceReducedTo':
      return formattedPrice
    default:
      return price + ' ' + quantifier
  }
}

export const centerMapToMarker = (selectedProperty: PropertyModel, map: google.maps.Map): void => {
  const { latitude, longitude } = getLatLng(selectedProperty)
  const centerPoint = new google.maps.LatLng(latitude, longitude)
  map.setCenter(centerPoint)
  map.setZoom(DEFAULT_ZOOM)
}

export const fitMapToBounds = (properties: PropertyModel[], map: google.maps.Map): void => {
  const bounds = new google.maps.LatLngBounds()
  properties.forEach(property =>
    bounds.extend({
      lat: property?.address?.geolocation?.latitude || DEFAULT_CENTER.lat,
      lng: property?.address?.geolocation?.longitude || DEFAULT_CENTER.lng,
    }),
  )
  map.fitBounds(bounds)
}

export const loadMap = (mapElement: HTMLDivElement): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const getMap = () => {
      const map = new google.maps.Map(mapElement, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      })
      if (map) {
        return resolve(map)
      }
      return reject('Map not loaded')
    }

    const url = [
      `//maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=onMapReady`,
    ].join('')

    Object.defineProperty(window, 'onMapReady', {
      value: getMap,
    })

    loader(url, () => {
      console.log('maps loaded')
      return {}
    })
  }).catch(err => {
    console.error(err)
  })
}

export const getInfoWindow = (
  selectedProperty: PropertyModel,
  searchType: 'Sale' | 'Rent',
  propertyImages: Record<string, PropertyImageModel>,
) => {
  const propertyImage = selectedProperty?.id && propertyImages ? propertyImages[selectedProperty?.id] : {}
  const imageUrl = propertyImage?.url ?? INVALID_BACKGROUND_AS_BASE64
  const price = getPrice(selectedProperty, searchType)
  const { latitude, longitude } = getLatLng(selectedProperty)
  const marketingMode = selectedProperty && selectedProperty.marketingMode
  const address = {
    line1: selectedProperty?.address?.line1 || '',
    line2: selectedProperty?.address?.line2 || '',
  }
  const bedrooms = selectedProperty?.bedrooms
  const bathrooms = selectedProperty?.bathrooms

  return new google.maps.InfoWindow({
    content: `
      <div style="display:flex; font-family: 'Open Sans', sans-serif" id="coordinate-${latitude}-${longitude}">
        <div><img style="width: 110px; height: 110px; object-fit: cover" src="${imageUrl}"></div>
        <div style="padding: 0rem 1rem;">
          <div style="margin-bottom: 2px; font-weight:bold;font-size:1rem; color: #12263f">${address.line1}</div>
          <div style="margin-bottom: 2px; font-size:1rem; color: #12263f">${address.line2}</div>
          ${
            marketingMode === 'selling'
              ? `<div style="color: #887d97;font-weight:bold;font-size:1rem">${price}</div>`
              : `<div style="color: #887d97;font-weight:bold;font-size:1rem">${price}</div>`
          }
          <div style="display:flex; margin-top: 2px">
            <div style="margin-right: 1.2rem">
              <span style="color: gray">
                icon TBC
              </span>
              <div>${bedrooms}</div>
            </div>
            <div>
              <span style="color: gray">
                icon TBC
              </span>
              <div>${bathrooms}</div>
            </div>
          </div>
        </div>
      </div>
    `,
  })
}

export const getMarker = (property: PropertyModel, map: google.maps.Map) => {
  const { latitude, longitude } = getLatLng(property)
  return new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude,
    },
    map,
  })
}
