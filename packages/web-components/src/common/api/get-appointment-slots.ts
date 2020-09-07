import { fetcher } from '../utils/fetcher-server'
import { errorHandler } from '../utils/error-handler'
import { getServerHeaders } from '../utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../utils/constants'
import { AppRequest, AppResponse } from '@reapit/node-utils'
import { AppoinmentSlotsOfDate } from '../../appointment-planner-component/server/api/get-appointment-slots'
/*
 * TODOME(serverValuation)
 * rename getAppointmentSlots
 */
export const createGetAppointmentSlotsFn = logger => async (req: AppRequest, res: AppResponse) => {
  try {
    /*
     * TODOME(serverViewing)
     * chnage api
     */
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)
    const url = new URL(`${process.env.PLATFORM_API_BASE_URL}${req.url}`)

    /*
     * TODOME(serverValuation)
     * update typing
     * PR merge
     */
    const result = await fetcher<AppoinmentSlotsOfDate, undefined>({
      url: String(url),
      headers,
    })

    /*
     * TODOME(serverValuation)
     * remove if
     */
    /*
     * TODOME(serverValuation)
     * update result
     */
    res.status(200)
    /*
     * TODOME(serverValuation)
     * change variable
     */
    res.json(result)
    res.end()
  } catch (err) {
    console.log({ err })

    /*
     * TODOME(serverValuation)
     * renmae logger
     */

    await errorHandler(err, res, req, 'getAppointmentSlots', logger)
  }
}
