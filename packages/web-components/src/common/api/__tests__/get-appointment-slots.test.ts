import { fetcher } from '../../utils/fetcher-server'
import { getAppointmentPlannerAPIHeaders } from '../../utils/get-server-headers'
import { Request, Response } from 'express'
import { PACKAGE_SUFFIXES } from '../../utils/constants'
import { errorHandler } from '../../utils/error-handler'
import { assignNegotiatorIdToAppointmentSlotOfDatesOutput } from '../../../appointment-planner-component/server/api/get-appointment-slots/stubs/utils'
import { createGetAppointmentSlotsFn } from '../get-appointment-slots'
import { stringify } from 'querystring'

jest.mock('../../utils/fetcher-server')
jest.mock('../../utils/error-handler')

describe('getAppointmentSlots wrapper API', () => {
  process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
  process.env.APPPOINTMENT_PLANNER_GET_APPOINTMENT_SLOTS_API = 'http://localhost:3000'

  it('should correctly call the fetcher for appointment slots', async () => {
    ;(fetcher as jest.Mock).mockImplementation(() => assignNegotiatorIdToAppointmentSlotOfDatesOutput)

    const req = {
      url: '/appointment-slots',
      query: {},
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    const headers = await getAppointmentPlannerAPIHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)

    await createGetAppointmentSlotsFn(null, PACKAGE_SUFFIXES.SEARCH_WIDGET)(req, res)

    expect(fetcher).toHaveBeenCalledWith({
      url: `${process.env.APPPOINTMENT_PLANNER_GET_APPOINTMENT_SLOTS_API}/?${stringify(req.query)}`,
      headers,
    })
    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(assignNegotiatorIdToAppointmentSlotOfDatesOutput)
    expect(res.end).toHaveBeenCalledTimes(1)
  })

  it('should correctly catch an error', async () => {
    const error = new Error('Something went wrong')
    ;(fetcher as jest.Mock).mockImplementation(() => {
      throw error
    })

    const req = {
      url: '/appointment-slots',
    } as Request

    const logger = jest.fn()

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    await createGetAppointmentSlotsFn(logger, PACKAGE_SUFFIXES.SEARCH_WIDGET)(req, res)
    expect(errorHandler).toHaveBeenCalledWith(error, res, req, 'getAppointmentSlots', logger)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
