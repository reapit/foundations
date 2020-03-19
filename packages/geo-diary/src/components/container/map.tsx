import * as React from 'react'
import { CoordinateProps, Coords, Map, combineAddress } from '@reapit/elements'
import { connect } from 'react-redux'
import { ReduxState, ExtendedAppointmentModel } from '@/types/core'
import invalidValues from '@/constants/invalid-values'
import styles from '@/styles/pages/map.scss?mod'
import MapPanel from '../ui/map-panel'
import { appointmentDetailRequestData } from '@/actions/appointment-detail'
import { Dispatch } from 'redux'
// TODO - Commenting out for demo as need better resolution on projector
// import { mapStyles } from './map-styles'

const { UNDEFINED_LATLNG_NUMBER, UNDEFINED_NULL_STRING } = invalidValues

export interface MapContainerMappedState {
  appointments: ExtendedAppointmentModel[] | undefined
  destinationLatLng: {
    lat: number | undefined
    lng: number | undefined
  }
  destinationAddress?: string
  desktopMode: boolean
}

export interface Coordinate {
  position: {
    lat: number
    lng: number
  }
  // type AppointmentPropertyAddressModel have been deprecated: https://dev.platform.reapit.net/appointments/swagger/index.html
  address: any
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
  destinationAddress,
  travelMode,
  handleOnClick,
  desktopMode,
}: MapContainerProps) => {
  const [distance, setDistance] = React.useState('')
  const [duration, setDuration] = React.useState('')
  const [currentLocation, setCurrentLocation] = React.useState<Coords>({
    lat: UNDEFINED_LATLNG_NUMBER,
    lng: UNDEFINED_LATLNG_NUMBER,
  })

  const coordinates: CoordinateProps<any> = filterInvalidMarker(
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
    [destinationLatLng],
  )

  const hasMapPanel = destinationLatLng.lng && destinationLatLng.lat
  return (
    <React.Fragment>
      <div
        className={`${styles.mapContainer} ${desktopMode ? styles.isDesktop : ''} ${
          hasMapPanel ? styles.mapHasPanel : ''
        }`}
      >
        <Map
          autoFitBounds={true}
          apiKey={window.reapit.config.googleMapApiKey}
          coordinates={coordinates}
          markerCallBack={handleOnClick}
          destinationPoint={destinationLatLng}
          destinationAddress={destinationAddress}
          travelMode={travelMode}
          onLoadedDirection={onLoadedDirection}
          mapContainerStyles={{ height: '100%' }}
          styles={{} /* See import for explanation mapStyles */}
        />
      </div>
      <MapPanel
        duration={duration}
        distance={distance}
        currentLocation={currentLocation}
        destination={destinationLatLng}
      />
    </React.Fragment>
  )
}

export const mapStateToProps = (state: ReduxState): MapContainerMappedState => {
  const appointments = state?.appointments?.appointments?._embedded || []
  const destinationLat = state?.direction?.destination?.property?.address?.geolocation?.latitude
  const destinationLng = state?.direction?.destination?.property?.address?.geolocation?.longitude
  const destinationAddress = combineAddress(state?.direction?.destination?.property?.address || {})
  return {
    appointments,
    destinationLatLng: {
      lat: destinationLat,
      lng: destinationLng,
    },
    destinationAddress,
    desktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
  }
}

export const mapDispatchToProps = (dispatch: Dispatch): MapContainerMappedActions => ({
  handleOnClick: (id: string) => () => {
    dispatch(appointmentDetailRequestData({ id }))
  },
})

const MapContainerWithConnect = connect(mapStateToProps, mapDispatchToProps)(MapContainer)

MapContainerWithConnect.displayName = 'CurrentLocButtonWithConnect'

export default MapContainerWithConnect
