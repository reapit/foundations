import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { H5, Section } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import { AppointmentFooter } from './appointment-footer'
import { AppointmentItems } from './appointment-items'
import { AppState, useAppState } from '../../../core/app-state'
import { highlightTile, appointmentTile } from './__styles__/styles'
import { cx } from 'linaria'
import { getShortAddress } from '../../../utils/formatting-utils'

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
  nextAppointment?: ExtendedAppointmentModel
}

export const handleSetAppointmentId = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  appointmentId?: string,
) => () => {
  if (appointmentId) {
    setAppState((currentState) => ({
      ...currentState,
      appointmentId,
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

export const AppointmentTile: FC<AppointmentTileProps> = ({ appointment, nextAppointment }) => {
  const { appState, setAppState } = useAppState()
  const { appointmentId } = appState
  const tileRef = useRef<HTMLDivElement>(null)
  const { id, property } = appointment
  const headingText = getShortAddress(property)

  useEffect(handleScrollIntoView(tileRef, appointmentId, id), [appointmentId, id])

  return (
    <div onClick={handleSetAppointmentId(setAppState, id)} ref={tileRef}>
      <Section className={cx(appointmentTile, appointmentId === id && highlightTile)}>
        <H5>{headingText}</H5>
        <AppointmentItems appointment={appointment} />
        <AppointmentFooter appointment={appointment} nextAppointment={nextAppointment} headingText={headingText} />
      </Section>
    </div>
  )
}
