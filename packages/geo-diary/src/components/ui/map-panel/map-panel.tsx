import React, { Dispatch, SetStateAction } from 'react'
import { mapPanelContainer } from './__styles__'
import { RouteInformation } from '../map/map'
import { Button, isMobile, isIOS, ButtonGroup } from '@reapit/elements'
import { AppState, useAppState } from '../../../core/app-state'

export type GetMapUrlParams = {
  appState: AppState
  isIOS?: boolean
}

export const getMapUrl = ({ appState, isIOS = true }: GetMapUrlParams) => {
  const { currentLat, currentLng, destinationLat, destinationLng } = appState
  const prefix = isIOS ? 'maps' : 'https'

  const url = '://maps.google.com/maps?'
  const from = `saddr=${currentLat},${currentLng}&`
  const to = `daddr=${destinationLat},${destinationLng}`

  return `${prefix}${url}${from}${to}`
}

export type HandleOpenNativeMapParams = {
  appState: AppState
}
export const handleOpenNativeMap = ({ appState }: HandleOpenNativeMapParams) => () => {
  window.open(getMapUrl({ appState, isIOS: isIOS() }))
}

export interface HandleChangeTabParams {
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const handleChangeTab = ({ setAppState }: HandleChangeTabParams) => () => {
  setAppState((currentState) => ({
    ...currentState,
    destinationLat: null,
    destinationLng: null,
    appointmentId: null,
  }))
}

const filterText = {
  TODAY: 'Today',
  TOMORROW: 'Tomorrow',
  WEEK: 'Week View',
}

export type MapPanelProps = {
  routeInformation: RouteInformation
}

export const MapPanel: React.FC<MapPanelProps> = ({ routeInformation }: MapPanelProps) => {
  const { appState, setAppState } = useAppState()
  const { destinationLat, destinationLng, time } = appState

  if (!destinationLat && !destinationLng) {
    return null
  }
  return (
    <div className={mapPanelContainer}>
      <div>
        <p className="is-size-4 mr-4">{routeInformation.duration?.text}</p>
        <p>{routeInformation.distance?.text}</p>
      </div>
      <ButtonGroup hasSpacing>
        <Button type="button" variant="primary" onClick={handleOpenNativeMap({ appState })}>
          Start Journey
        </Button>
        {!isMobile() && (
          <Button type="button" variant="primary" onClick={handleChangeTab({ setAppState })}>
            {filterText[time]}
          </Button>
        )}
      </ButtonGroup>
    </div>
  )
}

export default MapPanel
