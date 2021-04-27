import React, { Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { H5, SubTitleH5, combineAddress } from '@reapit/elements'
import Gmaps, { CoordinateProps, DirectionsResult } from './gmaps'
import { ExtendedAppointmentModel } from '@/types/global'
import MapPanel from '../map-panel'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { AppointmentDetailModal } from '../appointment-detail-modal/appointment-detail-modal'
import { AppState, useAppState } from '../../../core/app-state'
import { NullableCoords } from './gmaps'

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

export const handleFilterInvalidMarker = (appointments: ExtendedAppointmentModel[]) => (): CoordinateProps[] =>
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

export const getDestinationPoint = ({ destinationLat, destinationLng }: AppState) => (): NullableCoords => ({
  lat: destinationLat,
  lng: destinationLng,
})

export const handleMarkerOnClick = (
  appointments: ExtendedAppointmentModel[],
  setAppointment: Dispatch<SetStateAction<ExtendedAppointmentModel | null>>,
  setAppointmentDetailModalVisible: Dispatch<SetStateAction<boolean>>,
) => (id: string) => () => {
  const appointment = appointments.find((item) => item.id === id)
  if (appointment) {
    setAppointment(appointment)
    setAppointmentDetailModalVisible(true)
  }
}

export const handleModalClose = (setAppointmentDetailModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setAppointmentDetailModalVisible(false)
}

export const handleSetAppointment = (
  appointmentId: string | null,
  appointments: ExtendedAppointmentModel[],
  setAppointment: (value: SetStateAction<ExtendedAppointmentModel | null>) => void,
) => () => {
  const appointment = appointments.find((item) => item.id === appointmentId)
  if (appointment) {
    setAppointment(appointment)
  }
}

export const AppointmentMap: FC<AppointmentMapProps> = ({ appointments }) => {
  const [appointment, setAppointment] = useState<ExtendedAppointmentModel | null>(null)
  const [appointmentDetailModalVisible, setAppointmentDetailModalVisible] = useState(false)
  const { appState } = useAppState()

  const [routeInformation, setRouteInformation] = useState<RouteInformation>({ duration: null, distance: null })
  const coordinates: CoordinateProps[] = useMemo(handleFilterInvalidMarker(appointments), [appointments])
  const { appointmentId, destinationLat, destinationLng, travelMode } = appState

  const onLoadedDirections = useCallback(
    (directions: DirectionsResult) => {
      const { duration, distance } = directions.routes[0].legs[0]
      setRouteInformation({ duration, distance })
    },
    [destinationLat, destinationLng, travelMode],
  )

  const destinationPoint = useMemo(getDestinationPoint(appState), [destinationLat, destinationLng, travelMode])

  useEffect(handleSetAppointment(appointmentId, appointments, setAppointment), [appointmentId, appointments])

  const line1 = appointment?.property?.address?.line1 ?? ''
  const buildingName = appointment?.property?.address?.buildingName ?? ''
  const buildingNumber = appointment?.property?.address?.buildingNumber ?? ''
  const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`
  const destinationAddress = combineAddress(appointment?.property?.address)

  return (
    <>
      <Gmaps
        autoFitBounds={Boolean(appointments.length)}
        coordinates={coordinates}
        markerCallBack={handleMarkerOnClick(appointments, setAppointment, setAppointmentDetailModalVisible)}
        onLoadedDirections={onLoadedDirections}
        destinationPoint={destinationPoint}
        destinationAddress={destinationAddress}
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

export default memo(AppointmentMap)
