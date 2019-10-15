import React from 'react'
import styled from 'styled-components'
import GoogleMapLoader, { RenderProps } from './google-map-loader'
import { PropertyModel } from '../types/schema'
import { Params } from '../utils/query-params'

const MapDiv = styled.div`
  height: 500px;
  width: 500px;
`

const DEFAULT_CENTER = {lat: 51.507325, lng: -0.127716}
const DEFAULT_ZOOM = 8

export type GetContentParams = {
  latitude?: number
  longitude?: number
  address?: string
  qualifier?: string
  sellingPrice?: number
  bedrooms?: number
  bathrooms?: number
  marketingMode?: string
  lettingPrice?: number
  rentFrequency?: string
}

export const getContent = ({ latitude, longitude, address, qualifier, sellingPrice, bedrooms, bathrooms, marketingMode , lettingPrice, rentFrequency }: GetContentParams) => `
  <div style="display:flex;" id="coordinate-${latitude}-${longitude}">
    <div><img src="https://pix5.agoda.net/hotelImages/773/77384/77384_14091113470022048575.jpg?s=100x100"></div>
    <div style="padding: 0rem 1rem;">
      <div style="font-weight:bold;font-size:1rem;">${address}</div>
      ${marketingMode === 'selling' ? (
        `<!-- <div style="color: #00a569;font-weight:bold;font-size:2rem">${qualifier}</div> -->
        <div style="color: #00a569;font-weight:bold;font-size:2rem">£${sellingPrice}</div>`
      ) : (
        `<!-- <div style="color: #00a569;font-weight:bold;font-size:2rem">${rentFrequency}</div> -->
        <div style="color: #00a569;font-weight:bold;font-size:2rem">£${lettingPrice}</div>`
      )}
      <div style="display:flex;justify-content: space-around;">
        <div>
          <span>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bed" class="svg-inline--fa fa-bed fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path fill="currentColor" d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z">
              </path>
            </svg>
          </span>
          <span>${bedrooms}</span>
        </div>
        <div>
          <span>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bath" class="svg-inline--fa fa-bath fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M488 256H80V112c0-17.645 14.355-32 32-32 11.351 0 21.332 5.945 27.015 14.88-16.492 25.207-14.687 59.576 6.838 83.035-4.176 4.713-4.021 11.916.491 16.428l11.314 11.314c4.686 4.686 12.284 4.686 16.971 0l95.03-95.029c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.512-4.512-11.715-4.666-16.428-.491-17.949-16.469-42.294-21.429-64.178-15.365C163.281 45.667 139.212 32 112 32c-44.112 0-80 35.888-80 80v144h-8c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h8v32c0 28.43 12.362 53.969 32 71.547V456c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-8h256v8c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-32.453c19.638-17.578 32-43.117 32-71.547v-32h8c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z">
              </path>
            </svg>
          </span>
          <span>${bathrooms}</span>
        </div>
      </div>
    </div>
  </div>
`

export type HandleUseEffectParams = {
  googleMap: any
  center?: GeoLocation
  zoom?: number
  property?: PropertyModel
  mapRef: any
  restProps?: any
}

export const handleUseEffect = ({ googleMap, center, zoom, restProps, property, mapRef }: HandleUseEffectParams) => () => {
  if(googleMap) {
    const map = new googleMap.Map(document.getElementById('map-container'), {
      center: center || DEFAULT_CENTER,
      zoom: zoom || DEFAULT_ZOOM,
      styles: [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "weight": "2.00"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#9c9c9c"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7b7b7b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8d7d4"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#070707"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
          }
        ],
      ...restProps
    })
    const latitude = property && property.address && property.address.geolocation && property.address.geolocation.latitude
    const longitude = property && property.address && property.address.geolocation && property.address.geolocation.longitude
    const marketingMode = property && property.marketingMode

    mapRef.current = map
    const marker = new googleMap.Marker({
      position: {lat: latitude || DEFAULT_CENTER.lat, lng: longitude|| DEFAULT_CENTER.lng},
      icon: null,
      map
    })
    const address = property && property.address && property.address.line2 ?  property.address.line2 : ''
    const qualifier = property && property.selling && property.selling.qualifier
    const sellingPrice = property && property.selling && property.selling.price

    const lettingPrice = property && property.letting && property.letting.rent
    const rentFrequency = property && property.letting && property.letting.rentFrequency

    const bedrooms = property && property.bedrooms
    const bathrooms = property && property.bathrooms
    const infoWindow = new googleMap.InfoWindow({
      content: getContent({ latitude, longitude, qualifier, sellingPrice, bedrooms, bathrooms, address, marketingMode, lettingPrice, rentFrequency })
    })
    infoWindow.open(map, marker)
  }
}

export type MapContainerProps = {
  googleMap: any
  center?: GeoLocation
  zoom?: number
  property?: PropertyModel
}

export const MapContainer:React.FC<MapContainerProps> = ({ googleMap, center, zoom, property, ...restProps }) => {
  const mapRef = React.useRef(null)
  React.useEffect(handleUseEffect({googleMap, zoom, center, mapRef, restProps, property}), [googleMap, restProps, center, zoom, property])
  return <MapDiv id="map-container"/>
}

export type RenderMapParams = {
  property?: PropertyModel
  zoom?: number
  center?: GeoLocation
}

export const renderMap = ({ property, zoom, center }: RenderMapParams) => ({ googleMap, error }: RenderProps) => {
  if(error) {
    return <div>{error}</div>
  }
return <MapContainer googleMap={googleMap} property={property} zoom={zoom} center={center} />
}

export type GeoLocation = {
  lat: number
  lng: number
}

export type GoogleMapProps = {
  params: Params
  property?: PropertyModel
  zoom?: number
  center?: GeoLocation
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ params, property, zoom, center }) => {
  return(
    <GoogleMapLoader
      params={params}
      render={renderMap({ property, zoom, center})}
    />
  )
}

export default GoogleMap