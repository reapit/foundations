// hold for quality

import { AppRequest, AppResponse } from '@reapit/node-utils'
import { validateGetAppointmentSlotsRequest } from './validators'
import { validatedErrorHandler } from '../../../../common/utils/error-handler'
import {
  getOfficesByPostcode,
  getWebComponentConfigForReapitCustomer,
  getAppointmentsByNegotiatorsIdsAndDateRange,
} from './apis'
import { errorHandler } from '../../../../common/utils/error-handler'
import { logger } from '../../core/logger'
import {
  filterNegotiatorsIdByOffice,
  generateAppoinmenSlotDatesFromTimeRange,
  assignNegotiatorIdToAppointmentSlotOfDates,
} from './utils'

export type AppointmentSlot = {
  dateTimeStart: string
  dateTimeEnd: string
  // No negotiator is assigned = slot unavailable
  negotiatorId?: string
}

export type AppoinmentSlotsOfDate = {
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

    const appointmentSlotsOfDates = generateAppoinmenSlotDatesFromTimeRange({
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      appointmentLength: config.appointmentLength,
      appointmentTimeGap: config.appointmentTimeGap,
    })

    const appointments = await getAppointmentsByNegotiatorsIdsAndDateRange(req, filteredNegotiatorIds)

    const appointmentSlotOfDatesWithNegotiatorId = assignNegotiatorIdToAppointmentSlotOfDates({
      appointments: appointments._embedded,
      appointmentSlotsOfDates: appointmentSlotsOfDates,
      negotiatorIds: filteredNegotiatorIds,
    })

    res.status(200)
    res.json(appointmentSlotOfDatesWithNegotiatorId)
    res.end()
  } catch (err) {
    console.log({ err })

    await errorHandler(err, res, req, 'getAppointmentSlots', logger)
  }
}
