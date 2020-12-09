import React from 'react'
import GoogleMap from 'react-google-map'
import { combineAddress, notification } from '@reapit/elements'

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
  center: Coords
  zoom: number
  destinationAddress?: string
  onDrawingMarkerComplete?: Function | null
  onDrawingMarkerClick?: Function | null
  onDrawingPolygonComplete?: Function | null
  onDrawingPolygonClick?: Function | null
}

export type MapProps<T> = T &
  GoogleMapProps<T> & {
    drawingOptions?: any
  }

export const renderInfoWindowContent = ({ latlng, address }) => {
  return `
    <div style="max-width: 200px;padding: 0 1rem 1rem 0; cursor: pointer" id="coordinate-${latlng.lat}-${latlng.lng}">
      <div>${address}</div>
    </div>
  `
}

export const renderMarkers = ({ coordinates, googleMaps, map, markerCallBack }) =>
  coordinates?.map((coordinate: CoordinateProps<any>, index: number) => {
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
      if (markerCallBack) {
        // @ts-ignore
        document
          .getElementById(`coordinate-${coordinate.position.lat}-${coordinate.position.lng}`)
          .addEventListener('click', markerCallBack(coordinate.id))
      }
    })
    return marker
  })

export const getCurrentLocation = ({ googleMaps, position, map }) => {
  const latlng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }

  const currentLocation = new googleMaps.Marker({
    position: latlng,
    content: 'Your location',
    map,
  })

  const geocoder = new googleMaps.Geocoder()
  if (geocoder.geocode) {
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
  }

  return currentLocation
}

export const handleRequestDirectionServiceResponse = ({
  onLoadedDirection,
  directionsRenderer,
  destinationAddress,
  markersRef,
  directionsRendererRef,
}) => (response, status) => {
  if (status === 'OK') {
    onLoadedDirection && onLoadedDirection(response)
  }
  if (destinationAddress && status === 'OK') {
    response?.routes?.forEach(route => {
      route.legs.forEach(leg => {
        leg.end_address = destinationAddress
      })
    })
    directionsRenderer?.setDirections && directionsRenderer.setDirections(response)
  }
  if (status !== 'OK') {
    clearMap({ directionsRendererRef, markersRef })()
    notification.error({
      message: 'Directions request failed due to ' + status,
      placement: 'bottomRight',
    })
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
  destinationAddress,
  markersRef,
  directionsRendererRef,
}) => {
  directionsRenderer.setMap(map)
  const origin = new googleMaps.LatLng(position.coords.latitude, position.coords.longitude)
  const destination = new googleMaps.LatLng(destinationPoint.lat, destinationPoint.lng)
  directionsService.route(
    {
      origin,
      destination,
      travelMode,
    },
    handleRequestDirectionServiceResponse({
      onLoadedDirection,
      directionsRenderer,
      destinationAddress,
      markersRef,
      directionsRendererRef,
    }),
  )
}

export const setZoomAndCenter = ({ googleMaps, bounds, center, zoom, map, markers }) => {
  if (zoom && center) {
    map.setZoom(zoom)
    map.setCenter(new googleMaps.LatLng(center.lat, center.lng))
    return
  }
  if (zoom) {
    map.setZoom(zoom)
    return
  }
  if (center?.lat && center?.lng) {
    map.setCenter(new googleMaps.LatLng(center.lat, center.lng))
    return
  }
  const NO_MARKERS_LENGTH = 0
  if (markers?.length <= NO_MARKERS_LENGTH) {
    const LONDON_LAT_LNG = { lat: 51.507351, lng: -0.127758 }
    const DEFAULT_ZOOM = 8
    map.setCenter(new googleMaps.LatLng(LONDON_LAT_LNG.lat, LONDON_LAT_LNG.lng))
    map.setZoom(DEFAULT_ZOOM)
    return
  }
  markers.forEach(marker => bounds.extend(marker.getPosition()))
  map.fitBounds(bounds)
  map.setCenter(bounds.getCenter())
  const DEFAULT_MARKER_LENGTH = 1
  if (markers?.length === DEFAULT_MARKER_LENGTH) {
    const DEFAULT_ZOOM = 9
    map.setZoom(DEFAULT_ZOOM)
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
  boundsRef,
  markerCallBack,
  destinationAddress,
}) => {
  const googleMaps = googleMapsRef.current
  const map = mapRef.current
  const directionsRenderer = directionsRendererRef.current
  const directionsService = directionsServiceRef.current
  const bounds = boundsRef.current
  let markers = []

  if (googleMaps && map) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const currentLocation = getCurrentLocation({ googleMaps, position, map })
        const isDrawDirection = destinationPoint && destinationPoint.lat && destinationPoint.lng
        if (isDrawDirection) {
          renderDirection({
            destinationPoint,
            map,
            position,
            googleMaps,
            directionsService,
            directionsRenderer,
            travelMode,
            onLoadedDirection,
            destinationAddress,
            markersRef,
            directionsRendererRef,
          })
        }
        markers = renderMarkers({ coordinates, googleMaps, map, markerCallBack })
        setZoomAndCenter({ googleMaps, bounds, center, zoom, map, markers: [...markers, currentLocation] })
        markersRef.current = markers
        return
      },
      () => {
        clearMap({ directionsRendererRef, markersRef })()
        const markers = renderMarkers({ coordinates, googleMaps, map, markerCallBack })
        setZoomAndCenter({ googleMaps, bounds, center, zoom, map, markers })
        markersRef.current = markers
        return
      },
    )
  }
}

