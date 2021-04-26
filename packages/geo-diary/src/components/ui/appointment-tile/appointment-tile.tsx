import React, { FC } from 'react'
import { H5, Section } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import { AppointmentFooter } from './appointment-footer'
import { AppointmentItems } from './appointment-items'
import { useAppState } from '../../../core/app-state'

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
  nextAppointment?: ExtendedAppointmentModel
}

export const AppointmentTile: FC<AppointmentTileProps> = ({ appointment, nextAppointment }) => {
  const { appState } = useAppState()
  const { appointmentId } = appState
  const { id, property } = appointment
  const line1 = property?.address?.line1 ?? ''
  const buildingName = property?.address?.buildingName ?? ''
  const buildingNumber = property?.address?.buildingNumber ?? ''
  const headingText = `${buildingNumber || buildingName || ''} ${line1 || ''}`

  return (
    <Section className={appointmentId === id ? 'highlight' : ''}>
      <H5>{headingText}</H5>
      <AppointmentItems appointment={appointment} />
      <AppointmentFooter appointment={appointment} nextAppointment={nextAppointment} headingText={headingText} />
    </Section>
  )
}
