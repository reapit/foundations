import React from 'react'
import GoogleMap from 'react-google-map'
import ReactGoogleMapLoader from 'react-google-maps-loader'

export type Coords = {
  lat: number
  lng: number
}

export type CoordinateProps<T> = T & {
  position: Coords
  onLoaded: Function
}

export type GoogleMapProps<T> = T & {
  autoFitBounds?: boolean
  boundsOffset?: number
  coordinates?: CoordinateProps<any>[]
  googleMaps?: {}
  onLoaded?: Function | null
  onLoadedDirection?: Function | null
  defaultCenter: Coords
  defaultZoom: number
}

export type MapProps<T> = T &
  GoogleMapProps<T> & {
    apiKey: string
    component?: any
    libraries?: string
  }

export const renderMarkers = ({ coordinates, googleMaps, map }) =>
  coordinates.map((coordinate: CoordinateProps<any>, index: number) => {
    const label = {
      text: String(index + 1),
      fontSize: '1.5rem',
      fontWeight: '500'
    }
    const marker = new googleMaps.Marker({
      position: {
        lat: coordinate.position.lat,
        lng: coordinate.position.lng
      },
      label,
      map
    })
    const infoWindow = new googleMaps.InfoWindow()
    const markerInfo = document.getElementById(`coordinate-${coordinate.position.lat}-${coordinate.position.lng}`)
    infoWindow.setContent(markerInfo)
    googleMaps.event.addListener(marker, 'click', () => {
      if (markerInfo) {
        markerInfo.style.display = 'block'
      }
      infoWindow.open(map, marker)
    })
    return marker
  })

export const getCurrentLocation = ({ googleMaps, position, map }) => {
  const currentLocation = new googleMaps.Marker({
    position: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    content: 'Your location',
    map
  })
  return currentLocation
}

export const handleRequestDirectionServiceResponse = ({ currentLocation, onLoadedDirection, directionsRenderer }) => (
  response,
  status
) => {
  if (status === 'OK') {
    currentLocation.setMap(null)
    if (onLoadedDirection) {
      onLoadedDirection(response)
    }
    directionsRenderer.setDirections(response)
  } else {
    window.alert('Directions request failed due to ' + status)
  }
}

export const renderDirection = ({
  destinationPoint,
  map,
  position,
  googleMaps,
  directionsService,
  directionsRenderer,
  travelMode,
  onLoadedDirection,
  currentLocation
}) => {
  directionsRenderer.setMap(map)
  const origin = new googleMaps.LatLng(position.coords.latitude, position.coords.longitude)
  const destination = new googleMaps.LatLng(destinationPoint.lat, destinationPoint.lng)
  directionsService.route(
    {
      origin,
      destination,
      travelMode
    },
    handleRequestDirectionServiceResponse({ currentLocation, onLoadedDirection, directionsRenderer })
  )
}

export const setZoomAndCenter = ({ bounds, center, zoom, map, markers }) => {
  markers.forEach(marker => bounds.extend(marker.getPosition()))
  if (!zoom) {
    map.fitBounds(bounds)
  }
  if (!center) {
    map.setCenter(bounds.getCenter())
  }
}

export const renderDirectionAndMarkers = ({
  googleMapsRef,
  mapRef,
  coordinates,
  center,
  zoom,
  destinationPoint,
  travelMode,
  onLoadedDirection,
  markersRef,
  directionsRendererRef,
  directionsServiceRef,
  boundsRef
}) => {
  const googleMaps = googleMapsRef.current
  const map = mapRef.current
  const directionsRenderer = directionsRendererRef.current
  const directionsService = directionsServiceRef.current
  const bounds = boundsRef.current
  let markers = []
  if (googleMaps && map) {
    return navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const currentLocation = getCurrentLocation({ googleMaps, position, map })
        const isDrawDrirection = destinationPoint && destinationPoint.lat && destinationPoint.lng
        if (isDrawDrirection) {
          renderDirection({
            destinationPoint,
            map,
            position,
            googleMaps,
            directionsService,
            directionsRenderer,
            travelMode,
            onLoadedDirection,
            currentLocation
          })
          return
        }
        markers = renderMarkers({ coordinates, googleMaps, map })
        setZoomAndCenter({ bounds, center, zoom, map, markers: [...markers, currentLocation] })
        markersRef.current = markers
        return
      },
      () => {
        const bounds = new googleMaps.LatLngBounds()
        const markers = renderMarkers({ coordinates, googleMaps, map })
        setZoomAndCenter({ bounds, center, zoom, map, markers })
        markersRef.current = markers
        return
      }
    )
  }
}

