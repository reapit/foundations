import { PagedResultOfficeModel_ } from '@reapit/foundations-ts-definitions'
import { WebComponentConfigResult } from './apis'
import dayjs, { Dayjs } from 'dayjs'
import { AppoinmentSlotDate } from '.'

export const filterNegotiatorsIdByOffice = (pagedOffices: PagedResultOfficeModel_, negotiatorIds: string[]) =>
  negotiatorIds.filter(negotiatorId =>
    pagedOffices._embedded.some(office => {
      return (office._embedded?.negotiators || []).some(officeNegotiator => negotiatorId === officeNegotiator?.id)
    }),
  )

export type GenerateWorkingSlotFromTimeRangeParams = {
  dateFrom: string
  dateTo: string
} & Pick<WebComponentConfigResult, 'appointmentLength' | 'appointmentTimeGap'>

// this should be configurable later, be constant for now
const HOUR_TIME_START = 8
const MINUTE_TIME_START = 0
const HOUR_TIME_END = 20
const MINUTE_TIME_END = 0

// predefined time stop, time end
// start - start time
// end - end time
// length
// timeGap

export const generateAppoinmenSlotDatesFromTimeRange = ({
  dateTo,
  dateFrom,
  appointmentTimeGap,
  appointmentLength,
}: GenerateWorkingSlotFromTimeRangeParams) => {
  const dateTimeStartDayjs = dayjs(dateTo)
  const dateTimeEndDayjs = dayjs(dateFrom)

  const appointmentSlotDates: AppoinmentSlotDate[] = []

  for (
    let dateTimeDayJs = dateTimeStartDayjs;
    dateTimeDayJs.isBefore(dateTimeEndDayjs);
    dateTimeDayJs = dateTimeDayJs.add(1, 'day')
  ) {
    const appointmentSlotDate: AppoinmentSlotDate = {
      date: dateTimeDayJs.toISOString(),
      slots: [],
    }

    const slotDateTimeStart = dateTimeDayJs.hour(HOUR_TIME_START).minute(MINUTE_TIME_START)
    const slotDateTimeEnd = dateTimeDayJs.hour(HOUR_TIME_END).minute(MINUTE_TIME_END)

    for (
      let slotDateTime = slotDateTimeStart;
      slotDateTime.isBefore(slotDateTimeEnd);
      slotDateTime = slotDateTime.add(appointmentLength + appointmentTimeGap, 'minute')
    ) {
      appointmentSlotDate.slots.push({
        dateTimeStart: slotDateTime.toISOString(),
        dateTimeEnd: slotDateTime.add(appointmentLength, 'minute').toISOString(),
      })
    }
    appointmentSlotDates.push(appointmentSlotDate)
  }

  return appointmentSlotDates
}

/*
 * TODOME(filterSlots)
 * getFreeNegotiator
 */
export const getFreeNegotiator = (negotiators, assignedAppointments, appointmentTimeStart, appointmenTimeEnd) => {}
