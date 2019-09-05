import * as React from 'react'
import { Map } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@/types/appointments'
import { oc } from 'ts-optchain'
import invalidValues from '@/constants/invalid-values'
import { connect } from 'react-redux'
import { MarkerComponentWithConnect, MarkerPropsExened } from '@/components/container/marker-component'
import mapStyles from '@/styles/pages/map.scss?mod'

const { UNDEFINED_LATLNG_NUMBER, UNDEFINED_NULL_STRING } = invalidValues

export interface MapContainerMappedState {
  appointments: AppointmentModel[]
}

export type MapContainerProps = MapContainerMappedState

export const filterInvalidMarker = (markers: MarkerPropsExened[]) => {
  return markers.filter(appointments => {
    return (
      appointments.lat !== UNDEFINED_LATLNG_NUMBER &&
      appointments.lng !== UNDEFINED_LATLNG_NUMBER &&
      appointments.id !== UNDEFINED_NULL_STRING
    )
  })
}

export const MapContainer = ({ appointments }: MapContainerProps) => {
  const markers: MarkerPropsExened[] = filterInvalidMarker(
    appointments.map(appointment => {
      const lat = oc(appointment).property.geolocation.latitude(UNDEFINED_LATLNG_NUMBER)
      const lng = oc(appointment).property.geolocation.longitude(UNDEFINED_LATLNG_NUMBER)
      const id = oc(appointment).id(UNDEFINED_NULL_STRING)
      const address1 = oc(appointment).property.line1('')
      const address2 = oc(appointment).property.line2('')

      return {
        lat,
        lng,
        address1,
        address2,
        id
      }
    })
  )

  return (
    <div className={mapStyles.mapContainer}>
      <Map
        apiKey={process.env.MAP_API_KEY as string}
        markers={markers}
        component={MarkerComponentWithConnect}
        defaultCenter={{ lat: 52.158116, lng: -0.433449 }}
        defaultZoom={16}
      />
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): MapContainerMappedState => {
  const appointments = oc(state.appointments.appointments).data.data([])

  return {
    appointments
  }
}

const MapContainerWithConnect = connect(mapStateToProps)(MapContainer)

MapContainerWithConnect.displayName = 'CurrentLocButtonWithConnect'

export default MapContainerWithConnect
