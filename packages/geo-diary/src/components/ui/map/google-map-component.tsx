import React, { Dispatch, FC, memo, SetStateAction, useEffect, useMemo, useRef } from 'react'
import GoogleMap from 'react-google-map'
import { combineAddress } from '@reapit/utils-common'
import { useMediaQuery } from '@reapit/elements'
import { AppState, useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
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
import startPin from '../../../assets/images/pin-customer.svg'
import destinationPin from '../../../assets/images/pin-reapit.svg'
import { cx } from '@linaria/core'
import { DEFAULT_LAT_LNG, DEFAULT_ZOOM } from '../../../core/constants'
import { TravelMode } from '../travel-mode/travel-mode'
import { MapContentContainer, mapContainerHasMapPanel } from './__styles__/index'

export const handleSetAppointment =
  ({ appointments, setAppState, appointmentId }: HandleSetAppointmentParams) =>
  () => {
    const appointment = appointments.find((item) => item.id === appointmentId)
    if (appointment) {
      const destinationAddress = combineAddress(appointment?.property?.address)
      const destinationLat = appointment.property?.address?.geolocation?.latitude ?? null
      const destinationLng = appointment.property?.address?.geolocation?.longitude ?? null

      setAppState((currentState) => ({
        ...currentState,
        appointment,
        destinationLat,
        destinationLng,
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
    <div style="max-width: 200px;padding: 0 1rem 1rem 0; cursor: pointer; font-family: 'PT Sans', Helvetica, Arial, sans-serif; font-size: 0.875rem;" id="coordinate-${latlng.lat}-${latlng.lng}">
      <div>${address}</div>
    </div>
  `
}

export const handleRenderMarkers =
  ({ coordinates, appState, setAppState }: RenderMarkersParams) =>
  () => {
    const { mapRefs } = appState

    const googleMaps = mapRefs?.googleMapsRef?.current
    const map = mapRefs?.mapRef?.current
    const markersRef = mapRefs?.markersRef

    if (googleMaps && map && markersRef) {
      markersRef.current.forEach((marker) => marker && marker.setMap && marker.setMap(null))
      markersRef.current = coordinates.map((coordinate: CoordinateProps) => {
        const latlng = {
          lat: coordinate.position.lat,
          lng: coordinate.position.lng,
        }
        const address = combineAddress(coordinate.address) || ''

        const marker = new googleMaps.Marker({
          position: latlng,
          icon: destinationPin,
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

        return marker
      })

      setZoomAndCenter(appState)
    }
  }

export const handleRenderMyLocation =
  ({ appState, setAppState }: AppStateParams) =>
  () => {
    const { currentLat, currentLng, mapRefs } = appState
    const googleMaps = mapRefs?.googleMapsRef?.current
    const map = mapRefs?.mapRef?.current
    const myLocationRef = mapRefs?.myLocationRef

    if (googleMaps && map && myLocationRef && currentLat && currentLng) {
      const latlng = {
        lat: currentLat,
        lng: currentLng,
      }

      const currentLocation = new googleMaps.Marker({
        position: latlng,
        icon: startPin,
        map,
      })
      const geocoder = new googleMaps.Geocoder()

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          const streetAddress = results && results[0] ? results[0] : null
          const locationAddress = streetAddress?.formatted_address ?? ''
          const infoWindow = new googleMaps.InfoWindow({
            content: renderInfoWindowContent({ latlng, address: locationAddress }),
          })
          googleMaps.event.addListener(currentLocation, 'click', () => {
            infoWindow.open(map, currentLocation)
          })
          myLocationRef.current?.setMap(null)
          myLocationRef.current = currentLocation

          setAppState((currentState) => ({
            ...currentState,
            locationAddress,
            locationQueryLoading: false,
          }))
          setZoomAndCenter(appState)
        } else {
          console.error('Current address request failed due to: ' + status)
        }
      })
    }
  }

export const handleDirectionService =
  ({ appState, setAppState }: AppStateParams) =>
  (response: DirectionsResult, status: google.maps.DirectionsStatus) => {
    const directionsRenderer = appState.mapRefs?.directionsRendererRef.current
    const destinationAddress = appState.destinationAddress ?? ''
    if (status !== 'OK') {
      return clearMap(appState, setAppState)
    }

    response?.routes?.forEach((route) => {
      route.legs.forEach((leg) => {
        leg.end_address = destinationAddress
      })
    })

    if (directionsRenderer && directionsRenderer.setDirections) {
      directionsRenderer.setDirections(response)
    }

    const { duration, distance } = response.routes[0].legs[0]

    if (duration && distance) {
      setAppState((currentState) => ({
        ...currentState,
        routeInformation: {
          duration,
          distance,
        },
      }))
    }
  }

export const handleRenderDirections =
  ({ appState, setAppState }) =>
  () => {
    const { currentLat, currentLng, destinationLat, destinationLng, travelMode, mapRefs } = appState
    const directionsRenderer = mapRefs?.directionsRendererRef?.current
    const directionsService = mapRefs?.directionsServiceRef?.current

    if (mapRefs && destinationLat && destinationLng && currentLat && currentLng) {
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
      clearMap(appState, setAppState)
    }
  }

export const setZoomAndCenter = (appState: AppState) => {
  const { mapRefs } = appState

  if (!mapRefs) return null

  const googleMaps = mapRefs.googleMapsRef.current
  const boundsRef = mapRefs.boundsRef
  const map = mapRefs.mapRef.current
  const markers = mapRefs.markersRef.current
  const myLocation = mapRefs.myLocationRef.current

  if (!googleMaps || !boundsRef || !map || !markers) return null
  boundsRef.current = new googleMaps.LatLngBounds()

  const bounds = boundsRef.current

  if (!myLocation && !markers.length) {
    map.setCenter(DEFAULT_LAT_LNG)
    return map.setZoom(DEFAULT_ZOOM)
  }

  if (myLocation && !markers.length) {
    const position = myLocation.getPosition()
    map.setCenter(position ?? DEFAULT_LAT_LNG)
    return map.setZoom(DEFAULT_ZOOM)
  }

  if (myLocation) {
    const position = myLocation.getPosition()
    if (position) bounds.extend(position)
  }

  markers.forEach((marker) => {
    if (!marker.getPosition) return null
    const position = marker.getPosition()
    if (position) bounds.extend(position)
  })
  map.fitBounds(bounds)
  if (bounds.getCenter) {
    map.setCenter(bounds.getCenter())
  }
  if (markers.length === 1 && !myLocation) {
    map.setZoom(DEFAULT_ZOOM)
  }
}

export const clearMap = (appState: AppState, setAppState: Dispatch<SetStateAction<AppState>>) => {
  const { mapRefs } = appState
  if (!mapRefs) return null

  const { directionsRendererRef, markersRef } = mapRefs

  setAppState((currentState) => ({
    ...currentState,
    routeInformation: null,
    destinationAddress: null,
  }))

  directionsRendererRef?.current?.setMap(null)
  markersRef?.current?.forEach((marker) => marker && marker.setMap && marker?.setMap(null))
}

export const handleSetMapRefs =
  ({ mapRefs, setAppState, appState }: HandleSetMapParams) =>
  () => {
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
  const googleMapsRef = useRef<GoogleMaps | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markersRef = useRef<Marker[]>([])
  const directionsRendererRef = useRef<DirectionsRenderer | null>(null)
  const directionsServiceRef = useRef<DirectionsService | null>(null)
  const myLocationRef = useRef<Marker | null>(null)
  const boundsRef = useRef<LatLngBounds | null>(null)
  const { appState, setAppState } = useAppState()
  const coordinates: CoordinateProps[] = useMemo(handleFilterCoordinates(appointments), [appointments])
  const { isMobile, isTablet } = useMediaQuery()
  const { appointmentId, routeInformation, destinationLat, destinationLng, travelMode, currentLat, currentLng } =
    appState
  const mapRefs: MapRefs = {
    googleMapsRef,
    mapRef,
    markersRef,
    directionsRendererRef,
    directionsServiceRef,
    myLocationRef,
    boundsRef,
  }
  const hasMapRefs = Boolean(appState.mapRefs)

  useEffect(handleSetMapRefs({ setAppState, mapRefs, appState }), [mapRefs])

  useEffect(handleRenderMyLocation({ appState, setAppState }), [currentLat, currentLng, hasMapRefs])

  useEffect(handleSetAppointment({ appointmentId, appointments, setAppState }), [appointmentId, appointments])

  useEffect(handleRenderDirections({ appState, setAppState }), [
    currentLat,
    currentLng,
    destinationLat,
    destinationLng,
    travelMode,
  ])

  useEffect(
    handleRenderMarkers({
      appState,
      setAppState,
      coordinates,
    }),
    [coordinates, currentLat, currentLng, travelMode],
  )

  return (
    <>
      <MapContentContainer className={cx(routeInformation && mapContainerHasMapPanel)}>
        <GoogleMap
          autoFitBounds={Boolean(appointments.length)}
          googleMaps={window.google.maps}
          apiKey={process.env.googleMapApiKey}
          onLoaded={handleOnLoaded(mapRefs)}
          zoom={DEFAULT_ZOOM}
          center={{ lat: currentLat ?? DEFAULT_LAT_LNG.lat, lng: currentLng ?? DEFAULT_LAT_LNG.lng }}
          mapTypeControl={false}
          fullscreenControl={false}
          zoomControlOptions={{
            position: google?.maps?.ControlPosition.TOP_RIGHT,
          }}
          streetViewControlOptions={{
            position: google?.maps?.ControlPosition.TOP_RIGHT,
          }}
        />
        {(isMobile || isTablet) && routeInformation && <TravelMode />}
      </MapContentContainer>
      <MapPanel routeInformation={routeInformation} />
    </>
  )
}

export default memo(GoogleMapComponent)
