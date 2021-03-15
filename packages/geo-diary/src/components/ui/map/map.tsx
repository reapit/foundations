import React from 'react'
import { H5, SubTitleH5, combineAddress } from '@reapit/elements'
import Gmaps from './gmaps'
import { CoordinateProps } from '@reapit/elements'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { ExtendedAppointmentModel } from '@/types/global'
import MapPanel from '../map-pannel'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { AppointmentDetailModal } from '../appointment-detail-modal/appointment-detail-modal'

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
  return markers.filter((appointments) => {
    return (
      appointments.position.lat !== UNDEFINED_LATLNG_NUMBER &&
      appointments.position.lng !== UNDEFINED_LATLNG_NUMBER &&
      appointments.id !== UNDEFINED_NULL_STRING
    )
  })
}

export type AppointmentMapProps = {
  appointments: ExtendedAppointmentModel[]
}

export type RouteInformation = {
  duration: { text: string; value: number } | null
  distance: { text: string; value: number } | null
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

export type RenderModalTitleParams = {
  appointmentType?: ListItemModel
  heading: string
}
export const renderModalTitle = ({ appointmentType, heading }) => {
  return (
    <>
      {heading && <H5>{heading}</H5>}
      {appointmentType && <SubTitleH5 className="mb-0">{appointmentType?.value}</SubTitleH5>}
    </>
  )
}

export const getDestinationPoint = (queryParams: qs.ParsedQuery<string>) => () => {
  return { lat: queryParams.destinationLat, lng: queryParams.destinationLng }
}

export const handleMarkerOnClick = (
  appointments: ExtendedAppointmentModel[],
  setAppointment: React.Dispatch<React.SetStateAction<ExtendedAppointmentModel | null>>,
  setAppointmentDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => (id: string) => () => {
  const appointment = appointments.find((item) => item.id === id)
  if (appointment) {
    setAppointment(appointment)
    setAppointmentDetailModalVisible(true)
  }
}

export const handleModalClose = (
  setAppointmentDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  setAppointmentDetailModalVisible(false)
}

export const handleSetAppointment = (
  appointmentId: string,
  appointments: ExtendedAppointmentModel[],
  setAppointment: (value: React.SetStateAction<ExtendedAppointmentModel | null>) => void,
) => {
  return () => {
    const appointment = appointments.find((item) => item.id === appointmentId)
    if (appointment) {
      setAppointment(appointment)
    }
  }
}

export const AppointmentMap: React.FC<AppointmentMapProps> = ({ appointments }) => {
  const [appointment, setAppointment] = React.useState<ExtendedAppointmentModel | null>(null)
  const [appointmentDetailModalVisible, setAppointmentDetailModalVisible] = React.useState(false)
  const location = useLocation()
  const queryParams = qs.parse(location.search)
  const [routeInformation, setRouteInformation] = React.useState<RouteInformation>({ duration: null, distance: null })
  const coordinates: CoordinateProps<any> = React.useMemo(handleFilterInvalidMarker(appointments), [appointments])
  const { appointmentId = '' } = queryParams

  const onLoadedDirection = React.useCallback(
    (res) => {
      const { duration, distance } = res.routes[0].legs[0]
      setRouteInformation({ duration, distance })
    },
    [queryParams.destinationLat, queryParams.destinationLng, queryParams.travelMode],
  )

  const destinationPoint = React.useMemo(getDestinationPoint(queryParams), [
    queryParams.destinationLat,
    queryParams.destinationLng,
    queryParams.travelMode,
  ])

  React.useEffect(handleSetAppointment(appointmentId, appointments, setAppointment), [appointmentId, appointments])

  const line1 = appointment?.property?.address?.line1 ?? ''
  const buildingName = appointment?.property?.address?.buildingName ?? ''
  const buildingNumber = appointment?.property?.address?.buildingNumber ?? ''
  const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`
  const destinationAddress = combineAddress(appointment?.property?.address)

  return (
    <>
      <Gmaps
        autoFitBounds={Boolean(appointments.length)}
        apiKey={window.reapit.config.googleMapApiKey}
        coordinates={coordinates}
        markerCallBack={handleMarkerOnClick(appointments, setAppointment, setAppointmentDetailModalVisible)}
        onLoadedDirection={onLoadedDirection}
        destinationPoint={destinationPoint}
        destinationAddress={destinationAddress}
        travelMode={queryParams.travelMode}
        mapContainerStyles={{ height: '100%' }}
        styles={{} /* See import for explanation mapStyles */}
      />
      {destinationAddress && <MapPanel routeInformation={routeInformation} />}
      <AppointmentDetailModal
        title={renderModalTitle({ heading, appointmentType: appointment?.appointmentType })}
        appointment={appointment || ({} as ExtendedAppointmentModel)}
        visible={appointmentDetailModalVisible}
        destroyOnClose={true}
        onClose={handleModalClose(setAppointmentDetailModalVisible)}
      />
    </>
  )
}

export default React.memo(AppointmentMap)
