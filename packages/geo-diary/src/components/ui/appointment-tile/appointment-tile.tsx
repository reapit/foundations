import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { getTime } from '@reapit/utils-common'
import { ExtendedAppointmentModel } from '../../../types/global'
import { AppointmentItems } from './appointment-items'
import { AppState, useAppState } from '../../../core/app-state'
import { cx } from '@linaria/core'
import {
  CardListHeading,
  CardListMainWrap,
  CardListSubHeading,
  CardWrap,
  elCardFocussed,
  elCardListMainWrapExpanded,
  elMb6,
} from '@reapit/elements'
import { cancelledTile } from './__styles__/styles'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'

dayjs.extend(advancedFormat)

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
}

export const handleSetAppointmentId =
  (setAppState: Dispatch<SetStateAction<AppState>>, appointment: ExtendedAppointmentModel) => () => {
    const { id, property } = appointment
    const destinationLat = property?.address?.geolocation?.latitude ?? null
    const destinationLng = property?.address?.geolocation?.longitude ?? null
    if (id) {
      setAppState((currentState) => ({
        ...currentState,
        appointmentId: id,
        destinationLat,
        destinationLng,
      }))
    }
  }

export const handleScrollIntoView =
  (tileRef: MutableRefObject<HTMLDivElement | null>, appointmentId: string | null, id?: string) => () => {
    if (tileRef.current && appointmentId && id && appointmentId === id) {
      tileRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

export const AppointmentTile: FC<AppointmentTileProps> = ({ appointment }) => {
  const { appState, setAppState } = useAppState()
  const { appointmentId, time } = appState
  const tileRef = useRef<HTMLDivElement>(null)
  const { id, start: appointmentStart } = appointment

  const start = getTime(appointment?.start ?? '')
  const end = getTime(appointment?.end ?? '')
  const appointmentType = appointment.appointmentType?.value
  const cancelledText = appointment.cancelled ? ' - Cancelled ' : ''
  const headingText = `${start} - ${end}${cancelledText}`
  useEffect(handleScrollIntoView(tileRef, appointmentId, id), [appointmentId, id])

  return (
    <div ref={tileRef}>
      <CardWrap
        className={cx(appointmentId === id && elCardFocussed, appointment.cancelled && cancelledTile, elMb6)}
        onClick={handleSetAppointmentId(setAppState, appointment)}
      >
        <CardListMainWrap className={elCardListMainWrapExpanded}>
          <CardListHeading>{headingText}</CardListHeading>
          <CardListSubHeading>
            {appointmentType}
            {time === 'WEEK' && `, ${dayjs(appointmentStart).format('ddd, Do MMMM')}`}
          </CardListSubHeading>
        </CardListMainWrap>
        <AppointmentItems appointment={appointment} />
      </CardWrap>
    </div>
  )
}
