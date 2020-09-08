import { Request, Response } from 'express'
import { getAppointmentSlots } from '../index'
import { validateGetAppointmentSlotsRequest } from '../validators'
import { officesDataStub } from '../stubs/offices'
import { appointmentsDataStub } from '../../__stubs__/appointments'
import { configDataStub } from '../stubs/config'

import {
  getOfficesByPostcode,
  getWebComponentConfigForReapitCustomer,
  getAppointmentsByNegotiatorsIdsAndDateRange,
} from '../apis'
jest.mock('../validators')
jest.mock('../../../../../common/utils/error-handler', () => ({
  ...jest.requireActual('../../../../../common/utils/error-handler'),
  errorHandler: jest.fn(),
}))
jest.mock('../apis')
;(getOfficesByPostcode as jest.Mock).mockResolvedValue(officesDataStub)
;(getAppointmentsByNegotiatorsIdsAndDateRange as jest.Mock).mockResolvedValue(appointmentsDataStub)
;(getWebComponentConfigForReapitCustomer as jest.Mock).mockResolvedValue(configDataStub)

describe('getAppointmentSlots endpoint', () => {
  test('validateGetAppointmentSlotsRequest throw error', () => {
    const req = {
      url: '/appointments',
    } as Request

    const response = ({
      status: jest.fn(),
      end: jest.fn(),
      json: jest.fn(),
    } as unknown) as Response

    // mock  validate throw err case 1
    const mockError = 'error'
    ;(validateGetAppointmentSlotsRequest as jest.Mock).mockReturnValueOnce(mockError)
    getAppointmentSlots(req, response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith(mockError)
    expect(response.end).toHaveBeenCalledTimes(1)
  })

  test('happy case', async () => {
    const req = {
      url: '/appointments',
      query: {
        postcode: 'B9100',
        dateFrom: '2021-01-31T20:00:00.000Z',
        dateTo: '2021-02-02T00:00:00.000Z',
      },
    } as Request

    const response = ({
      status: jest.fn(),
      end: jest.fn(),
      json: jest.fn(),
    } as unknown) as Response
    ;(validateGetAppointmentSlotsRequest as jest.Mock).mockReturnValueOnce(null)
    ;(getOfficesByPostcode as jest.Mock).mockResolvedValueOnce(officesDataStub)

    await getAppointmentSlots(req, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith([
      {
        date: '2021-01-31T20:00:00.000Z',
        slots: [
          {
            dateTimeStart: '2021-01-31T08:00:00.000Z',
            dateTimeEnd: '2021-01-31T12:00:00.000Z',
            negotiatorId: 'ASDS',
          },
          {
            dateTimeStart: '2021-01-31T16:00:00.000Z',
            dateTimeEnd: '2021-01-31T20:00:00.000Z',
            negotiatorId: 'ASDS',
          },
        ],
      },
      {
        date: '2021-02-01T20:00:00.000Z',
        slots: [
          {
            dateTimeStart: '2021-02-01T08:00:00.000Z',
            dateTimeEnd: '2021-02-01T12:00:00.000Z',
            negotiatorId: 'ASDS',
          },
          {
            dateTimeStart: '2021-02-01T16:00:00.000Z',
            dateTimeEnd: '2021-02-01T20:00:00.000Z',
            negotiatorId: 'ASDS',
          },
        ],
      },
    ])
    expect(response.end).toHaveBeenCalledTimes(1)
  })
})
