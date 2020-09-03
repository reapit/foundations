import { logger } from '../../core/logger'
import { fetcher } from '../../../../common/utils/fetcher-server'
import { getServerHeaders } from '../../../../common/utils/get-server-headers'
import { AppRequest } from '@reapit/node-utils'
import { PACKAGE_SUFFIXES, DEFAULT_HEADERS_SERVER } from '../../../../common/utils/constants'
import { stringify } from 'query-string'
import { PagedResultOfficeModel_, PagedResultAppointmentModel_ } from '@reapit/foundations-ts-definitions'

export type WebComponentConfigResult = {
  appointmentLength: number
  appointmentTimeGap: number
  appId: string
  appointmentTypes: any
  customerId: string
  daysOfWeek: number[]
  negotiatorIds: string[]
}

export const getWebComponentConfigForReapitCustomer = async (req: AppRequest) => {
  logger.info('getWebComponentConfigForReapitCustomer', { traceId: req.traceId, postcode: req.query.postcode })

  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.APPOINTMENT_PLANNER)

    const url = new URL(
      `${process.env.WEB_COMPONENT_CONFIG_API}/${req.headers['reapit-customer'] ||
        DEFAULT_HEADERS_SERVER['reapit-customer']}/${process.env.APPOINMENT_PLANNER_APP_ID}`,
    )

    const config = await fetcher<WebComponentConfigResult, undefined>({
      url: String(url),
      headers,
    })

    return config
  } catch (err) {
    await logger.error('getWebComponentConfigForReapitCustomer', {
      traceId: req.traceId,
      error: err,
      headers: JSON.stringify(req.headers),
    })

    throw err
  }
}

export const getOfficesByPostcode = async (req: AppRequest) => {
  logger.info('getOfficesByPostcode', { traceId: req.traceId, postcode: req.query.postcode })

  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.APPOINTMENT_PLANNER)

    const url = new URL(
      `${process.env.PLATFORM_API_BASE_URL}/offices/?${stringify({
        address: req.query?.postcode,
        embed: 'negotiators',
      })}`,
    )

    const offices = await fetcher<PagedResultOfficeModel_, undefined>({
      url: String(url),
      headers,
    })

    return offices
  } catch (err) {
    await logger.error('getOfficesByPostcode', {
      traceId: req.traceId,
      error: err,
      headers: JSON.stringify(req.headers),
    })

    throw err
  }
}

export const getAppointmentsByNegotiatorsIdsAndDateRange = async (req: AppRequest, negotiatorIds: string[]) => {
  logger.info('getAppointmentsByNegotiatorsIdsAndDateRange', { traceId: req.traceId, postcode: req.query.postcode })

  try {
    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.APPOINTMENT_PLANNER)

    const url = new URL(
      `${process.env.PLATFORM_API_BASE_URL}/appointments/?${stringify({
        start: req.query?.dateFrom,
        end: req.query?.dateTo,
        negotiatorId: negotiatorIds,
      })}`,
    )

    const appointments = await fetcher<PagedResultAppointmentModel_, undefined>({
      url: String(url),
      headers,
    })

    return appointments
  } catch (err) {
    await logger.error('getAppointmentsByNegotiatorsIdsAndDateRange', {
      traceId: req.traceId,
      error: err,
      headers: JSON.stringify(req.headers),
    })

    throw err
  }
}
