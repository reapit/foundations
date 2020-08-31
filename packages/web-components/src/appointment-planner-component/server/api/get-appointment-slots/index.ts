import { AppRequest, AppResponse } from '@reapit/node-utils'
import { validateGetAppointmentSlotsRequest } from './validators'
import { validatedErrorHandler } from '../../../../common/utils/error-handler'
import { getOfficesByPostcode } from './apis'
import { errorHandler } from '../../../../common/utils/error-handler'
import { logger } from '../../core/logger'

export const getAppointmentSlots = async (req: AppRequest, res: AppResponse) => {
  const errStr = validateGetAppointmentSlotsRequest(req)

  if (errStr) {
    validatedErrorHandler(errStr, res)
    return
  }

  try {
    const offices = await getOfficesByPostcode(req)
    res.status(200)
    res.end()
  } catch (err) {
    await errorHandler(err, res, req, 'getAppointmentSlots', logger)
  }

  /*
   * TODOME(getConfig)
  - fetch config for reapit customer
   */

  /*
   * TODOME(requestApoinmtne)
   * call filter negotiators from office
   */

  /*
   * TODOME(requestApoinmtne)
   * fetch appointment for negotitor list
   */

  /*
   * TODOME(filterSlots)
   * generate time range
   * get free negotiator from range
   */

  /*
   * TODOME(misc)
    res 200
   * res.json
   res.end(j)
   */

  /*
   * TODOME(misc)
   * catch error
   * logger.error
   */
}