export const onMarkerClick = onDrawingMarkerClick => {
  return marker => {
    onDrawingMarkerClick && onDrawingMarkerClick(marker)
  }
}

export const onMarkerComplete = (onDrawingMarkerComplete, onDrawingMarkerClick) => {
  return marker => {
    onDrawingMarkerComplete && onDrawingMarkerComplete(marker)
    marker.addListener('click', onMarkerClick(onDrawingMarkerClick))
  }
}

export type OnLoadedParams = {
  googleMaps: any
  map: google.maps.Map
  bounds: google.maps.LatLngBounds
  directionsService: google.maps.DirectionsService
  directionsRenderer: google.maps.DirectionsRenderer
}

export type HandleOnLoadedParams = {
  googleMapsRef: React.MutableRefObject<any>
  mapRef: React.MutableRefObject<any>
  directionsServiceRef: React.MutableRefObject<any>
  directionsRendererRef: React.MutableRefObject<any>
  boundsRef: React.MutableRefObject<any>
  onLoaded: (params: OnLoadedParams) => void
}

export const handleOnLoaded = ({
  googleMapsRef,
  mapRef,
  directionsServiceRef,
  directionsRendererRef,
  boundsRef,
  onLoaded,
}: HandleOnLoadedParams) => (googleMaps, map) => {
  googleMapsRef.current = googleMaps
  mapRef.current = map
  const bounds = new googleMaps.LatLngBounds()
  const directionsService = new googleMaps.DirectionsService()
  const directionsRenderer = new googleMaps.DirectionsRenderer({
    suppressMarkers: true,
  })

  boundsRef.current = bounds
  directionsServiceRef.current = directionsService
  directionsRendererRef.current = directionsRenderer
  onLoaded && onLoaded({ googleMaps, map, bounds, directionsService, directionsRenderer })
}

export type MarkerContentProps = {
  coordinates: CoordinateProps<any>[]
}

export const clearMap = ({ directionsRendererRef, markersRef }) => () => {
  directionsRendererRef?.current?.setMap && directionsRendererRef?.current?.setMap(null)
  markersRef?.current?.forEach(marker => marker && marker?.setMap(null))
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
  boundsRef,
  markerCallBack,
  destinationAddress,
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
    boundsRef,
    markerCallBack,
    destinationAddress,
  })
  return clearMap({ directionsRendererRef, markersRef })
}

export const Map: React.FC<MapProps<any>> = ({
  coordinates,
  center,
  zoom,
  onLoaded,
  destinationPoint,
  travelMode = 'DRIVING',
  onLoadedDirection,
  mapContainerStyles,
  markerCallBack,
  destinationAddress,
  ...restProps
}) => {
  const googleMapsRef = React.useRef(null)
  const mapRef = React.useRef(null)
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
      boundsRef,
      markerCallBack,
      destinationAddress,
    }),
    [coordinates, destinationPoint, googleMapsRef?.current, mapRef?.current, destinationAddress],
  )
  return (
    <div style={{ height: '90vh', ...mapContainerStyles }}>
      <GoogleMap
        googleMaps={window.google.maps}
        onLoaded={handleOnLoaded({
          googleMapsRef,
          mapRef,
          onLoaded,
          directionsRendererRef,
          boundsRef,
          directionsServiceRef,
        })}
        center={center}
        zoom={zoom}
        {...restProps}
      />
    </div>
  )
}

export default React.memo(Map)
