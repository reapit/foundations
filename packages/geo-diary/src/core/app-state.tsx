/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { VendorLandlordModel } from '../components/pages/appointment/appointment'
import { ContactDrawerType } from '../components/ui/contact-drawer'
import { Distance, Duration, GeocoderResult, MapRefs } from '../components/ui/map/types'
import { ExtendedAppointmentModel } from '../types/global'
import { getGeoCoords } from '../utils/map-utils'
import qs from 'qs'

export type AppTimeRange = 'TODAY' | 'TOMORROW' | 'WEEK' | 'CUSTOM'
export type AppTravelMode = 'DRIVING' | 'WALKING'
export type AppTab = 'MAP' | 'LIST'
export interface AppRouteInformation {
  duration: Duration
  distance: Distance
}
export interface ApptQueryString {
  appointmentId: string
  start: string
  end: string
  negotiatorId: string
}

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
  routeInformation: AppRouteInformation | null
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
  apptQuery: ApptQueryString | null
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
  apptQuery: null,
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const { Provider } = AppStateContext

export const AppStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const rawApptQuery = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const { appointmentId, start, end, negotiatorId } = rawApptQuery ?? {}
  const apptQuery =
    appointmentId && start && end && negotiatorId
      ? ({ appointmentId, start, end, negotiatorId } as ApptQueryString)
      : null
  const mergedAppState = apptQuery
    ? { ...defaultAppState, apptQuery, appointmentId: appointmentId as string }
    : defaultAppState

  const [appState, setAppState] = useState<AppState>(mergedAppState)

  useEffect(() => {
    const getAppState = async () => {
      const geoCoords = await getGeoCoords()
      setAppState((currentState) => ({
        ...currentState,
        ...geoCoords,
      }))
    }
    getAppState().catch((error) => console.error(error))
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
