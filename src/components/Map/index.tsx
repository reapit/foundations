import React from 'react'
import GoogleMap from 'react-google-map'
import ReactGoogleMapLoader from 'react-google-maps-loader'
import currentLocationIcon from './current-location-icon.svg'

export type MarkerProps<T> = T & {
  lat: number
  lng: number
}

export type GoogleMapProps<T> = {
  autoFitBounds?: boolean
  boundsOffset?: number
  coordinates?: {
    onLoaded: Function
  }[]
  googleMaps: {}
  onLoaded?: Function | null
  defaultCenter: MarkerProps<{}>
  defaultZoom: number
  markers: MarkerProps<T>[]
}

export const handleOnClickMarker = (infoWindow, map, marker, markerItem) => () => {
  infoWindow.open(map, marker)
  const markerInfoWindow = document.getElementById(`marker-${markerItem.lat}-${markerItem.lng}`)
  if (markerInfoWindow) {
    markerInfoWindow.style.display = 'block'
  }
}

export const renderMarkers = ({ markers, googleMaps, map, defaultCenter }) => {
  const newMarkers: any[] = []
  const bounds = new googleMaps.LatLngBounds()
  markers.forEach((markerItem: MarkerProps<{ title?: string }>, index: number) => {
    const label = {
      text: String(index + 1),
      fontSize: '1.5rem',
      fontWeight: '500'
    }
    const newMarker = new googleMaps.Marker({
      position: {
        lat: markerItem.lat,
        lng: markerItem.lng
      },
      title: markerItem.title || '',
      map,
      label
    })
    const infoWindow = new googleMaps.InfoWindow({
      content: document.getElementById(`marker-${markerItem.lat}-${markerItem.lng}`)
    })
    googleMaps.event.addListener(newMarker, 'click', handleOnClickMarker(infoWindow, map, newMarker, markerItem))
    bounds.extend(newMarker.getPosition())
    newMarkers.push(newMarker)
  })
  if (!defaultCenter) {
    map.setCenter(bounds.getCenter())
  }
  return newMarkers
}

export const renderDirection = ({
  googleMaps,
  position,
  destinationPoint,
  map,
  travelMode,
  markers,
  currentLocation,
  onLoadedDirection
}) => {
  const directionsService = new googleMaps.DirectionsService()
  const directionsRenderer = new googleMaps.DirectionsRenderer()
  directionsRenderer.setMap(map)
  const origin = new googleMaps.LatLng(position.coords.latitude, position.coords.longitude)
  const destination = new googleMaps.LatLng(destinationPoint.lat, destinationPoint.lng)
  directionsService.route(
    {
      origin,
      destination,
      travelMode
    },
    function(response, status) {
      if (status === 'OK') {
        currentLocation.setMap(null)
        markers.forEach(item => item.setMap(null))
        if (onLoadedDirection) {
          onLoadedDirection(response)
        }
        directionsRenderer.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status)
      }
    }
  )
}

export const successCallBack = ({
  markers,
  destinationPoint,
  travelMode,
  googleMaps,
  map,
  onLoadedDirection,
  defaultCenter
}) => (position: Position) => {
  const currentLocation = new googleMaps.Marker({
    position: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    icon: {
      url: currentLocationIcon,
      scaledSize: new googleMaps.Size(20, 20)
    },
    map
  })
  const newMarkers = renderMarkers({ markers, googleMaps, map, defaultCenter })
  if (destinationPoint) {
    renderDirection({
      googleMaps,
      position,
      destinationPoint,
      travelMode,
      currentLocation,
      onLoadedDirection,
      markers: newMarkers,
      map
    })
  }
}

export const onLoadedMapHandler = ({
  markers,
  destinationPoint,
  travelMode,
  onLoaded,
  onLoadedDirection,
  defaultCenter
}) => (googleMaps, map) => {
  map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successCallBack({ markers, destinationPoint, travelMode, googleMaps, map, onLoadedDirection, defaultCenter })
    )
  }
  if (onLoaded) {
    onLoaded({ googleMaps, map })
  }
}

export const renderMarkerContent = (markers: MarkerProps<any>[] = [], component: any) => {
  const Component = component
  return markers.map((markerItem: MarkerProps<{}>) => {
    return (
      <div
        key={`marker-${markerItem.lat}-${markerItem.lng}`}
        id={`marker-${markerItem.lat}-${markerItem.lng}`}
        style={{ display: 'none' }}
      >
        <Component marker={markerItem} />
      </div>
    )
  })
}

export type renderHandlerParams = {
  markers: MarkerProps<any>[]
  component: any
  defaultCenter?: MarkerProps<{}>
  defaultZoom?: number
  autoFitBounds?: boolean
  boundsOffset?: number
  travelMode?: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT'
  destinationPoint?: MarkerProps<any>
  onLoaded?: (params: any) => void
  onLoadedDirection?: (response: any) => void
}

export const renderHandler = ({
  markers,
  component,
  defaultCenter,
  defaultZoom,
  autoFitBounds = true,
  boundsOffset,
  travelMode = 'DRIVING',
  destinationPoint,
  onLoaded,
  onLoadedDirection
}: renderHandlerParams) => (googleMaps: {}, error: any) => {
  return googleMaps && !error ? (
    <div data-test="map-container" style={{ height: '90vh' }}>
      <GoogleMap
        autoFitBounds={autoFitBounds}
        googleMaps={googleMaps}
        boundsOffset={boundsOffset}
        zoomControl={true}
        mapTypeControl={false}
        scaleControl={false}
        streetViewControl={false}
        rotateControl={false}
        fullscreenControl={false}
        center={defaultCenter}
        zoom={defaultZoom}
        onLoaded={onLoadedMapHandler({
          markers,
          destinationPoint,
          travelMode,
          onLoaded,
          onLoadedDirection,
          defaultCenter
        })}
      />
      {renderMarkerContent(markers, component)}
    </div>
  ) : (
    <div data-test="error-container">{error}</div>
  )
}

export type MapProps<T> = {
  markers: MarkerProps<T>[]
  apiKey: string
  libraries?: string
  defaultCenter?: MarkerProps<T>
  defaultZoom?: number
  component: any
  autoFitBounds?: boolean
  boundsOffset?: number
  travelMode?: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT'
  destinationPoint?: MarkerProps<any>
  onLoaded?: (params: any) => void
  onLoadedDirection?: (response: any) => void
}

export const Map: React.FC<MapProps<any>> = ({
  apiKey,
  libraries,
  markers,
  defaultCenter,
  defaultZoom,
  component,
  autoFitBounds,
  boundsOffset,
  destinationPoint,
  onLoaded,
  onLoadedDirection
}) => {
  return (
    <ReactGoogleMapLoader
      params={{
        key: apiKey,
        libraries: libraries
      }}
      render={renderHandler({
        markers,
        component,
        defaultCenter,
        defaultZoom,
        autoFitBounds,
        boundsOffset,
        destinationPoint,
        onLoaded,
        onLoadedDirection
      })}
    />
  )
}
