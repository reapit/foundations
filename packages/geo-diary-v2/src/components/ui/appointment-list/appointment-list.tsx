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
  if (appointments.length === 0) {
    return <div className="py-8 px-4 text-center">No appointments</div>
  }

  return (
    <div className="py8 px-4">
      {appointments?.map((appointment: ExtendedAppointmentModel) => {
        return (
          <div className="mb-4" key={appointment.id}>
            <AppointmentTile appointment={appointment} />
          </div>
        )
      })}
    </div>
  )
}

export default AppointmentList
