// b ur sel
import { PagedResultOfficeModel_, AppointmentModel } from '@reapit/foundations-ts-definitions'
import { WebComponentConfigResult } from './apis'
import dayjs, { Dayjs } from 'dayjs'
import { AppoinmentSlotsOfDate } from '.'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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

export type FindAvailableNegotiatorIdParams = {
  negotiatorIds: string[]
  // appointments in different time range
  appointments: AppointmentModel[]
  dateTimeStart: Date
  dateTimeEnd: Date
}

export const findAvailableNegotiatorId = ({
  negotiatorIds,
  appointments,
  dateTimeEnd,
  dateTimeStart,
}: FindAvailableNegotiatorIdParams): string | undefined => {
  const appointmentsBetweenStartEnd = findAppointmentBetween({ appointments, dateTimeStart, dateTimeEnd })
  return negotiatorIds.find(negotiatorId => isNegotiatorIdAvailable(appointmentsBetweenStartEnd, negotiatorId))
}

export const isNegotiatorIdAvailable = (appointments: AppointmentModel[], negotiatorId: string): boolean =>
  !appointments.some(appointment => appointment.negotiatorIds.includes(negotiatorId))

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
