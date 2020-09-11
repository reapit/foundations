/*
 * TODOME(serverViewing)
 * import
 * desc
 */

import { fetcher } from '../../utils/fetcher-server'
import { getServerHeaders } from '../../utils/get-server-headers'
import { Request, Response } from 'express'
import { PACKAGE_SUFFIXES } from '../../utils/constants'
import { errorHandler } from '../../utils/error-handler'
import { assignNegotiatorIdToAppointmentSlotOfDatesOutput } from '../../../appointment-planner-component/server/api/get-appointment-slots/stubs/utils'
import { createGetAppointmentSlotsFn } from '../get-appointment-slots'
/*
 * TODOME(serverValuation)
 * update path
 */

jest.mock('../../utils/fetcher-server')
jest.mock('../../utils/error-handler')
/*
 * TODOME(serverValuation)
 * delete
 */

describe('getAppointmentSlots wrapper API', () => {
  process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
  process.env.APPPOINTMENT_PLANNER_GET_APPOINTMENT_SLOTS_API = 'http://localhost:3000'

  it('should correctly call the fetcher for appointment slots', async () => {
    /*
     * TODOME(serverViewing)
     * mock stuff
     * assignNegotiatorIdToAppointmentSlotOfDatesOutput
     */
    ;(fetcher as jest.Mock).mockImplementation(() => assignNegotiatorIdToAppointmentSlotOfDatesOutput)
    /*
     * TODOME(serverViewing)
     * update to apointment slot
     */

    /**
     * get from router
     */
    const req = {
      url: '/appointment-slots',
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    /*
     * TODOME(serverViewing)
     * update fn
     */

    await createGetAppointmentSlotsFn(null, PACKAGE_SUFFIXES.SEARCH_WIDGET)(req, res)
    /*
     * TODOME(serverViewing)
     * change api
     */

    expect(fetcher).toHaveBeenCalledWith({
      url: `${process.env.PLATFORM_API_BASE_URL}${req.url}`,
      headers,
    })
    expect(res.status).toHaveBeenCalledWith(200)
    /*
     * TODOME(serverViewing)
     * update stub
     */
    expect(res.json).toHaveBeenCalledWith(assignNegotiatorIdToAppointmentSlotOfDatesOutput)
    expect(res.end).toHaveBeenCalledTimes(1)
  })

  it('should correctly catch an error', async () => {
    const error = new Error('Something went wrong')
    ;(fetcher as jest.Mock).mockImplementation(() => {
      throw error
    })
    /*
     * TODOME(serverViewing)
     * update this
     */

    const req = {
      url: '/appointment-slots',
    } as Request

    const logger = jest.fn()

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response
    /*
     * TODOME(serverViewing)
     * update this
     */
    await createGetAppointmentSlotsFn(logger, PACKAGE_SUFFIXES.SEARCH_WIDGET)(req, res)

    /*
     * TODOME()
     *
     */

    expect(errorHandler).toHaveBeenCalledWith(error, res, req, 'getAppointmentSlots', logger)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
