import React, { Dispatch, FC, memo, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import GoogleMap from 'react-google-map'
import { combineAddress, H5, notification, SubTitleH5 } from '@reapit/elements'
import { AppState, useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { AppointmentDetailModal } from '../appointment-detail-modal/appointment-detail-modal'
import MapPanel from '../map-panel'
import {
  AppStateParams,
  HandleSetMapParams,
  DirectionsRenderer,
  DirectionsResult,
  DirectionsService,
  Map,
  LatLngBounds,
  GoogleMaps,
  MapRefs,
  Marker,
  RenderInfoWindowParams,
  RenderMarkersParams,
  CoordinateProps,
  Coordinate,
  MapProps,
  HandleMarkerClickParams,
  HandleSetAppointmentParams,
} from './types'
import { getShortAddress } from '../../../utils/formatting-utils'

export const handleInfoWindowClick = (
  appointmentId: string,
  setAppState: Dispatch<SetStateAction<AppState>>,
  setAppointmentDetailModalVisible: Dispatch<SetStateAction<boolean>>,
) => () => {
  if (appointmentId) {
    setAppState((currentState) => ({
      ...currentState,
      appointmentId,
    }))
    setAppointmentDetailModalVisible(true)
  }
}

export const handleModalClose = (setAppointmentDetailModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setAppointmentDetailModalVisible(false)
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

export const handleMarkerClick = ({ appointmentId, setAppState }: HandleMarkerClickParams) => {
  if (appointmentId) {
    setAppState((currentState) => ({
      ...currentState,
      appointmentId,
    }))
  }
}

export const renderInfoWindowContent = ({ latlng, address }: RenderInfoWindowParams) => {
  return `
    <div style="max-width: 200px;padding: 0 1rem 1rem 0; cursor: pointer; font-family: 'PT Sans', Helvetica, Arial, sans-serif;" id="coordinate-${latlng.lat}-${latlng.lng}">
      <div>${address}</div>
    </div>
  `
}

export const handleRenderMarkers = ({
  coordinates,
  appState,
  setAppState,
  setAppointmentDetailModalVisible,
}: RenderMarkersParams) => () => {
  const { mapRefs } = appState

  const googleMaps = mapRefs?.googleMapsRef?.current
  const map = mapRefs?.mapRef?.current
  const markersRef = mapRefs?.markersRef

  if (googleMaps && googleMaps && map && markersRef) {
    markersRef.current = coordinates.map((coordinate: CoordinateProps, index: number) => {
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

        const appointmentId = coordinate.id

        handleMarkerClick({ setAppState, appointmentId })
      })

      googleMaps.event.addListener(infoWindow, 'domready', () => {
        const infoWindow = document.getElementById(`coordinate-${coordinate.position.lat}-${coordinate.position.lng}`)
        const appointmentId = coordinate.id

        if (!infoWindow || !appointmentId) return null

        infoWindow.addEventListener(
          'click',
          handleInfoWindowClick(appointmentId, setAppState, setAppointmentDetailModalVisible),
        )
      })

      return marker
    })

    setZoomAndCenter(appState)
  }
}

export const handleRenderMyLocation = ({ appState, setAppState }: AppStateParams) => () => {
  const { currentLat, currentLng, mapRefs } = appState

  const googleMaps = mapRefs?.googleMapsRef?.current
  const map = mapRefs?.mapRef?.current
  const myLocationRef = mapRefs?.myLocationRef

  if (googleMaps && map && myLocationRef) {
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
        const locationAddress = streetAddress.formatted_address
        const infoWindow = new googleMaps.InfoWindow({
          content: renderInfoWindowContent({ latlng, address: locationAddress }),
        })
        googleMaps.event.addListener(currentLocation, 'click', () => {
          infoWindow.open(map, currentLocation)
        })
        setAppState((currentState) => ({
          ...currentState,
          locationAddress,
        }))
        setZoomAndCenter(appState)
        myLocationRef.current?.setMap(null)
        myLocationRef.current = currentLocation
      } else {
        console.error('Current address request failed due to: ' + status)
      }
    })
  }
}

