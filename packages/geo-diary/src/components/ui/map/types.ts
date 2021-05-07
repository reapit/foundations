import { PropertyAddressModel } from '@reapit/foundations-ts-definitions'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { AppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'

export type GoogleMaps = typeof google.maps
export type Map = google.maps.Map
export type DirectionsRenderer = google.maps.DirectionsRenderer
export type DirectionsService = google.maps.DirectionsService
export type DirectionsResult = google.maps.DirectionsResult
export type Marker = google.maps.Marker
export type LatLngBounds = google.maps.LatLngBounds
export type Duration = google.maps.Duration
export type Distance = google.maps.Distance
export type GeocoderResult = google.maps.GeocoderResult

export interface MapRefs {
  googleMapsRef: MutableRefObject<typeof google.maps | null>
  mapRef: MutableRefObject<Map | null>
  markersRef: MutableRefObject<Marker[]>
  directionsRendererRef: MutableRefObject<DirectionsRenderer | null>
  directionsServiceRef: MutableRefObject<DirectionsService | null>
  myLocationRef: MutableRefObject<Marker | null>
  boundsRef: MutableRefObject<LatLngBounds | null>
}

export interface MapProps {
  appointments: ExtendedAppointmentModel[]
}

export interface HandleSetMapParams {
  mapRefs: MapRefs
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export type Coords = {
  lat: number
  lng: number
}

export interface CoordinateProps {
  position: Coords
  id: string
  address: PropertyAddressModel
}

export interface RenderInfoWindowParams {
  latlng: Coords
  address: string
}

export interface RenderMarkersParams {
  coordinates: CoordinateProps[]
  setAppState: Dispatch<SetStateAction<AppState>>
  appState: AppState
}

export interface Coordinate {
  position: {
    lat: number
    lng: number
  }
  address: any
  id: string
}

export interface AppStateParams {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export interface HandleSetAppointmentParams {
  appointmentId: string | null
  appointments: ExtendedAppointmentModel[]
  setAppState: Dispatch<SetStateAction<AppState>>
}

export interface HandleMarkerClickParams {
  appointmentId: string | null
  setAppState: Dispatch<SetStateAction<AppState>>
}
