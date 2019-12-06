import { getTodayNextAppointment } from '../get-today-next-appointment'
import { AppointmentModel } from '@/types/platform'

describe('getTodayNextAppointment', () => {
  test('Should return the next appointment in today', () => {
    const appointments: AppointmentModel[] = [
      { start: '2019-10-10T22:00:00' },
      { start: '2019-10-10T22:45:00' },
      { start: '2019-10-10T23:00:00' }
    ]
    expect(getTodayNextAppointment(appointments)).toBe(appointments[1])
  })

  test('Should return undefined if appointments are from another day(s)', () => {
    const appointments: AppointmentModel[] = [
      { start: '2019-02-18T16:30:00' },
      { start: '2019-13-18T17:10:00' },
      { start: '2019-15-18T16:30:00' }
    ]
    expect(getTodayNextAppointment(appointments)).toBeUndefined()
  })
})
