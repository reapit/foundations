import React from 'react'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'
import { ExtendedAppointmentModel } from '@/types/global'
import AppointmentTile from '../appointment-tile'

export type AppointmentListProps = {
  appointments: AppointmentModel[]
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }: AppointmentListProps) => {
  return (
    <>
      {appointments?.map((appointment: ExtendedAppointmentModel) => {
        return <AppointmentTile key={appointment.id} appointment={appointment} appointmentTypes={[]} />
      })}
    </>
  )
}

export default AppointmentList
