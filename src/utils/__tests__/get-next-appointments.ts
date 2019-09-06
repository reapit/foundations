import { getTodayNextAppointment } from '../get-today-next-appointment'
import { AppointmentModel } from '@/types/appointments'

describe('getTodayNextAppointment', () => {
  test('Should return the next appointment in today', () => {
    const appointments: AppointmentModel[] = [
      { start: '2019-12-18T16:30:00' },
      { start: '2019-14-18T16:30:00' },
      { start: '2019-12-18T17:10:00' }
    ]
    expect(getTodayNextAppointment(appointments)).toBe(appointments[2])
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
