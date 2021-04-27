import React, { FC, memo, MutableRefObject, useEffect, useRef } from 'react'
import GoogleMap from 'react-google-map'
import { combineAddress, notification } from '@reapit/elements'
import { AppState, useAppState } from '../../../core/app-state'
import { PropertyAddressModel } from '@reapit/foundations-ts-definitions'

type GoogleMaps = typeof google.maps
type Map = google.maps.Map
type DirectionsRenderer = google.maps.DirectionsRenderer
type DirectionsService = google.maps.DirectionsService
export type DirectionsResult = google.maps.DirectionsResult
type Marker = google.maps.Marker
type LatLngBounds = google.maps.LatLngBounds

type Coords = {
  lat: number
  lng: number
}

export type NullableCoords = {
  lat: number | null
  lng: number | null
}

export interface CoordinateProps {
  position: Coords
  id: string
  address: PropertyAddressModel
}

interface MapProps {
  coordinates: CoordinateProps[]
  autoFitBounds: boolean
  markerCallBack: (id: string) => void
  onLoadedDirections: (directions: DirectionsResult) => void
  destinationPoint: NullableCoords
  destinationAddress: string
}

interface MapRefs {
  googleMapsRef: MutableRefObject<typeof google.maps | null>
  mapRef: MutableRefObject<Map | null>
  markersRef: MutableRefObject<Marker[]>
  directionsRendererRef: MutableRefObject<DirectionsRenderer | null>
  boundsRef: MutableRefObject<LatLngBounds | null>
  directionsServiceRef: MutableRefObject<DirectionsService | null>
}

interface RenderInfoWindowParams {
  latlng: Coords
  address: string
}

interface RenderMarkersParams {
  mapRefs: MapRefs
  coordinates: CoordinateProps[]
  markerCallBack: (id: string) => () => void
}

interface GetCurrentLocationParams {
  appState: AppState
  mapRefs: MapRefs
}

export interface HandleOnLoadedParams {
  mapRefs: MapRefs
}

export const renderInfoWindowContent = ({ latlng, address }: RenderInfoWindowParams) => {
  return `
    <div style="max-width: 200px;padding: 0 1rem 1rem 0; cursor: pointer" id="coordinate-${latlng.lat}-${latlng.lng}">
      <div>${address}</div>
    </div>
  `
}

export const renderMarkers = ({ coordinates, mapRefs, markerCallBack }: RenderMarkersParams) => {
  const { googleMapsRef, mapRef } = mapRefs

  if (!googleMapsRef.current || !mapRef.current) return

  const googleMaps = googleMapsRef.current
  const map = mapRef.current

  return coordinates.map((coordinate: CoordinateProps, index: number) => {
    const latlng = {
      lat: coordinate.position.lat,
      lng: coordinate.position.lng,
    }
    const address = combineAddress(coordinate.address) || ''

    const label = {
      text: String(index + 1),
      fontSize: '1.5rem',
      fontWeight: '500',
    }

    const marker = new googleMaps.Marker({
      position: latlng,
      label,
      map,
    })

    const infoWindow = new googleMaps.InfoWindow({
      content: renderInfoWindowContent({ latlng, address }),
    })

    googleMaps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker)
    })

    googleMaps.event.addListener(infoWindow, 'domready', () => {
      const infoWindow = document.getElementById(`coordinate-${coordinate.position.lat}-${coordinate.position.lng}`)

      if (!infoWindow) return null

      infoWindow.addEventListener('click', markerCallBack(coordinate.id))
    })
    return marker
  })
}

export const getLocationPoint = ({ currentLat, currentLng }: AppState): Coords => ({
  lat: currentLat,
  lng: currentLng,
})

