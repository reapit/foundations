import { AppointmentModel } from '@/types/appointments'
import dayjs from 'dayjs'

export const sortAppoinmentsByStartTime = (appointments: AppointmentModel[]) => {
  const sortedAppoinments = appointments.sort((a, b) => {
    const aStart = dayjs(a.start)
    const bStart = dayjs(b.start)

    if (aStart.isBefore(bStart)) {
      return -1
    }

    if (aStart.isAfter(bStart)) {
      return 1
    }

    return 0
  })

  return sortedAppoinments
}