export const handleDirectionService = ({ appState, setAppState }: AppStateParams) => (
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

export const handleRenderDirections = ({ appState, setAppState }) => () => {
  const { currentLat, currentLng, destinationLat, destinationLng, travelMode, mapRefs } = appState
  const directionsRenderer = mapRefs?.directionsRendererRef?.current
  const directionsService = mapRefs?.directionsServiceRef?.current

  if (mapRefs && destinationLat && destinationLng) {
    const googleMaps = mapRefs.googleMapsRef.current
    const map = mapRefs.mapRef.current
    const origin = new googleMaps.LatLng(currentLat, currentLng)
    const destination = new googleMaps.LatLng(destinationLat, destinationLng)

    directionsRenderer.setMap(map)
    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      handleDirectionService({
        appState,
        setAppState,
      }),
    )
  }

  if (mapRefs && (!destinationLat || !destinationLng)) {
    clearMap(appState)
  }
}

export const setZoomAndCenter = (appState: AppState) => {
  const { mapRefs, currentLat, currentLng } = appState

  if (!mapRefs) return null

  const googleMaps = mapRefs.googleMapsRef.current
  const bounds = mapRefs.boundsRef.current
  const map = mapRefs.mapRef.current
  const markers = mapRefs.markersRef.current

  if (!googleMaps || !bounds || !map || !markers) return null

  if (!markers.length) {
    return map.setCenter(new googleMaps.LatLng(currentLat, currentLng))
  }

  markers.forEach((marker) => {
    const position = marker.getPosition()
    if (position) bounds.extend(position)
  })
  map.fitBounds(bounds)
  map.setCenter(bounds.getCenter())
}

export const clearMap = ({ mapRefs }: AppState) => {
  if (!mapRefs) return null

  const { directionsRendererRef, markersRef } = mapRefs

  directionsRendererRef?.current?.setMap(null)
  markersRef?.current?.forEach((marker) => marker?.setMap(null))
}

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
  const [appointmentDetailModalVisible, setAppointmentDetailModalVisible] = useState(false)
  const googleMapsRef = useRef<GoogleMaps | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markersRef = useRef<Marker[]>([])
  const directionsRendererRef = useRef<DirectionsRenderer | null>(null)
  const directionsServiceRef = useRef<DirectionsService | null>(null)
  const myLocationRef = useRef<Marker | null>(null)
  const boundsRef = useRef<LatLngBounds | null>(null)
  const { appState, setAppState } = useAppState()
  const coordinates: CoordinateProps[] = useMemo(handleFilterCoordinates(appointments), [appointments])

  const { appointmentId, routeInformation, appointment } = appState
  const modalTitle = getShortAddress(appointment?.property)
  const mapRefs: MapRefs = {
    googleMapsRef,
    mapRef,
    markersRef,
    directionsRendererRef,
    directionsServiceRef,
    myLocationRef,
    boundsRef,
  }

  useEffect(handleSetAppointment({ appointmentId, appointments, setAppState }), [appointmentId, appointments])

  useEffect(handleRenderDirections({ appState, setAppState }), [appState.destinationLat, appState.destinationLng])

  useEffect(
    handleRenderMarkers({
      appState,
      setAppState,
      setAppointmentDetailModalVisible,
      coordinates,
    }),
    [coordinates, appState],
  )

  useEffect(handleRenderMyLocation({ appState, setAppState }), [
    appState.currentLat,
    appState.currentLng,
    appState.mapRefs,
  ])

  useEffect(handleSetMapRefs({ setAppState, mapRefs, appState }), [mapRefs])

  console.log('App state is', appState)

  return (
    <>
      <div style={{ height: '100%' }}>
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
        title={
          <>
            <H5>{modalTitle}</H5>
            {appointment?.appointmentType && (
              <SubTitleH5 className="mb-0">{appointment?.appointmentType?.value}</SubTitleH5>
            )}
          </>
        }
        appointment={appointment || ({} as ExtendedAppointmentModel)}
        visible={appointmentDetailModalVisible}
        destroyOnClose={true}
        onClose={handleModalClose(setAppointmentDetailModalVisible)}
      />
    </>
  )
}

export default memo(GoogleMapComponent)
