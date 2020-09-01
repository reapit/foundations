/**
 * err
 * logger.error(stringtify)
 */

import { logger } from '../../core/logger'
import { fetcher } from '../../../../common/utils/fetcher-server'
import { getServerHeaders } from '../../../../common/utils/get-server-headers'
import { AppRequest } from '@reapit/node-utils'
import { PACKAGE_SUFFIXES } from '../../../../common/utils/constants'
import { stringify } from 'query-string'
import { PagedResultOfficeModel_ } from '@reapit/foundations-ts-definitions'

export const getWebComponentConfigForReapitCustomer = (req: AppRequest) => {}

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

/*
 * TODOME(getConfig)
 * getConfigByCustomerIdHeader(customerId)
 * logger
 * add web-component server api from
 * result type?
 * config
 * logger error
 */

/*
 * TODOME(requestApoinmtne)
 * getAppointmentByDateRange({ dateFrom, dateTo })
 */
