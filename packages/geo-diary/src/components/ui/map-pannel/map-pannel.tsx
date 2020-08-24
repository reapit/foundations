import React from 'react'
import qs from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'
import { mapPanelContainer } from './__styles__'
import { RouteInformation, UNDEFINED_LATLNG_NUMBER } from '../map/map'
import { Button, isMobile, isIOS } from '@reapit/elements'
import { ROUTES } from '@/core/router'

export type GetMapUrlParams = {
  queryParams: qs.ParsedQuery<string>
  isIOS?: boolean
}

export const getMapUrl = ({ queryParams, isIOS = true }: GetMapUrlParams) => {
  let mapUrl = ''
  if (isIOS) {
    mapUrl += 'maps'
  } else {
    mapUrl += 'https'
  }

  mapUrl += '://maps.google.com/maps?'
  const isValidCurrentLatAndLng =
    !!queryParams.currentLat &&
    queryParams.currentLat !== UNDEFINED_LATLNG_NUMBER &&
    !!queryParams.currentLng &&
    queryParams.currentLng !== UNDEFINED_LATLNG_NUMBER
  if (isValidCurrentLatAndLng) {
    mapUrl += `saddr=${queryParams.currentLat},${queryParams.currentLng}&`
  }
  const isValidDestinationLatAndLng =
    !!queryParams.destinationLat &&
    queryParams.destinationLat !== UNDEFINED_LATLNG_NUMBER &&
    !!queryParams.destinationLng &&
    queryParams.destinationLng !== UNDEFINED_LATLNG_NUMBER

  if (isValidDestinationLatAndLng) {
    mapUrl += `daddr=${queryParams.destinationLat},${queryParams.destinationLng}`
  }

  return mapUrl
}

export type HandleOpenNativeMapParams = {
  queryParams: qs.ParsedQuery<string>
}
export const handleOpenNativeMap = ({ queryParams }: HandleOpenNativeMapParams) => () => {
  window.open(getMapUrl({ queryParams, isIOS: isIOS() }))
}

export const handleChangeTab = ({ queryParams, history }) => () => {
  const queryString = qs.stringify({
    ...queryParams,
    destinationLat: undefined,
    destinationLng: undefined,
    appointmentId: undefined,
  })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

const filterText = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  weekView: 'Week View',
}

export type MapPanelProps = {
  routeInformation: RouteInformation
}

export const MapPanel: React.FC<MapPanelProps> = ({ routeInformation }: MapPanelProps) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  if (!queryParams.destinationLat && !queryParams.destinationLng) {
    return null
  }
  return (
    <div className={mapPanelContainer}>
      <div>
        <p className="is-size-4">{routeInformation.duration?.text}</p>
        <p>{routeInformation.distance?.text}</p>
      </div>
      <div>
        <Button className="is-medium" type="button" variant="info" onClick={handleOpenNativeMap({ queryParams })}>
          Start Journey
        </Button>
      </div>
      {!isMobile() && (
        <div>
          <Button
            className="is-medium"
            type="button"
            variant="info"
            onClick={handleChangeTab({ queryParams, history })}
          >
            {filterText[queryParams.time || 'today']}
          </Button>
        </div>
      )}
    </div>
  )
}

export default MapPanel
