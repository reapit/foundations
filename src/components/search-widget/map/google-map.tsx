import React from 'react'
import { INVALID_BACKGROUND_AS_BASE64 } from '../constants'
import { context } from '../context'
import styled from 'styled-components'
import GoogleMapLoader, { RenderProps } from './google-map-loader'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { Params } from '../utils/query-params'
import { Theme } from '../theme'
import { getPrice } from '../search-result'
import { mapStyles } from './map-style'
import { SearchStore } from '../hooks/search-store'

const { useContext } = React

const MapDiv = styled.div`
  min-height: 500px;
  @media screen and (max-width: 1600px) {
    & {
      height: 500px;
    }
  }

  width: 100%;
  height: 100%;
`

const DEFAULT_CENTER = { lat: 51.507325, lng: -0.127716 }
const DEFAULT_ZOOM = 15

export type MarkersRef = {
  current: google.maps.Marker[]
}

export type MapRef = {
  current: google.maps.Map
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
  theme: Theme
  price: string
}

export const getContent = ({
  price,
  theme,
  latitude,
  longitude,
  address,
  bedrooms,
  bathrooms,
  marketingMode,
  imageUrl = INVALID_BACKGROUND_AS_BASE64
}: GetContentParams) => `
  <div style="display:flex; font-family: ${
    theme.base.font.family
  }" id="coordinate-${latitude}-${longitude}">
    <div><img style="width: 110px; height: 110px; object-fit: cover" src="${imageUrl}"></div>
    <div style="padding: 0rem 1rem;">
      <div style="margin-bottom: 2px; font-weight:bold;font-size:1rem; color: ${
        theme.colors.base
      }">${address.line1}</div>
      <div style="margin-bottom: 2px; font-size:1rem; color: ${
        theme.colors.base
      }">${address.line2}</div>
      ${
        marketingMode === 'selling'
          ? `<div style="color: ${theme.colors.primary};font-weight:bold;font-size:1rem">${price}</div>`
          : `<div style="color: ${theme.colors.primary};font-weight:bold;font-size:1rem">${price}</div>`
      }
      <div style="display:flex; margin-top: 2px">
        <div style="margin-right: 1.2rem">
          <span style="color: ${theme.colors.icon}">
            <svg style="width:20px; height:20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bed" class="svg-inline--fa fa-bed fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path fill="currentColor" d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z">
              </path>
            </svg>
          </span>
          <div>${bedrooms}</div>
        </div>
        <div>
          <span style="color: ${theme.colors.icon}">
            <svg style="width:20px; height:20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bath" class="svg-inline--fa fa-bath fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M488 256H80V112c0-17.645 14.355-32 32-32 11.351 0 21.332 5.945 27.015 14.88-16.492 25.207-14.687 59.576 6.838 83.035-4.176 4.713-4.021 11.916.491 16.428l11.314 11.314c4.686 4.686 12.284 4.686 16.971 0l95.03-95.029c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.512-4.512-11.715-4.666-16.428-.491-17.949-16.469-42.294-21.429-64.178-15.365C163.281 45.667 139.212 32 112 32c-44.112 0-80 35.888-80 80v144h-8c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h8v32c0 28.43 12.362 53.969 32 71.547V456c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-8h256v8c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-32.453c19.638-17.578 32-43.117 32-71.547v-32h8c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z">
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
  googleMap: any
  map: google.maps.Map
  searchStore: SearchStore
  theme: Theme
  imageUrl?: string
  infoWindows: google.maps.InfoWindow[]
}

export const getLatLng = (property: PropertyModel) => {
  const latitude =
    property.address &&
    property.address.geolocation &&
    property.address.geolocation.latitude
  const longitude =
    property.address &&
    property.address.geolocation &&
    property.address.geolocation.longitude
  return {
    latitude,
    longitude
  }
}

export const createMarker = ({
  property,
  googleMap,
  map,
  searchStore,
  theme,
  infoWindows
}: CreateMarkerParams) => {
  if (property) {
    let imageUrl = INVALID_BACKGROUND_AS_BASE64
    if (searchStore && property) {
      const propertyId = property && property.id
      const propertyImage = propertyId
        ? searchStore.propertyImages[propertyId]
        : ''
      if (propertyImage && propertyImage.url) {
        imageUrl = propertyImage.url
      }
    }
    let price = ''
    if (searchStore && searchStore.searchType) {
      price = getPrice(property, searchStore.searchType)
    }
    const { latitude, longitude } = getLatLng(property)
    const marketingMode = property && property.marketingMode
    const marker = new googleMap.Marker({
      position: {
        lat: latitude || DEFAULT_CENTER.lat,
        lng: longitude || DEFAULT_CENTER.lng
      },
      icon: null,
      map
    })
    const address = {
      line1:
        property && property.address && property.address.line1
          ? property.address.line1
          : '',
      line2:
        property && property.address && property.address.line2
          ? property.address.line2
          : ''
    }
    const lettingPrice = property && property.letting && property.letting.rent
    const rentFrequency =
      property && property.letting && property.letting.rentFrequency

    const bedrooms = property && property.bedrooms
    const bathrooms = property && property.bathrooms
    const infoWindow = new googleMap.InfoWindow({
      content: getContent({
        price,
        theme,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        address,
        marketingMode,
        lettingPrice,
        rentFrequency,
        imageUrl
      })
    })
    googleMap.event.addListener(marker, 'click', () => {
      if (infoWindows && infoWindows.length > 0) {
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

export type ClearMapParams = {
  markersRef: MarkersRef
}

export const clearMap = ({ markersRef }: ClearMapParams) => {
  if (markersRef && markersRef.current) {
    markersRef.current.forEach((marker: google.maps.Marker) =>
      marker.setMap(null)
    )
  }
}

export type GetCurrentMarkerIndexParams = {
  markersRef: MarkersRef
  centerPoint: google.maps.LatLng
}

export const getCurrentMarkerIndex = ({
  markersRef,
  centerPoint
}: GetCurrentMarkerIndexParams) => {
  const markers = markersRef.current
  if (!markersRef || !centerPoint || !markers || markers.length < 1) {
    return null
  }
  const latitude = centerPoint.lat()
  const longitude = centerPoint.lng()
  for (let i = 0; i < markers.length; i++) {
    const position: google.maps.LatLng =
      markers && markers[i] && markers[i].getPosition()
    if (
      position &&
      position.lat() === latitude &&
      position.lng() === longitude
    ) {
      return i
    }
  }
  return null
}

export type HandleUseEffectParams = {
  googleMap: any
  mapRef: MapRef
  theme: Theme | null
  searchStore: any
  markersRef: MarkersRef
  center?: google.maps.LatLngLiteral
  zoom?: number
  property?: PropertyModel
  properties?: PropertyModel[]
  restProps?: any
}

export const handleUseEffect = ({
  searchStore,
  googleMap,
  center,
  zoom,
  restProps,
  property,
  mapRef,
  theme,
  properties,
  markersRef
}: HandleUseEffectParams) => () => {
  if (googleMap && theme) {
    const map = new googleMap.Map(
      document.getElementById('reapit-map-container'),
      {
        center: center || DEFAULT_CENTER,
        zoom: zoom || DEFAULT_ZOOM,
        styles: mapStyles,
        ...restProps
      }
    )
    mapRef.current = map
    const markers: any[] = []
    const infoWindows: any[] = []
    if (properties) {
      clearMap({ markersRef })
      properties.forEach(property => {
        const newMarker = createMarker({
          property,
          googleMap,
          map,
          theme,
          searchStore,
          infoWindows
        })
        markers.push(newMarker && newMarker.marker)
        infoWindows.push(newMarker && newMarker.infoWindow)
      })
      markersRef.current = markers
    }
    if (properties && !property) {
      const bounds = new googleMap.LatLngBounds()
      markers.forEach(marker => bounds.extend(marker.getPosition()))
      map.fitBounds(bounds)
      return
    }
    if (property) {
      const { latitude, longitude } = getLatLng(property) as {
        latitude: number
        longitude: number
      }
      const centerPoint = new googleMap.LatLng(latitude, longitude)
      const currentMarkerIndex = getCurrentMarkerIndex({
        markersRef,
        centerPoint
      })
      map.setCenter(centerPoint)
      map.setZoom(DEFAULT_ZOOM)
      const FIRST_INFO_WINDOW_INDEX = 0
      if (
        currentMarkerIndex ||
        currentMarkerIndex === FIRST_INFO_WINDOW_INDEX
      ) {
        infoWindows[currentMarkerIndex].open(map, markers[currentMarkerIndex])
      }
      return
    }
  }
}

export type MapContainerProps = {
  googleMap: any
  center?: google.maps.LatLngLiteral
  zoom?: number
  property?: PropertyModel
  properties?: PropertyModel[]
}

export const MapContainer: React.FC<MapContainerProps> = ({
  googleMap,
  center,
  zoom,
  property,
  properties,
  ...restProps
}) => {
  const mapRef = React.useRef() as MapRef
  const markersRef = React.useRef() as MarkersRef
  const contextValue = useContext(context)
  const searchStore = useContext(context)
  React.useEffect(
    handleUseEffect({
      searchStore,
      googleMap,
      zoom,
      center,
      mapRef,
      markersRef,
      restProps,
      property,
      properties,
      theme: contextValue ? contextValue.theme : null
    }),
    [googleMap, center, zoom, property, properties]
  )

  if (!contextValue) {
    return null
  }
  return <MapDiv id="reapit-map-container"></MapDiv>
}

export type RenderMapParams = {
  property?: PropertyModel
  properties?: PropertyModel[]
  zoom?: number
  center?: google.maps.LatLngLiteral
}

export const renderMap = ({
  property,
  zoom,
  center,
  properties
}: RenderMapParams) => ({ googleMap, error }: RenderProps) => {
  if (error) {
    return <div>{error}</div>
  }
  return (
    <MapContainer
      googleMap={googleMap}
      property={property}
      properties={properties}
      zoom={zoom}
      center={center}
    />
  )
}

export type GoogleMaType = {
  params: Params
  property?: PropertyModel
  properties?: PropertyModel[]
  zoom?: number
  center?: google.maps.LatLngLiteral
}

export const GoogleMap: React.FC<GoogleMaType> = ({
  params,
  property,
  zoom,
  center,
  properties
}) => {
  return (
    <GoogleMapLoader
      params={params}
      render={renderMap({ property, zoom, center, properties })}
    />
  )
}

export default GoogleMap
