import * as React from 'react'
import { Map, CoordinateProps } from '@reapit/elements'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@/types/appointments'
import invalidValues from '@/constants/invalid-values'
import { MarkerComponentWithConnect } from '@/components/container/marker-component'
import mapStyles from '@/styles/pages/map.scss?mod'
import TravelMode from '../ui/travel-mode'
import MapPanel from '../ui/map-panel'

const { UNDEFINED_LATLNG_NUMBER, UNDEFINED_NULL_STRING } = invalidValues

export interface MapContainerMappedState {
  appointments: AppointmentModel[] | undefined
  destinationLatLng: {
    lat: number | undefined
    lng: number | undefined
  }
}

export type MapContainerProps = MapContainerMappedState

export const filterInvalidMarker = (markers: CoordinateProps<any>) => {
  return markers.filter(appointments => {
    return (
      appointments.lat !== UNDEFINED_LATLNG_NUMBER &&
      appointments.lng !== UNDEFINED_LATLNG_NUMBER &&
      appointments.id !== UNDEFINED_NULL_STRING
    )
  })
}

export const MapContainer = ({ appointments = [], destinationLatLng }: MapContainerProps) => {
  const [travelMode, setTravelMode] = React.useState<'DRIVING' | 'WALKING'>('DRIVING')
  const [distance, setDistance] = React.useState('')
  const [duration, setDuration] = React.useState('')

  const coordinates: CoordinateProps<any> = filterInvalidMarker(
    appointments.map(appointment => {
      const lat = oc(appointment).property.geolocation.latitude(UNDEFINED_LATLNG_NUMBER)
      const lng = oc(appointment).property.geolocation.longitude(UNDEFINED_LATLNG_NUMBER)
      const id = oc(appointment).id(UNDEFINED_NULL_STRING)
      const address1 = oc(appointment).property.line1('')
      const address2 = oc(appointment).property.line2('')
      return {
        position: {
          lat,
          lng
        },
        address1,
        address2,
        id
      }
    })
  )

  const handleTravelMode = React.useCallback(
    value => {
      setTravelMode(value)
    },
    [travelMode]
  )

  const onLoadedDirection = React.useCallback(
    res => {
      const { duration, distance } = res.routes[0].legs[0]
      setDistance(distance.text)
      setDuration(duration.text)
    },
    [destinationLatLng]
  )

  return (
    <div className={mapStyles.mapContainer}>
      <Map
        autoFitBounds={true}
        apiKey={process.env.MAP_API_KEY as string}
        coordinates={coordinates}
        component={MarkerComponentWithConnect}
        destinationPoint={destinationLatLng}
        defaultZoom={16}
        travelMode={travelMode}
        onLoadedDirection={onLoadedDirection}
      />
      <TravelMode travelMode={travelMode} onChangeTravelMode={handleTravelMode} />
      <MapPanel duration={duration} distance={distance} destination={destinationLatLng} />
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): MapContainerMappedState => {
  const appointments = oc(state).appointments.appointments.data.data([])
  const destinationLat = oc(state).direction.destination.property.geolocation.latitude(undefined)
  const destinationLng = oc(state).direction.destination.property.geolocation.longitude(undefined)
  return {
    appointments,
    destinationLatLng: {
      lat: destinationLat,
      lng: destinationLng
    }
  }
}

const MapContainerWithConnect = connect(mapStateToProps)(MapContainer)

MapContainerWithConnect.displayName = 'CurrentLocButtonWithConnect'

export default MapContainerWithConnect
