import { fetcher } from '../utils/fetcher-server'
import { errorHandler } from '../utils/error-handler'
import { getAppointmentPlannerAPIHeaders } from '../utils/get-server-headers'
import { PACKAGE_SUFFIXES } from '../utils/constants'
import { AppRequest, AppResponse } from '@reapit/node-utils'
import { AppoinmentSlotsOfDate } from '../../appointment-planner-component/server/api/get-appointment-slots'
import { stringify } from 'query-string'
export const createGetAppointmentSlotsFn = (logger: any, packageSuffix: PACKAGE_SUFFIXES) => async (
  req: AppRequest,
  res: AppResponse,
) => {
  try {
    const headers = await getAppointmentPlannerAPIHeaders(req, packageSuffix)
    const url = new URL(`${process.env.APPPOINTMENT_PLANNER_GET_APPOINTMENT_SLOTS_API}?${stringify(req.query)}`)

    const result = await fetcher<AppoinmentSlotsOfDate, undefined>({
      url: String(url),
      headers,
    })

    res.status(200).json(result)
  } catch (err) {
    console.log({ err })

    await errorHandler(err, res, req, 'getAppointmentSlots', logger)
  }
}