export const getCurrentLocation = ({ appState, mapRefs }: GetCurrentLocationParams) => {
  const { currentLat, currentLng } = appState
  const { googleMapsRef, mapRef } = mapRefs
  const googleMaps = googleMapsRef.current
  const map = mapRef.current

  if (!googleMaps || !map) return null

  const latlng = {
    lat: currentLat,
    lng: currentLng,
  }

  const currentLocation = new googleMaps.Marker({
    position: latlng,
    label: '',
    map,
  })

  const geocoder = new googleMaps.Geocoder()

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      const streetAddress = results[0]
      const address = streetAddress.formatted_address
      const infoWindow = new googleMaps.InfoWindow({
        content: renderInfoWindowContent({ latlng, address }),
      })
      googleMaps.event.addListener(currentLocation, 'click', () => {
        infoWindow.open(map, currentLocation)
      })
    } else {
      console.error('Current address request failed due to: ' + status)
    }
  })

  return currentLocation
}

interface HandleDirectionServiceParams {
  mapRefs: MapRefs
  onLoadedDirections: (directions: google.maps.DirectionsResult) => void
  directionsRenderer: DirectionsRenderer
  destinationAddress: string
}

export const handleDirectionService = ({
  onLoadedDirections,
  directionsRenderer,
  destinationAddress,
  mapRefs,
}: HandleDirectionServiceParams) => (response: DirectionsResult, status: google.maps.DirectionsStatus) => {
  if (status !== 'OK') {
    notification.error({
      message: 'Directions request failed due to ' + status,
    })
    return clearMap(mapRefs)()
  }

  response?.routes?.forEach((route) => {
    route.legs.forEach((leg) => {
      leg.end_address = destinationAddress
    })
  })

  onLoadedDirections(response)
  directionsRenderer?.setDirections(response)
}

interface RenderDirectionsParams {}

export const renderDirections = ({
  destinationPoint,
  map,
  appState,
  googleMaps,
  directionsService,
  directionsRenderer,
  onLoadedDirections,
  destinationAddress,
  mapRefs,
}) => {
  directionsRenderer.setMap(map)
  const { currentLat, currentLng, travelMode } = appState
  const origin = new googleMaps.LatLng(currentLat, currentLng)
  const destination = new googleMaps.LatLng(destinationPoint.lat, destinationPoint.lng)
  directionsService.route(
    {
      origin,
      destination,
      travelMode,
    },
    handleDirectionService({
      onLoadedDirections,
      directionsRenderer,
      destinationAddress,
      mapRefs,
    }),
  )
}

export const setZoomAndCenter = ({ mapRefs, appState }) => {
  // if (zoom && center) {
  //   map.setZoom(zoom)
  //   map.setCenter(new googleMaps.LatLng(center.lat, center.lng))
  //   return
  // }
  // if (zoom) {
  //   map.setZoom(zoom)
  //   return

  // }
  const { googleMaps, bounds, map, markers } = mapRefs
  console.log(map)
  const center = getLocationPoint(appState)
  if (center?.lat && center?.lng) {
    console.log('center')
    // const DEFAULT_ZOOM = 9
    map.setCenter(new googleMaps.LatLng(center.lat, center.lng))
    // map.setZoom(DEFAULT_ZOOM)
    return
  }

  if (!markers?.length) {
    const LONDON_LAT_LNG = { lat: 51.507351, lng: -0.127758 }
    const DEFAULT_ZOOM = 8
    map.setCenter(new googleMaps.LatLng(LONDON_LAT_LNG.lat, LONDON_LAT_LNG.lng))
    map.setZoom(DEFAULT_ZOOM)
    return
  }
  markers.forEach((marker) => bounds.extend(marker.getPosition()))
  map.fitBounds(bounds)
  map.setCenter(bounds.getCenter())
  const DEFAULT_MARKER_LENGTH = 1
  if (markers?.length === DEFAULT_MARKER_LENGTH) {
    const DEFAULT_ZOOM = 9
    map.setZoom(DEFAULT_ZOOM)
  }
}

