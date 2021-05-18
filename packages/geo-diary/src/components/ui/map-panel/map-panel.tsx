import React from 'react'
import { MapPanelContainer } from './__styles__'
import { Button, isIOS, ButtonGroup } from '@reapit/elements'
import { AppState, useAppState } from '../../../core/app-state'
import { buttonPaddingSmall } from '../../pages/appointment/__styles__'

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

export type RouteInformation = {
  duration: { text: string; value: number } | null
  distance: { text: string; value: number } | null
}

export type MapPanelProps = {
  routeInformation: RouteInformation
}

export const MapPanel: React.FC<MapPanelProps> = ({ routeInformation }: MapPanelProps) => {
  const { appState } = useAppState()

  return (
    <MapPanelContainer>
      <div>
        <p className="is-size-5 mr-2">{routeInformation.duration?.text}</p>
        <p>{routeInformation.distance?.text}</p>
      </div>
      <ButtonGroup hasSpacing>
        <Button
          className={buttonPaddingSmall}
          type="button"
          variant="primary"
          onClick={handleOpenNativeMap({ appState })}
        >
          Start Journey
        </Button>
      </ButtonGroup>
    </MapPanelContainer>
  )
}

export default MapPanel
