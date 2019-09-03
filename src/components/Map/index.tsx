import React from 'react'
import GoogleMap from 'react-google-map'
import ReactGoogleMapLoader from 'react-google-maps-loader'

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

export const onLoadedMarkerHandler = (markerItem: MarkerProps<{}>, bounds, defaultCenter, defaultZoom) => (
  googleMaps,
  map,
  marker
) => {
  bounds.extend(marker.getPosition())
  const infoWindow = new googleMaps.InfoWindow({
    content: document.getElementById(`marker-${markerItem.lat}-${markerItem.lng}`)
  })
  if (!defaultCenter) {
    map.fitBounds(bounds)
  }
  if (!defaultZoom) {
    map.setCenter(bounds.getCenter())
  }
  googleMaps.event.addListener(marker, 'click', handleOnClickMarker(infoWindow, map, marker, markerItem))
}

export const renderMarker = (
  googleMaps,
  markers: MarkerProps<{ title?: string }>[] = [],
  defaultCenter,
  defaultZoom
) => {
  const bounds = new googleMaps.LatLngBounds()
  return markers.map((marker: MarkerProps<{ title?: string }>, index: number) => {
    const label = {
      text: String(index + 1),
      fontSize: '1.5rem',
      fontWeight: '500'
    }
    return {
      title: marker.title || '',
      position: {
        lat: marker.lat,
        lng: marker.lng
      },
      label: label,
      onLoaded: onLoadedMarkerHandler(marker, bounds, defaultCenter, defaultZoom)
    }
  })
}

export const onLoadedMapHandler = (googleMaps, map) => {
  map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
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

export const renderHandler = (
  markers: MarkerProps<any>[],
  component: any,
  defaultCenter?: MarkerProps<{}>,
  defaultZoom?: number
) => (googleMaps: {}, error: any) => {
  return googleMaps && !error ? (
    <div data-test="map-container" style={{ height: '100vh' }}>
      <GoogleMap
        googleMaps={googleMaps}
        // You can add and remove coordinates on the fly.
        // The map will rerender new markers and remove the old ones.
        coordinates={renderMarker(googleMaps, markers, defaultCenter, defaultZoom)}
        center={defaultCenter}
        zoom={defaultZoom}
        onLoaded={onLoadedMapHandler}
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
}

export const Map: React.FC<MapProps<any>> = ({ apiKey, libraries, markers, defaultCenter, defaultZoom, component }) => {
  return (
    <ReactGoogleMapLoader
      params={{
        key: apiKey,
        libraries: libraries
      }}
      render={renderHandler(markers, component, defaultCenter, defaultZoom)}
    />
  )
}