export const renderDirectionAndMarkers = ({
  coordinates,
  // center,
  destinationPoint,
  onLoadedDirections,
  markerCallBack,
  destinationAddress,
  appState,
  mapRefs,
}) => {
  const { googleMapsRef, mapRef, directionsRendererRef, boundsRef, directionsServiceRef, markersRef } = mapRefs
  const googleMaps = googleMapsRef.current
  const map = mapRef.current
  const directionsRenderer = directionsRendererRef.current
  const directionsService = directionsServiceRef.current

  getCurrentLocation({ mapRefs, appState })
  const isDrawDirection = destinationPoint && destinationPoint.lat && destinationPoint.lng
  if (isDrawDirection) {
    renderDirections({
      destinationPoint,
      map,
      googleMaps,
      directionsService,
      directionsRenderer,
      onLoadedDirections,
      destinationAddress,
      appState,
      mapRefs,
    })
  }
  const markers = renderMarkers({ coordinates, mapRefs, markerCallBack })
  setZoomAndCenter({ mapRefs, appState })
  markersRef.current = markers
}

export const onMarkerClick = (onDrawingMarkerClick) => {
  return (marker) => {
    onDrawingMarkerClick && onDrawingMarkerClick(marker)
  }
}

export const onMarkerComplete = (onDrawingMarkerComplete, onDrawingMarkerClick) => {
  return (marker) => {
    onDrawingMarkerComplete && onDrawingMarkerComplete(marker)
    marker.addListener('click', onMarkerClick(onDrawingMarkerClick))
  }
}

export const handleOnLoaded = ({ mapRefs }: HandleOnLoadedParams) => (googleMaps: GoogleMaps, map: Map) => {
  const { googleMapsRef, mapRef, directionsServiceRef, directionsRendererRef, boundsRef } = mapRefs

  googleMapsRef.current = googleMaps
  mapRef.current = map
  boundsRef.current = new googleMaps.LatLngBounds()
  directionsServiceRef.current = new googleMaps.DirectionsService()
  directionsRendererRef.current = new googleMaps.DirectionsRenderer({
    suppressMarkers: true,
  })
}

export const clearMap = ({ directionsRendererRef, markersRef }: MapRefs) => () => {
  directionsRendererRef?.current?.setMap(null)
  markersRef?.current?.forEach((marker) => marker?.setMap(null))
}

export const handleUseEffect = ({
  coordinates,
  // center,
  destinationPoint,
  onLoadedDirections,
  markerCallBack,
  destinationAddress,
  appState,
  mapRefs,
}) => () => {
  renderDirectionAndMarkers({
    mapRefs,
    coordinates,
    // center,
    destinationPoint,
    onLoadedDirections,
    markerCallBack,
    destinationAddress,
    appState,
  })
  return clearMap(mapRefs)
}

export const Map: FC<MapProps> = ({
  autoFitBounds,
  coordinates,
  destinationPoint,
  onLoadedDirections,
  markerCallBack,
  destinationAddress,
}) => {
  const googleMapsRef = useRef<GoogleMaps | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markersRef = useRef<Marker[]>([])
  const directionsRendererRef = useRef<DirectionsRenderer | null>(null)
  const boundsRef = useRef(null)
  const directionsServiceRef = useRef<DirectionsService | null>(null)
  const { appState } = useAppState()

  const mapRefs: MapRefs = {
    googleMapsRef,
    mapRef,
    markersRef,
    directionsRendererRef,
    boundsRef,
    directionsServiceRef,
  }

  useEffect(
    handleUseEffect({
      mapRefs,
      appState,
      coordinates,
      destinationPoint,
      onLoadedDirections,
      markerCallBack,
      destinationAddress,
    }),
    [coordinates, destinationPoint, googleMapsRef?.current, mapRef?.current, destinationAddress, appState],
  )
  return (
    <div style={{ height: '100vh' }}>
      <GoogleMap
        autoFitBounds={autoFitBounds}
        googleMaps={window.google.maps}
        apiKey={window.reapit.config.googleMapApiKey}
        onLoaded={handleOnLoaded({
          mapRefs,
          // onLoaded,
        })}
        zoom={10}
      />
    </div>
  )
}

export default memo(Map)
