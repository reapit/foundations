import { AppRequest, AppResponse } from '@reapit/node-utils'
import { validateGetAppointmentSlotsRequest } from './validators'
import { validatedErrorHandler } from '../../../../common/utils/error-handler'
import { getOfficesByPostcode, getWebComponentConfigForReapitCustomer } from './apis'
import { errorHandler } from '../../../../common/utils/error-handler'
import { logger } from '../../core/logger'
import { filterNegotiatorsIdByOffice, generateAppoinmenSlotDatesFromTimeRange } from './utils'

export type AppointmentSlot = {
  dateTimeStart: string
  dateTimeEnd: string
  negotiatorId?: string
}

export type AppoinmentSlotDate = {
  date: string
  slots: AppointmentSlot[]
}

export const getAppointmentSlots = async (req: AppRequest, res: AppResponse) => {
  const errStr = validateGetAppointmentSlotsRequest(req)

  if (errStr) {
    validatedErrorHandler(errStr, res)
    return
  }

  try {
    const offices = await getOfficesByPostcode(req)
    const config = await getWebComponentConfigForReapitCustomer(req)
    const filteredNegotiatorIds = filterNegotiatorsIdByOffice(offices, config?.negotiatorIds)
    // appointmentSloDates = fn

    const appointmentSlotDates = generateAppoinmenSlotDatesFromTimeRange({
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      appointmentLength: config.appointmentLength,
      appointmentTimeGap: config.appointmentTimeGap,
    })

    res.status(200)
    res.end()
  } catch (err) {
    await errorHandler(err, res, req, 'getAppointmentSlots', logger)
  }

  /*
   * TODOME(getConfig)
  - fetch config for reapit customer, pass a whole req
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
