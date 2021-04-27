import React, { Dispatch, FC, memo, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import GoogleMap from 'react-google-map'
import { combineAddress, H5, notification, SubTitleH5 } from '@reapit/elements'
import {
  AppState,
  DirectionsRenderer,
  DirectionsResult,
  DirectionsService,
  GoogleMaps,
  MapRefs,
  Marker,
  useAppState,
  Map,
} from '../../../core/app-state'
import { ListItemModel, PropertyAddressModel } from '@reapit/foundations-ts-definitions'
import { ExtendedAppointmentModel } from '../../../types/global'
import { AppointmentDetailModal } from '../appointment-detail-modal/appointment-detail-modal'
import MapPanel from '../map-panel'
import { HandleSetMapParams } from './types'

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
  appointments: ExtendedAppointmentModel[]
}

interface RenderInfoWindowParams {
  latlng: Coords
  address: string
}

interface RenderMarkersParams {
  coordinates: CoordinateProps[]
  appState: AppState
}

export type RouteInformation = {
  duration: { text: string; value: number } | null
  distance: { text: string; value: number } | null
}

export const UNDEFINED_LATLNG_NUMBER = 9999
export const UNDEFINED_NULL_STRING = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substr(0, 36)

export interface Coordinate {
  position: {
    lat: number
    lng: number
  }
  address: any
  id: string
}

export type RenderModalTitleParams = {
  appointmentType?: ListItemModel
  heading: string
}
export const renderModalTitle = ({ appointmentType, heading }) => {
  return (
    <>
      {heading && <H5>{heading}</H5>}
      {appointmentType && <SubTitleH5 className="mb-0">{appointmentType?.value}</SubTitleH5>}
    </>
  )
}

// export const getDestinationPoint = ({ destinationLat, destinationLng }: AppState) => (): NullableCoords => ({
//   lat: destinationLat,
//   lng: destinationLng,
// })

// export const handleMarkerOnClick = (
//   appointments: ExtendedAppointmentModel[],
//   setAppState: Dispatch<SetStateAction<AppState>>,
//   setAppointmentDetailModalVisible: Dispatch<SetStateAction<boolean>>,
// ) => (id: string) => () => {
//   const appointment = appointments.find((item) => item.id === id)
//   if (appointment) {
//     setAppointment(appointment)
//     setAppointmentDetailModalVisible(true)
//   }
// }

export const handleModalClose = (setAppointmentDetailModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setAppointmentDetailModalVisible(false)
}

export interface HandleSetAppointmentParams {
  appointmentId: string | null
  appointments: ExtendedAppointmentModel[]
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleSetAppointment = ({
  appointments,
  setAppState,
  appointmentId,
}: HandleSetAppointmentParams) => () => {
  const appointment = appointments.find((item) => item.id === appointmentId)
  if (appointment) {
    const destinationAddress = combineAddress(appointment?.property?.address)

    setAppState((currentState) => ({
      ...currentState,
      appointment,
      destinationAddress,
    }))
  }
}

export const renderInfoWindowContent = ({ latlng, address }: RenderInfoWindowParams) => {
  return `
    <div style="max-width: 200px;padding: 0 1rem 1rem 0; cursor: pointer" id="coordinate-${latlng.lat}-${latlng.lng}">
      <div>${address}</div>
    </div>
  `
}

export const renderMarkers = ({ coordinates, appState }: RenderMarkersParams) => {
  const { mapRefs } = appState
  console.log(coordinates, mapRefs)
  if (!mapRefs) return null

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

      // infoWindow.addEventListener('click', markerCallBack(coordinate.id))
    })
    return marker
  })
}

export const getLocationPoint = ({ currentLat, currentLng }: AppState): Coords => ({
  lat: currentLat,
  lng: currentLng,
})

