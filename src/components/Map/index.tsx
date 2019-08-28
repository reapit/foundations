import React from 'react'
import GoogleMap from 'react-google-map'
import ReactGoogleMapLoader from 'react-google-maps-loader'

export type MarkerProps = {
  title?: string
  lat: number
  lng: number
  content?: string
}

export type GoogleMapProps = {
  autoFitBounds?: boolean
  boundsOffset?: number
  coordinates?: {
    onLoaded: Function
  }[]
  googleMaps: {}
  onLoaded?: Function | null
  defaultCenter: MarkerProps
  defaultZoom: number
  markers: MarkerProps[]
}

export const handleOnClickMarker = (infoWindow, map, marker) => () => {
  infoWindow.open(map, marker)
}

export const onLoadedMarkerHandler = markerItem => (googleMaps, map, marker) => {
  const infoWindow = new googleMaps.InfoWindow({
    content: `
      <div>
        <h1>${markerItem.title}<h1>
        <div>
          ${markerItem.content}
        </div>
      </div>
    `
  })
  googleMaps.event.addListener(marker, 'click', handleOnClickMarker(infoWindow, map, marker))
}

export const renderMarker = (googleMaps, markers: MarkerProps[] = []) => {
  const icon = {
    anchor: new googleMaps.Point(25, 80),
    origin: new googleMaps.Point(0, -10),
    scaledSize: new googleMaps.Size(50, 100)
  }
  return markers.map((marker: MarkerProps, index: number) => {
    const label = {
      text: String(index + 1),
      fontSize: '1.5rem',
      fontWeight: '500'
    }
    return {
      title: marker.title,
      position: {
        lat: marker.lat,
        lng: marker.lng
      },
      label: label,
      icon: icon,
      onLoaded: onLoadedMarkerHandler(marker)
    }
  })
}

export const onLoadedMapHandler = (googleMaps, map) => {
  map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
}

export const renderHandler = (markers: MarkerProps[], defaultCenter: MarkerProps, defaultZoom: number) => (
  googleMaps: {},
  error: any
) => {
  return googleMaps && !error ? (
    <div data-test="map-container" style={{ height: '100vh' }}>
      <GoogleMap
        googleMaps={googleMaps}
        // You can add and remove coordinates on the fly.
        // The map will rerender new markers and remove the old ones.
        coordinates={renderMarker(googleMaps, markers)}
        center={defaultCenter}
        zoom={defaultZoom}
        onLoaded={onLoadedMapHandler}
      />
    </div>
  ) : (
    <div data-test="error-container">{error}</div>
  )
}

export type MapProps = {
  markers: MarkerProps[]
  apiKey: string
  libraries?: string
  defaultCenter: MarkerProps
  defaultZoom: number
}

export const Map: React.FC<MapProps> = ({ apiKey, libraries, markers, defaultCenter, defaultZoom }) => {
  return (
    <ReactGoogleMapLoader
      params={{
        key: apiKey,
        libraries: libraries
      }}
      render={renderHandler(markers, defaultCenter, defaultZoom)}
    />
  )
}
