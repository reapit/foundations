import React from 'react'
import { Map } from '@reapit/elements'
import { CoordinateProps } from '@reapit/elements/src/components/Map'
import { History } from 'history'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'
import { ExtendedAppointmentModel } from '@/types/global'
import { ROUTES } from '@/core/router'
import MapPanel from '../map-pannel'

export const UNDEFINED_LATLNG_NUMBER = 9999
export const UNDEFINED_NULL_STRING = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substr(0, 36)

export interface Coordinate {
  position: {
    lat: number
    lng: number
  }
  address: any
  id: string
}

export const filterInvalidMarker = (markers: Coordinate[]) => {
  return markers.filter(appointments => {
    return (
      appointments.position.lat !== UNDEFINED_LATLNG_NUMBER &&
      appointments.position.lng !== UNDEFINED_LATLNG_NUMBER &&
      appointments.id !== UNDEFINED_NULL_STRING
    )
  })
}

export type AppointmentMapProps = {
  appointments: ExtendedAppointmentModel[]
  destinationAddress?: string
}

export type RouteInformation = {
  duration: { text: string; value: number } | null
  distance: { text: string; value: number } | null
}

export type HandleUseEffectParams = {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleUseEffect = ({ queryParams, history }: HandleUseEffectParams) => () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const queryString = qs.stringify({
        ...queryParams,
        currentLat: position.coords.latitude,
        currentLng: position.coords.longitude,
      })
      history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
    })
  }
}

export const handleFilterInvalidMarker = (appointments: ExtendedAppointmentModel[]) => () =>
  filterInvalidMarker(
    appointments.map(
      (appointment: ExtendedAppointmentModel): Coordinate => {
        const lat = appointment?.property?.address?.geolocation?.latitude || UNDEFINED_LATLNG_NUMBER
        const lng = appointment?.property?.address?.geolocation?.longitude || UNDEFINED_LATLNG_NUMBER
        const id = appointment?.id || UNDEFINED_NULL_STRING
        const address = appointment?.property?.address || {}
        return {
          id,
          address,
          position: {
            lat,
            lng,
          },
        }
      },
    ),
  )

export const getDestinationPoint = (queryParams: qs.ParsedQuery<string>) => () => {
  return { lat: queryParams.destinationLat, lng: queryParams.destinationLng }
}

export const AppointmentMap: React.FC<AppointmentMapProps> = ({ appointments, destinationAddress }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  const [routeInformation, setRouteInformation] = React.useState<RouteInformation>({ duration: null, distance: null })
  React.useEffect(handleUseEffect({ queryParams, history }), [])
  const coordinates: CoordinateProps<any> = React.useMemo(handleFilterInvalidMarker(appointments), [])

  const onLoadedDirection = React.useCallback(
    res => {
      const { duration, distance } = res.routes[0].legs[0]
      setRouteInformation({ duration, distance })
    },
    [queryParams.destinationLat, queryParams.destinationLng],
  )

  const destinationPoint = React.useMemo(getDestinationPoint(queryParams), [
    queryParams.destinationLat,
    queryParams.destinationLng,
  ])

  return (
    <>
      <Map
        autoFitBounds={true}
        apiKey={window.reapit.config.googleMapApiKey}
        coordinates={coordinates}
        // markerCallBack={handleOnClick}
        onLoadedDirection={onLoadedDirection}
        destinationPoint={destinationPoint}
        destinationAddress={destinationAddress}
        travelMode={queryParams.travelMode}
        mapContainerStyles={{ height: '100%' }}
        styles={{} /* See import for explanation mapStyles */}
      />
      <MapPanel routeInformation={routeInformation} />
    </>
  )
}

export default React.memo(AppointmentMap)
