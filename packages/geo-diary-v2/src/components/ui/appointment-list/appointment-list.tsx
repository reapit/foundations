import React from 'react'
import { ExtendedAppointmentModel } from '@/types/global'
import AppointmentTile from '../appointment-tile'
import dayjs from 'dayjs'

export type AppointmentListProps = {
  appointments: ExtendedAppointmentModel[]
}

export type AppointmentTypeQueryData = {
  GetConfigurationsByType: {
    id: string
    value: string
  }[]
}

export function getTodayNextAppointment(appointments: ExtendedAppointmentModel[]) {
  const filteredNextAppointments = appointments.filter(appointment => {
    const isSameDay = dayjs(appointment.start).isSame(dayjs(), 'day')
    const isBeforeAppointmentTime = dayjs().isBefore(dayjs(appointment.start))
    return !appointment.cancelled && isSameDay && isBeforeAppointmentTime
  })
  const sortedAppointmentByStartDate = filteredNextAppointments.sort((a, b) => {
    return dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1
  })
  const nearestAppointment = sortedAppointmentByStartDate?.[0]
  return nearestAppointment
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
        const nextAppointment = getTodayNextAppointment(appointments)
        return (
          <div className="mb-4" key={appointment.id}>
            <AppointmentTile appointment={appointment} nextAppointment={nextAppointment} />
          </div>
        )
      })}
    </div>
  )
}

export default AppointmentList
