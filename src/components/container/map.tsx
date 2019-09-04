import * as React from 'react'
import { Map } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@/types/appointments'
import { oc } from 'ts-optchain'
import invalidValues from '@/constants/invalid-values'
import { connect } from 'react-redux'

const { UNDEFINED_LATLNG_NUMBER } = invalidValues

export interface MapContainerMappedState {
  appointments: AppointmentModel[]
}

export type MapContainerProps = MapContainerMappedState

/**
 * This is a dummy component
 * Will be replaced in my next task: CLD - 192
 */
const MarkerComponent = () => {
  return <div />
}

export const filterInvalidMarker = markers => {
  return markers.filter(appointments => {
    return appointments.lat !== UNDEFINED_LATLNG_NUMBER && appointments.lng !== UNDEFINED_LATLNG_NUMBER
  })
}

export const MapContainer = ({ appointments }: MapContainerProps) => {
  const markers = filterInvalidMarker(
    appointments.map(appointment => {
      const lat = oc(appointment.property).geolocation.latitude(UNDEFINED_LATLNG_NUMBER)
      const lng = oc(appointment.property).geolocation.longitude(UNDEFINED_LATLNG_NUMBER)

      return {
        lat,
        lng,
        title: '',
        content: ''
      }
    })
  )

  return (
    <Map
      component={MarkerComponent}
      apiKey={process.env.MAP_API_KEY as string}
      markers={markers}
      defaultCenter={{ lat: 52.158116, lng: -0.433449 }}
      defaultZoom={16}
    />
  )
}

export const mapStateToProps = (state: ReduxState): MapContainerMappedState => {
  const appointments = oc(state.appointments.appointments).data.data([])

  return {
    appointments
  }
}

const MapContainerWithConnect = connect(
  mapStateToProps,
  null
)(MapContainer)

MapContainerWithConnect.displayName = 'CurrentLocButtonWithConnect'

export default MapContainerWithConnect
