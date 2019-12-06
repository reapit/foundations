import dayjs from 'dayjs'
import { AppointmentModel } from '@/types/platform'

export function getTodayNextAppointment(appointments: AppointmentModel[]) {
  return appointments
    .filter(
      appointment =>
        !appointment.cancelled &&
        dayjs(appointment.start).isSame(dayjs(), 'day') &&
        dayjs().isBefore(dayjs(appointment.start))
    )
    .sort((a, b) => (dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1))[0]
}
