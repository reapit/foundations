import dayjs from 'dayjs'
import { ExtendedAppointmentModel } from '@/types/core'

export function getTodayNextAppointment(appointments: ExtendedAppointmentModel[]) {
  return appointments
    .filter(
      appointment =>
        !appointment.cancelled &&
        dayjs(appointment.start).isSame(dayjs(), 'day') &&
        dayjs().isBefore(dayjs(appointment.start)),
    )
    .sort((a, b) => {
      return (dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1)[0]
    })
}
