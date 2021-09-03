import { fetcher } from '@reapit/elements-legacy'
import { ReapitConnectSession } from '@reapit/connect-session'
import { URLS, BASE_HEADERS } from '../constants/api'
import { logger } from '@reapit/utils'

export interface InstalledReport {
  created: string
  embeddedUrl: string
  id: string
  isExternal: string
  name: string
  token: string
}

export interface InstalledReportPagedModel {
  pageNumber: number
  pageSize: number
  pageCount: number
  totalPageCount: number
  totalCount: number
  _embedded: InstalledReport[]
}

export const getInstalledReportsService = async (
  session: ReapitConnectSession,
): Promise<InstalledReport[] | never | undefined> => {
  try {
    const response: InstalledReportPagedModel | never = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.INSTALLED_REPORTS}?pageSize=100`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response._embedded
    }

    throw new Error('No response returned by API')
  } catch (err) {
    logger(err)
  }
}
