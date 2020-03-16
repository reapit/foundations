import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { INVALID_BACKGROUND_AS_BASE64, DEFAULT_CENTER } from './constants'
import { SearchType } from '../../search-widget/client/core/store'

export const getLatLng = (property: PropertyModel) => {
  const latitude = property?.address?.geolocation?.latitude
  const longitude = property?.address?.geolocation?.longitude
  return {
    latitude,
    longitude,
  }
}

export type GetContentParams = {
  latitude?: number
  longitude?: number
  address: {
    line1: string
    line2: string
  }
  bedrooms?: number
  bathrooms?: number
  marketingMode?: string
  lettingPrice?: number
  rentFrequency?: string
  imageUrl?: string
  price: string
}

export const getContent = ({
  price,
  latitude,
  longitude,
  address,
  bedrooms,
  bathrooms,
  marketingMode,
  imageUrl = INVALID_BACKGROUND_AS_BASE64,
}: GetContentParams) => `
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
            <svg style="width:20px; height:20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bed" class="svg-inline--fa fa-bed fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path fill="currentColor" d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 \
              80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 \
              80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 \
              16-7.16 16-16V240c0-61.86-50.14-112-112-112z">
              </path>
            </svg>
          </span>
          <div>${bedrooms}</div>
        </div>
        <div>
          <span style="color: gray">
            <svg style="width:20px; height:20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bath" class="svg-inline--fa fa-bath fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M488 256H80V112c0-17.645 14.355-32 32-32 11.351 0 21.332 \
              5.945 27.015 14.88-16.492 25.207-14.687 59.576 6.838 83.035-4.176 4.713-4.021 11.916.491 \
              16.428l11.314 11.314c4.686 4.686 12.284 4.686 16.971 0l95.03-95.029c4.686-4.686 4.686-12.284 \
              0-16.971l-11.314-11.314c-4.512-4.512-11.715-4.666-16.428-.491-17.949-16.469-42.294-21.429-64\
              .178-15.365C163.281 45.667 139.212 32 112 32c-44.112 0-80 35.888-80 80v144h-8c-13.255 0-24 10.745-24 \
              24v16c0 13.255 10.745 24 24 24h8v32c0 28.43 12.362 53.969 32 71.547V456c0 13.255 10.745 24 24 \
              24h16c13.255 0 24-10.745 24-24v-8h256v8c0 13.255 10.745 24 24 24h16c13.255 0 \
              24-10.745 24-24v-32.453c19.638-17.578 32-43.117 32-71.547v-32h8c13.255 0 24-10.745 \
              24-24v-16c0-13.255-10.745-24-24-24z">
              </path>
            </svg>
          </span>
          <div>${bathrooms}</div>
        </div>
      </div>
    </div>
  </div>
`

export type CreateMarkerParams = {
  property: PropertyModel
  map: google.maps.Map
  imageUrl?: string
  infoWindows: google.maps.InfoWindow[]
  propertyImages: any
  searchType: SearchType
}

export const createMarker = ({ property, map, infoWindows, propertyImages, searchType }: CreateMarkerParams) => {
  if (property) {
    let imageUrl = INVALID_BACKGROUND_AS_BASE64
    if (property) {
      const propertyId = property?.id
      const propertyImage = propertyId && propertyImages ? propertyImages[propertyId] : {}
      if (propertyImage?.url) {
        imageUrl = propertyImage.url
      }
    }
    let price = ''
    if (searchType) {
      price = getPrice(property, searchType)
    }
    const { latitude, longitude } = getLatLng(property)
    const marketingMode = property && property.marketingMode
    const marker = new google.maps.Marker({
      position: {
        lat: latitude || DEFAULT_CENTER.lat,
        lng: longitude || DEFAULT_CENTER.lng,
      },
      map,
    })
    const address = {
      line1: property?.address?.line1 || '',
      line2: property?.address?.line2 || '',
    }
    const lettingPrice = property?.letting?.rent
    const rentFrequency = property?.letting?.rentFrequency

    const bedrooms = property && property.bedrooms
    const bathrooms = property && property.bathrooms
    const infoWindow = new google.maps.InfoWindow({
      content: getContent({
        price,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        address,
        marketingMode,
        lettingPrice,
        rentFrequency,
        imageUrl,
      }),
    })
    google.maps.event.addListener(marker, 'click', () => {
      if (infoWindows?.length > 0) {
        infoWindows.forEach((item: google.maps.InfoWindow) => {
          item.close()
        })
      }
      infoWindow.open(map, marker)
    })
    return { marker, infoWindow }
  }
  return null
}

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
})

export const getPrice = (result: PropertyModel, searchType: SearchType) => {
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
