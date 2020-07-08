import React from 'react'
import { Map } from '@reapit/elements'
import { CoordinateProps } from '@reapit/elements/src/components/Map'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'
import { ExtendedAppointmentModel } from '@/types/global'

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

export const AppointmentMap: React.FC<AppointmentMapProps> = ({ appointments, destinationAddress }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const queryString = qs.stringify({
          ...queryParams,
          currentLat: position.coords.latitude,
          currentLng: position.coords.longitude,
        })
        history.push(`?${queryString}`)
      })
    }
  }, [])
  const coordinates: CoordinateProps<any> = React.useMemo(
    () =>
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
      ),
    [appointments],
  )

  const onLoadedDirection = React.useCallback(
    res => {
      const { duration, distance } = res.routes[0].legs[0]
      console.log(duration, distance)
    },
    [queryParams.currentLat, queryParams.currentLng],
  )

  return (
    <Map
      autoFitBounds={true}
      apiKey={window.reapit.config.googleMapApiKey}
      coordinates={coordinates}
      // markerCallBack={handleOnClick}
      onLoadedDirection={onLoadedDirection}
      destinationPoint={{ lat: queryParams.currentLat, lng: queryParams.currentLng }}
      destinationAddress={destinationAddress}
      travelMode={queryParams.travelMode}
      mapContainerStyles={{ height: '100%' }}
      styles={{} /* See import for explanation mapStyles */}
    />
  )
}

export default AppointmentMap
