import React from 'react'
import { ExtendedAppointmentModel } from '@/types/global'
import AppointmentTile from '../appointment-tile'
export type AppointmentListProps = {
  appointments: ExtendedAppointmentModel[]
}

export type AppointmentTypeQueryData = {
  GetConfigurationsByType: {
    id: string
    value: string
  }[]
}

export type AppointmentTypeQueryVariables = {
  type: 'appointmentTypes'
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }: AppointmentListProps) => {
  return (
    <>
      {appointments?.map((appointment: ExtendedAppointmentModel) => {
        return <AppointmentTile key={appointment.id} appointment={appointment} />
      })}
    </>
  )
}

export default AppointmentList
