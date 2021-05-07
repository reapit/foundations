import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { getTime, H5, SubTitleH6 } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import { AppointmentItems } from './appointment-items'
import { AppState, useAppState } from '../../../core/app-state'
import { highlightTile, AppointmentTileContainer, AppointmentTileHeadingWrap, cancelledTile } from './__styles__/styles'
import { cx } from 'linaria'
import { ContextMenu } from '../context-menu/index'

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
}

export const handleSetAppointmentId = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  appointment: ExtendedAppointmentModel,
) => () => {
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

export const handleScrollIntoView = (
  tileRef: MutableRefObject<HTMLDivElement | null>,
  appointmentId: string | null,
  id?: string,
) => () => {
  if (tileRef.current && appointmentId && id && appointmentId === id) {
    tileRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

export const AppointmentTile: FC<AppointmentTileProps> = ({ appointment }) => {
  const { appState, setAppState } = useAppState()
  const { appointmentId } = appState
  const tileRef = useRef<HTMLDivElement>(null)
  const { id } = appointment

  const start = getTime(appointment?.start ?? '')
  const end = getTime(appointment?.end ?? '')
  const appointmentType = appointment.appointmentType?.value
  const cancelledText = appointment.cancelled ? ' - Cancelled ' : ''
  const headingText = `${start} - ${end}${cancelledText}`
  useEffect(handleScrollIntoView(tileRef, appointmentId, id), [appointmentId, id])

  return (
    <>
      <div onClick={handleSetAppointmentId(setAppState, appointment)} ref={tileRef}>
        <AppointmentTileContainer
          className={cx(appointmentId === id && highlightTile, appointment.cancelled && cancelledTile)}
        >
          <AppointmentTileHeadingWrap>
            <div>
              <H5 className="text-ellipsis">{headingText}</H5>
              {appointmentType && <SubTitleH6>{appointmentType}</SubTitleH6>}
            </div>
            <ContextMenu appointment={appointment} />
          </AppointmentTileHeadingWrap>
          <AppointmentItems appointment={appointment} />
        </AppointmentTileContainer>
      </div>
    </>
  )
}
