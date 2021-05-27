import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { VendorLandlordModel } from '../components/pages/appointment/appointment'
import { ContactDrawerType } from '../components/ui/contact-drawer'
import { Distance, Duration, GeocoderResult, MapRefs } from '../components/ui/map/types'
import { ExtendedAppointmentModel } from '../types/global'
import { getGeoCoords } from '../utils/map-utils'

export type AppTimeRange = 'TODAY' | 'TOMORROW' | 'WEEK'
export type AppTravelMode = 'DRIVING' | 'WALKING'
export type AppTab = 'MAP' | 'LIST'

export interface AppState {
  currentLat: number | null
  currentLng: number | null
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
  locationAddress: string | null
  mapRefs: MapRefs | null
  locationQueryAddress: string | null
  locationQueryResults: GeocoderResult[]
  contactDrawerOpen: boolean
  contactDrawerType: ContactDrawerType
  contactId: string | null
  vendors: VendorLandlordModel[]
  landlords: VendorLandlordModel[]
  hasAmlApp: boolean
}

export interface AppStateContextProps {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const defaultAppState: AppState = {
  currentLat: null,
  currentLng: null,
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
  locationAddress: null,
  mapRefs: null,
  locationQueryAddress: null,
  locationQueryResults: [],
  contactDrawerOpen: false,
  contactDrawerType: ContactDrawerType.ATTENDEE,
  contactId: null,
  vendors: [],
  landlords: [],
  hasAmlApp: false,
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const { Provider } = AppStateContext

export const AppStateProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(defaultAppState)

  useEffect(() => {
    const getAppState = async () => {
      const geoCoords = await getGeoCoords()
      setAppState((currentState) => ({
        ...currentState,
        ...geoCoords,
      }))
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
