import React from 'react'
import { MapPanelContainer, mapPanelContainerExpanded, MapPanelItem } from './__styles__'
import { isIOS } from '@reapit/utils-common'
import { Button, Subtitle, useMediaQuery } from '@reapit/elements'
import { AppState, useAppState } from '../../../core/app-state'
import { cx } from '@linaria/core'
import { TravelMode } from '../travel-mode/travel-mode'

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
  ios?: boolean
}
export const handleOpenNativeMap =
  ({ appState, ios = isIOS() }: HandleOpenNativeMapParams) =>
  () => {
    window.open(getMapUrl({ appState, isIOS: ios }))
  }

export type RouteInformation = {
  duration: { text: string; value: number } | null
  distance: { text: string; value: number } | null
}

export type MapPanelProps = {
  routeInformation: RouteInformation | null
}

export const MapPanel: React.FC<MapPanelProps> = ({ routeInformation }: MapPanelProps) => {
  const { appState } = useAppState()
  const { isDesktop, isWideScreen } = useMediaQuery()

  return (
    <MapPanelContainer className={cx(routeInformation && mapPanelContainerExpanded)}>
      {(isDesktop || isWideScreen) && (
        <MapPanelItem>
          <TravelMode />
        </MapPanelItem>
      )}
      <MapPanelItem>
        <Subtitle hasBoldText>ETA</Subtitle>
        <p>{routeInformation?.duration?.text}</p>
      </MapPanelItem>
      <MapPanelItem>
        <Subtitle hasBoldText>Distance</Subtitle>
        <p>{routeInformation?.distance?.text}</p>
      </MapPanelItem>
      <MapPanelItem>
        <Button type="button" intent="primary" onClick={handleOpenNativeMap({ appState })}>
          Start Journey
        </Button>
      </MapPanelItem>
    </MapPanelContainer>
  )
}

export default MapPanel
