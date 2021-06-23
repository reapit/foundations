import React from 'react'
import { ExtendedAppointmentModel } from '@/types/global'
import { AppointmentTile } from '../appointment-tile'
import { PersistantNotification } from '@reapit/elements'

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

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }: AppointmentListProps) => {
  if (!appointments.length) {
    return (
      <PersistantNotification isExpanded isFullWidth>
        No appointments
      </PersistantNotification>
    )
  }

  return (
    <>
      {appointments?.map((appointment: ExtendedAppointmentModel) => {
        return <AppointmentTile key={appointment.id} appointment={appointment} />
      })}
    </>
  )
}

export default AppointmentList
