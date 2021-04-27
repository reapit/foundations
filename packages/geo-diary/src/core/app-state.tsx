import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ExtendedAppointmentModel } from '../types/global'
import { getAppStateWithGeoCoords } from '../utils/map-utils'

export type AppTimeRange = 'TODAY' | 'TOMORROW' | 'WEEK'
export type AppTravelMode = 'DRIVING' | 'WALKING'
export type AppTab = 'MAP' | 'LIST'
export type GoogleMaps = typeof google.maps
export type Map = google.maps.Map
export type DirectionsRenderer = google.maps.DirectionsRenderer
export type DirectionsService = google.maps.DirectionsService
export type DirectionsResult = google.maps.DirectionsResult
export type Marker = google.maps.Marker
export type LatLngBounds = google.maps.LatLngBounds
export type Duration = google.maps.Duration
export type Distance = google.maps.Distance

export interface MapRefs {
  googleMapsRef: MutableRefObject<typeof google.maps | null>
  mapRef: MutableRefObject<Map | null>
  markersRef: MutableRefObject<Marker[]>
  directionsRendererRef: MutableRefObject<DirectionsRenderer | null>
  boundsRef: MutableRefObject<LatLngBounds | null>
  directionsServiceRef: MutableRefObject<DirectionsService | null>
}

export interface AppState {
  currentLat: number
  currentLng: number
  hasGeoLocation: boolean
  time: AppTimeRange
  travelMode: AppTravelMode
  destinationLat: number | null
  destinationLng: number | null
  appointmentId: string | null
  appointment: ExtendedAppointmentModel | null
  tab: AppTab
  routeInformation: {
    duration: Duration
    distance: Distance
  } | null
  destinationAddress: string | null
  mapRefs: MapRefs | null
}

export interface AppStateContextProps {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const defaultAppState: AppState = {
  currentLat: 51.509865,
  currentLng: -0.118092,
  hasGeoLocation: false,
  time: 'TODAY',
  travelMode: 'DRIVING',
  destinationLat: null,
  destinationLng: null,
  appointmentId: null,
  appointment: null,
  tab: 'LIST',
  routeInformation: null,
  destinationAddress: null,
  mapRefs: null,
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const { Provider } = AppStateContext

export const AppStateProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(defaultAppState)

  useEffect(() => {
    const getAppState = async () => {
      const initialAppState = await getAppStateWithGeoCoords(defaultAppState)
      setAppState(initialAppState)
    }
    getAppState()
  }, [])

  return (
    <Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppState = () => {
  const { appState, setAppState } = useContext(AppStateContext)
  return {
    appState,
    setAppState,
  }
}
