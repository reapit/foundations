import * as React from 'react'
import { CoordinateProps, Coords, Map } from '@reapit/elements'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@/types/appointments'
import invalidValues from '@/constants/invalid-values'
import mapStyles from '@/styles/pages/map.scss?mod'
import MapPanel from '../ui/map-panel'
import { appointmentDetailRequestData } from '@/actions/appointment-detail'
import { Dispatch } from 'redux'

const { UNDEFINED_LATLNG_NUMBER, UNDEFINED_NULL_STRING } = invalidValues

export interface MapContainerMappedState {
  appointments: AppointmentModel[] | undefined
  destinationLatLng: {
    lat: number | undefined
    lng: number | undefined
  }
  isDesktopLogin: boolean
}

export interface Coordinate {
  position: {
    lat: number
    lng: number
  }
  address1: string
  address2: string
  id: string
}

export type MapContainerMappedActions = {
  handleOnClick: (id: string) => () => void
}

export type MapContainerProps = MapContainerMappedState &
  MapContainerMappedActions & {
    travelMode: 'DRIVING' | 'WALKING'
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

export const MapContainer = ({
  appointments = [],
  destinationLatLng,
  travelMode,
  handleOnClick,
  isDesktopLogin
}: MapContainerProps) => {
  const [distance, setDistance] = React.useState('')
  const [duration, setDuration] = React.useState('')
  const [currentLocation, setCurrentLocation] = React.useState<Coords>({
    lat: UNDEFINED_LATLNG_NUMBER,
    lng: UNDEFINED_LATLNG_NUMBER
  })

  const coordinates: CoordinateProps<any> = filterInvalidMarker(
    appointments.map(
      (appointment: AppointmentModel): Coordinate => {
        const lat = oc(appointment).property.address.geolocation.latitude(UNDEFINED_LATLNG_NUMBER)
        const lng = oc(appointment).property.address.geolocation.longitude(UNDEFINED_LATLNG_NUMBER)
        const id = oc(appointment).id(UNDEFINED_NULL_STRING)
        const address1 = oc(appointment).property.address.line1('')
        const address2 = oc(appointment).property.address.line2('')
        return {
          position: {
            lat,
            lng
          },
          address1,
          address2,
          id
        }
      }
    )
  )

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation({ ...currentLocation, lat: position.coords.latitude, lng: position.coords.longitude })
      })
    }
  }, [])

  const onLoadedDirection = React.useCallback(
    res => {
      const { duration, distance } = res.routes[0].legs[0]
      setDistance(distance.text)
      setDuration(duration.text)
    },
    [destinationLatLng]
  )

  const hasMapPanel = destinationLatLng.lng && destinationLatLng.lat

  return (
    <>
      <div
        className={`${mapStyles.mapContainer} ${isDesktopLogin ? mapStyles.isDesktop : ''} ${
          hasMapPanel ? mapStyles.mapHasPanel : ''
        }`}
      >
        <Map
          autoFitBounds={true}
          apiKey={process.env.MAP_API_KEY as string}
          coordinates={coordinates}
          markerCallBack={handleOnClick}
          destinationPoint={destinationLatLng}
          travelMode={travelMode}
          onLoadedDirection={onLoadedDirection}
          mapContainerStyles={{ height: '100%' }}
        />
      </div>
      <MapPanel
        duration={duration}
        distance={distance}
        currentLocation={currentLocation}
        destination={destinationLatLng}
      />
    </>
  )
}

export const mapStateToProps = (state: ReduxState): MapContainerMappedState => {
  const appointments = oc(state).appointments.appointments.data.data([])
  const destinationLat = oc(state).direction.destination.property.address.geolocation.latitude(undefined)
  const destinationLng = oc(state).direction.destination.property.address.geolocation.longitude(undefined)
  return {
    appointments,
    destinationLatLng: {
      lat: destinationLat,
      lng: destinationLng
    },
    isDesktopLogin: !!state.auth.desktopSession
  }
}

export const mapDispatchToProps = (dispatch: Dispatch): MapContainerMappedActions => ({
  handleOnClick: (id: string) => () => {
    dispatch(appointmentDetailRequestData({ id }))
  }
})

const MapContainerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)

MapContainerWithConnect.displayName = 'CurrentLocButtonWithConnect'

export default MapContainerWithConnect
