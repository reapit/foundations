import { PagedResultOfficeModel_ } from '@reapit/foundations-ts-definitions'

export const filterNegotiatorsIdByOffice = (pagedOffices: PagedResultOfficeModel_, negotiatorIds: string[]) =>
  negotiatorIds.filter(negotiatorId =>
    pagedOffices._embedded.some(office => {
      return (office._embedded?.negotiators || []).some(officeNegotiator => negotiatorId === officeNegotiator?.id)
    }),
  )

export const generateWorkingSlotFromTimeRange = (timeStart, timeEnd) => {}

/*
 * TODOME(filterSlots)
 * getFreeNegotiator
 */
export const getFreeNegotiator = (negotiators, assignedAppointments, appointmentTimeStart, appointmenTimeEnd) => {}
