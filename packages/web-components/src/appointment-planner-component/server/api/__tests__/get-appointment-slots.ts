import { Request, Response } from 'express'
import { getAppointmentSlots } from '../get-appointment-slots'

describe('getAppointmentSlots endpoint', () => {
  it('getAppointmentSlots', () => {
    const req = {
      url: '/appointments',
    } as Request

    const response = ({
      status: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    getAppointmentSlots(req, response)

    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.end).toHaveBeenCalledTimes(1)
  })
})
