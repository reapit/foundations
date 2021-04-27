import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { getAppStateWithGeoCoords } from '../utils/map-utils'

export type AppTimeRange = 'TODAY' | 'TOMORROW' | 'WEEK'
export type AppTravelMode = 'DRIVING' | 'WALKING'
export type AppTab = 'MAP' | 'LIST'

export interface AppState {
  currentLat: number
  currentLng: number
  hasGeoLocation: boolean
  time: AppTimeRange
  travelMode: AppTravelMode
  destinationLat: number | null
  destinationLng: number | null
  appointmentId: string | null
  tab: AppTab
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
  tab: 'LIST',
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
  console.log('APP STATE IS', appState)
  return {
    appState,
    setAppState,
  }
}
