import { Request, Response } from 'express'
import { getAppointmentSlots } from '../index'
import { validateGetAppointmentSlotsRequest } from '../validators'
import { getOfficesByPostcode } from '../apis'
import { logger } from '../../../core/logger'
import { errorHandler } from '../../../../../common/utils/error-handler'
import { officesDataStub } from '../stubs/offices'

jest.mock('../apis')
jest.mock('../validators')
jest.mock('../../../../../common/utils/error-handler', () => ({
  ...jest.requireActual('../../../../../common/utils/error-handler'),
  errorHandler: jest.fn(),
}))

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

  test('getOfficesByPostcode throw error', () => {
    const req = {
      url: '/appointments',
    } as Request

    const response = ({
      status: jest.fn(),
      end: jest.fn(),
      json: jest.fn(),
    } as unknown) as Response

    const mockError = 'error'
    ;(validateGetAppointmentSlotsRequest as jest.Mock).mockReturnValueOnce(null)
    ;(getOfficesByPostcode as jest.Mock).mockImplementationOnce(() => {
      throw mockError
    })
    getAppointmentSlots(req, response)

    expect(errorHandler).toHaveBeenCalledWith(mockError, response, req, 'getAppointmentSlots', logger)
  })

  test('happy case', async () => {
    const req = {
      url: '/appointments',
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
    expect(response.end).toHaveBeenCalledTimes(1)
  })
})