export const getCurrentLocation = ({ currentLat, currentLng, mapRefs }: AppState) => {
  if (!mapRefs) return null

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
  appState: AppState
  // onLoadedDirections: (directions: google.maps.DirectionsResult) => void
  // directionsRenderer: DirectionsRenderer
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleDirectionService = ({ appState, setAppState }: HandleDirectionServiceParams) => (
  response: DirectionsResult,
  status: google.maps.DirectionsStatus,
) => {
  const directionsRenderer = appState.mapRefs?.directionsRendererRef.current
  const destinationAddress = appState.destinationAddress ?? ''
  if (status !== 'OK') {
    notification.error({
      message: 'Directions request failed due to ' + status,
    })
    return clearMap(appState)
  }

  response?.routes?.forEach((route) => {
    route.legs.forEach((leg) => {
      leg.end_address = destinationAddress
    })
  })

  if (directionsRenderer) {
    directionsRenderer.setDirections(response)
  }

  const { duration, distance } = response.routes[0].legs[0]

  setAppState((currentState) => ({
    ...currentState,
    routeInformation: {
      duration,
      distance,
    },
  }))
}

export const handleRenderDirections = ({
  // destinationPoint,
  // map,
  appState,
  setAppState,
}) => () => {
  console.log(appState, setAppState)
  // const { currentLat, currentLng, destinationLat, destinationLng, travelMode, mapRefs } = appState
  // debugger
  // if (mapRefs && destinationLat && destinationLng) {
  //
  //   const googleMaps = mapRefs.googleMapsRef.current
  //   const directionsRenderer = mapRefs.directionsRendererRef.current
  //   const directionsService = mapRefs.directionsServiceRef.current
  //   const map = mapRefs.mapRef.current
  //   const origin = new googleMaps.LatLng(currentLat, currentLng)
  //   const destination = new googleMaps.LatLng(destinationLat, destinationLng)

  //   directionsRenderer.setMap(map)
  //   directionsService.route(
  //     {
  //       origin,
  //       destination,
  //       travelMode,
  //     },
  //     handleDirectionService({
  //       appState,
  //       setAppState,
  //     }),
  //   )
  // }
}

export const setZoomAndCenter = (appState: AppState) => {
  const { mapRefs } = appState
  if (!mapRefs) return null

  const googleMaps = mapRefs.googleMapsRef.current
  const bounds = mapRefs.boundsRef.current
  const map = mapRefs.mapRef.current
  const markers = mapRefs.markersRef.current

  if (!googleMaps || !bounds || !map || !markers) return null

  // if (zoom && center) {
  //   map.setZoom(zoom)
  //   map.setCenter(new googleMaps.LatLng(center.lat, center.lng))
  //   return
  // }
  // if (zoom) {
  //   map.setZoom(zoom)
  //   return

  // }

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
  markers.forEach((marker) => {
    const position = marker.getPosition()
    if (position) bounds.extend(position)
  })
  map.fitBounds(bounds)
  map.setCenter(bounds.getCenter())
  const DEFAULT_MARKER_LENGTH = 1
  if (markers?.length === DEFAULT_MARKER_LENGTH) {
    const DEFAULT_ZOOM = 9
    map.setZoom(DEFAULT_ZOOM)
  }
}

export const handleRenderMarkers = ({
  coordinates,
  // center,
  // destinationPoint,
  // onLoadedDirections,
  // markerCallBack,
  // destinationAddress,
  appState,
  // mapRefs,
}) => () => {
  // const { googleMapsRef, mapRef, directionsRendererRef, directionsServiceRef, markersRef } = mapRefs
  // const googleMaps = googleMapsRef.current
  // const map = mapRef.current
  // const directionsRenderer = directionsRendererRef.current
  // const directionsService = directionsServiceRef.current

  getCurrentLocation(appState)
  // const isDrawDirection = destinationPoint && destinationPoint.lat && destinationPoint.lng
  // if (isDrawDirection) {
  // renderDirections({
  //   // destinationPoint,
  //   // map,
  //   // googleMaps,
  //   // directionsService,
  //   // directionsRenderer,
  //   // onLoadedDirections,
  //   // destinationAddress,
  //   appState,
  //   // mapRefs,
  // })
  // }
  renderMarkers({ coordinates, appState })
  setZoomAndCenter(appState)
  // markersRef.current = markers
}

// export const onMarkerClick = (onDrawingMarkerClick) => {
//   return (marker) => {
//     onDrawingMarkerClick && onDrawingMarkerClick(marker)
//   }
// }

// export const onMarkerComplete = (onDrawingMarkerComplete, onDrawingMarkerClick) => {
//   return (marker) => {
//     onDrawingMarkerComplete && onDrawingMarkerComplete(marker)
//     marker.addListener('click', onMarkerClick(onDrawingMarkerClick))
//   }
// }

export const handleSetMapRefs = ({ mapRefs, setAppState, appState }: HandleSetMapParams) => () => {
  if (!appState.mapRefs) {
    setAppState((currentState) => ({
      ...currentState,
      mapRefs,
    }))
  }
}

export const handleOnLoaded = (mapRefs: MapRefs) => (googleMaps: GoogleMaps, map: Map) => {
  mapRefs.googleMapsRef.current = googleMaps
  mapRefs.mapRef.current = map
  mapRefs.boundsRef.current = new googleMaps.LatLngBounds()
  mapRefs.directionsServiceRef.current = new googleMaps.DirectionsService()
  mapRefs.directionsRendererRef.current = new googleMaps.DirectionsRenderer({
    suppressMarkers: true,
  })
}

export const clearMap = ({ mapRefs }: AppState) => {
  if (!mapRefs) return null

  // const { directionsRendererRef, markersRef } = mapRefs

  // directionsRendererRef?.current?.setMap(null)
  // markersRef?.current?.forEach((marker) => marker?.setMap(null))
}

// export const handleUseEffect = ({
//   coordinates,
//   // center,
//   destinationPoint,
//   onLoadedDirections,
//   markerCallBack,
//   destinationAddress,
//   appState,
//   // mapRefs,
// }) => () => {
//   renderDirectionAndMarkers({
//     // mapRefs,
//     coordinates,
//     // center,
//     destinationPoint,
//     onLoadedDirections,
//     markerCallBack,
//     destinationAddress,
//     appState,
//   })
//   return clearMap(appState)
// }

export const handleFilterCoordinates = (appointments: ExtendedAppointmentModel[]) => (): CoordinateProps[] =>
  appointments
    .map((appointment: ExtendedAppointmentModel): Coordinate | null => {
      const lat = appointment?.property?.address?.geolocation?.latitude
      const lng = appointment?.property?.address?.geolocation?.longitude
      const id = appointment?.id
      const address = appointment?.property?.address ?? {}
      if (!lat || !lng || !id) return null
      return {
        id,
        address,
        position: {
          lat,
          lng,
        },
      }
    })
    .filter((coordinate) => !!coordinate) as CoordinateProps[]

export const GoogleMapComponent: FC<MapProps> = ({ appointments }) => {
  // const [appointment, setAppointment] = useState<ExtendedAppointmentModel | null>(null)
  const [appointmentDetailModalVisible, setAppointmentDetailModalVisible] = useState(false)
  const googleMapsRef = useRef<GoogleMaps | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markersRef = useRef<Marker[]>([])
  const directionsRendererRef = useRef<DirectionsRenderer | null>(null)
  const boundsRef = useRef(null)
  const directionsServiceRef = useRef<DirectionsService | null>(null)
  const { appState, setAppState } = useAppState()
  // const destinationAddress = combineAddress(appointment?.property?.address)

  const { appointmentId, routeInformation, destinationAddress, appointment } = appState

  const coordinates: CoordinateProps[] = useMemo(handleFilterCoordinates(appointments), [appointments])

  const mapRefs: MapRefs = {
    googleMapsRef,
    mapRef,
    markersRef,
    directionsRendererRef,
    boundsRef,
    directionsServiceRef,
  }

  // const destinationPoint = useMemo(getDestinationPoint(appState), [destinationLat, destinationLng, travelMode])
  // const markerCallBack = handleMarkerOnClick(appointments, setAppState, setAppointmentDetailModalVisible)

  useEffect(handleSetAppointment({ appointmentId, appointments, setAppState }), [appointmentId, appointments])

  useEffect(handleRenderDirections({ appState, setAppState }), [appState])

  useEffect(
    handleRenderMarkers({
      appState,
      coordinates,
      // destinationPoint,
      // onLoadedDirections,
      // markerCallBack,
      // destinationAddress,
    }),
    [coordinates, appState],
  )

  useEffect(handleSetMapRefs({ setAppState, mapRefs, appState }), [mapRefs])
  return (
    <>
      <div style={{ height: '100vh' }}>
        <GoogleMap
          autoFitBounds={Boolean(appointments.length)}
          googleMaps={window.google.maps}
          apiKey={window.reapit.config.googleMapApiKey}
          onLoaded={handleOnLoaded(mapRefs)}
          zoom={10}
        />
      </div>
      {routeInformation && <MapPanel routeInformation={routeInformation} />}
      <AppointmentDetailModal
        title={renderModalTitle({ heading: destinationAddress, appointmentType: appointment?.appointmentType })}
        appointment={appointment || ({} as ExtendedAppointmentModel)}
        visible={appointmentDetailModalVisible}
        destroyOnClose={true}
        onClose={handleModalClose(setAppointmentDetailModalVisible)}
      />
    </>
  )
}

export default memo(GoogleMapComponent)