export const handleOnLoaded = ({
  googleMapsRef,
  mapRef,
  directionsServiceRef,
  directionsRendererRef,
  boundsRef,
  onLoaded
}) => (googleMaps, map) => {
  googleMapsRef.current = googleMaps
  mapRef.current = map
  const bounds = new googleMaps.LatLngBounds()
  const directionsService = new googleMaps.DirectionsService()
  const directionsRenderer = new googleMaps.DirectionsRenderer()
  boundsRef.current = bounds
  directionsServiceRef.current = directionsService
  directionsRendererRef.current = directionsRenderer

  if (onLoaded) {
    onLoaded({ googleMaps, map, bounds, directionsService, directionsRenderer })
  }
}

export type MarkerContentProps = {
  coordinates: CoordinateProps<any>[]
  component: any
}

export const renderMarkersContent = ({ coordinates = [], component: Component }: MarkerContentProps) => {
  return coordinates.map((coordinate: CoordinateProps<any>, index: number) => {
    return (
      <div
        style={{ display: 'none' }}
        key={index}
        id={`coordinate-${coordinate.position.lat}-${coordinate.position.lng}`}
      >
        <Component coordinate={coordinate} />
      </div>
    )
  })
}

export const renderMap = ({
  googleMapsRef,
  mapRef,
  onLoaded,
  directionsRendererRef,
  boundsRef,
  directionsServiceRef,
  center,
  zoom,
  coordinates,
  component,
  mapContainerStyles,
  ...restProps
}) => (googleMaps, error) => {
  if (googleMaps && !error) {
    return (
      <div style={{ height: '90vh', ...mapContainerStyles }}>
        <GoogleMap
          googleMaps={googleMaps}
          onLoaded={handleOnLoaded({
            googleMapsRef,
            mapRef,
            onLoaded,
            directionsRendererRef,
            boundsRef,
            directionsServiceRef
          })}
          center={center}
          zoom={zoom}
          {...restProps}
        />
        {renderMarkersContent({ coordinates, component })}
      </div>
    )
  }
  if (error === 'Network Error') {
    return <div>{error === 'Network Error' ? <p>{error}</p> : <p>isLoading...</p>}</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  return null
}

export const clearMap = ({ directionsRendererRef, markersRef }) => () => {
  if (directionsRendererRef && directionsRendererRef.current) {
    // @ts-ignore
    directionsRendererRef.current.setMap(null)
  }
  if (markersRef && markersRef.current) {
    // @ts-ignore
    markersRef.current.forEach(marker => marker.setMap(null))
  }
}

export const handleUseEffect = ({
  googleMapsRef,
  mapRef,
  coordinates,
  center,
  zoom,
  destinationPoint,
  travelMode,
  onLoadedDirection,
  markersRef,
  directionsRendererRef,
  directionsServiceRef,
  boundsRef
}) => () => {
  renderDirectionAndMarkers({
    googleMapsRef,
    mapRef,
    coordinates,
    center,
    zoom,
    destinationPoint,
    travelMode,
    onLoadedDirection,
    markersRef,
    directionsRendererRef,
    directionsServiceRef,
    boundsRef
  })
  return clearMap({ directionsRendererRef, markersRef })
}

export const Map: React.FC<MapProps<any>> = ({
  apiKey,
  libraries,
  coordinates,
  component,
  center,
  zoom,
  onLoaded,
  destinationPoint,
  travelMode = 'DRIVING',
  onLoadedDirection,
  mapContainerStyles,
  ...restProps
}) => {
  const googleMapsRef = React.useRef(null)
  const mapRef = React.useRef()
  const markersRef = React.useRef([])
  const directionsRendererRef = React.useRef(null)
  const boundsRef = React.useRef(null)
  const directionsServiceRef = React.useRef(null)

  React.useEffect(
    handleUseEffect({
      googleMapsRef,
      mapRef,
      coordinates,
      center,
      zoom,
      destinationPoint,
      travelMode,
      onLoadedDirection,
      markersRef,
      directionsRendererRef,
      directionsServiceRef,
      boundsRef
    }),
    [coordinates, destinationPoint]
  )

  return (
    <ReactGoogleMapLoader
      params={{
        key: apiKey,
        libraries: libraries
      }}
      render={renderMap({
        googleMapsRef,
        mapRef,
        onLoaded,
        directionsRendererRef,
        boundsRef,
        directionsServiceRef,
        center,
        zoom,
        coordinates,
        component,
        mapContainerStyles,
        ...restProps
      })}
    />
  )
}
