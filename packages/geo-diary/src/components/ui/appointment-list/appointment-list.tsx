import React, { Dispatch, SetStateAction } from 'react'
import { ExtendedAppointmentModel } from '@/types/global'
import { AppointmentTile } from '../appointment-tile'
import { FadeIn, Helper } from '@reapit/elements'

export interface AppointmentListProps {
  appointments: ExtendedAppointmentModel[]
}

export interface AppointmentTypeQueryData {
  GetConfigurationsByType: {
    id: string
    value: string
  }[]
}

export interface AppointmentTypeQueryVariables {
  type: 'appointmentTypes'
}

export const handleContactDrawerClose = (setContactDrawerOpen: Dispatch<SetStateAction<boolean>>) => () => {
  setContactDrawerOpen(() => false)
}

export const handleContactDrawerOpen = (setContactDrawerOpen: Dispatch<SetStateAction<boolean>>) => () => {
  setContactDrawerOpen(() => true)
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }: AppointmentListProps) => {
  if (appointments.length === 0) {
    return (
      <FadeIn>
        <Helper variant="info">No appointments</Helper>
      </FadeIn>
    )
  }

  return (
    <>
      {appointments?.map((appointment: ExtendedAppointmentModel) => {
        return (
          <FadeIn key={appointment.id}>
            <AppointmentTile appointment={appointment} />
          </FadeIn>
        )
      })}
    </>
  )
}

export default AppointmentList
