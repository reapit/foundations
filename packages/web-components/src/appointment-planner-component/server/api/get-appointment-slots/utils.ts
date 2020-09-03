// b ur sel
import { PagedResultOfficeModel_, AppointmentModel } from '@reapit/foundations-ts-definitions'
import { WebComponentConfigResult } from './apis'
import dayjs, { Dayjs } from 'dayjs'
import { AppoinmentSlotsOfDate } from '.'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

/**
 * toISOString
 */

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
  const dateTimeStartDayjs = dayjs(dateFrom).utc()
  const dateTimeEndDayjs = dayjs(dateTo).utc()

  const appointmentSlotsOfDates: AppoinmentSlotsOfDate[] = []

  for (
    let dateTimeDayJs = dateTimeStartDayjs;
    dateTimeDayJs.isBefore(dateTimeEndDayjs);
    dateTimeDayJs = dateTimeDayJs.add(1, 'day')
  ) {
    const appointmentSlotDate: AppoinmentSlotsOfDate = {
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
    appointmentSlotsOfDates.push(appointmentSlotDate)
  }

  return appointmentSlotsOfDates
}

/*
 * TODOME(filterSlots)
 * getFreeNegotiator
 */

/**
 * format: appointmentsByNegotiatorId
 * {negotiator-id: [meeting]]
 */

/**
 * assignNegotiatorIdToAppointmentSlots
 * (slot, appointments, negotiatorIds)
 *
 * loop appointemntSlot.map
 * id = findAvaialbeNegotiator(id input, appointments from input, timeStart of slot, timeEnd slot)
 * if !id, return original
 * else return {original, id}
 *
 * type
 * fn
 */
export type AssignNegotiatorIdToAppointmentSlotOfDatesParams = {
  appointmentSlotsOfDates: AppoinmentSlotsOfDate[]
  appointments: AppointmentModel[]
  negotiatorIds: string[]
}

export const assignNegotiatorIdToAppointmentSlotOfDates = ({
  appointmentSlotsOfDates,
  appointments,
  negotiatorIds,
}: AssignNegotiatorIdToAppointmentSlotOfDatesParams): AppoinmentSlotsOfDate[] =>
  appointmentSlotsOfDates.map(appointmentSlotsOfDate => ({
    ...appointmentSlotsOfDate,
    slots: appointmentSlotsOfDate.slots.map(slot => {
      const availableNegotiatorId = findAvailableNegotiatorId({
        negotiatorIds,
        appointments,
        dateTimeStart: new Date(slot.dateTimeStart),
        dateTimeEnd: new Date(slot.dateTimeEnd),
      })

      if (availableNegotiatorId) {
        return {
          ...slot,
          negotiatorId: availableNegotiatorId,
        }
      }

      return slot
    }),
  }))

/**
 * findAvaialbeNegotiatorId(ids: arr, appointments: arr, timeStart: str, timeEnd: str)
 *
 *
 * appoinemtsnBetweenTimeRange = appointmentsBetwen(timeStart, timeEnd)
 * loop id, find -> isAppoinemtsnNotIncludeId(i)
 */

export type FindAvailableNegotiatorIdParams = {
  negotiatorIds: string[]
  // appointments in different time range
  appointments: AppointmentModel[]
  dateTimeStart: Date
  dateTimeEnd: Date
}

/**
 * search appointments between time range
 * find first negotiator id that is not assigned to appointments
 */
export const findAvailableNegotiatorId = ({
  // copy
  negotiatorIds,
  appointments,
  dateTimeEnd,
  dateTimeStart,
}: FindAvailableNegotiatorIdParams): string | undefined => {
  const appointmentsBetweenStartEnd = findAppointmentBetween({ appointments, dateTimeStart, dateTimeEnd })

  // copy jsin stringity > beauty

  /**
   * declare input = ^ stringtify above
   * declare ouput = stringlify pick from embed from above
   */

  return negotiatorIds.find(negotiatorId => isNegotiatorIdAvailable(appointmentsBetweenStartEnd, negotiatorId))
}

/**
 * isAppoinemtsnIncludeId(appointments, id)
 *  each appointment -> some -> appointment.negotiatoris.include(id)
 */
export const isNegotiatorIdAvailable = (appointments: AppointmentModel[], negotiatorId: string): boolean =>
  !appointments.some(appointment => appointment.negotiatorIds.includes(negotiatorId))

/**
 * appointmentsBetwen(appointment, dateTimeStart, dateTimeEnd)
 * loop appointment,
 * if dateTimeStart >= (appointment.start)   && appointemnent.end <= dateTimeEnd
 */
export type FindAppointmentsBetweenParams = {
  dateTimeStart: Date
  dateTimeEnd: Date
  appointments: AppointmentModel[]
}

export const findAppointmentBetween = ({
  appointments,
  dateTimeStart,
  dateTimeEnd,
}: FindAppointmentsBetweenParams): AppointmentModel[] =>
  appointments.filter(appointment => {
    return dateTimeStart <= new Date(appointment.start) && new Date(appointment.end) <= dateTimeEnd
  })
