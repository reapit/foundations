import { fetcher } from '@reapit/elements'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { PagedDatasetsModel } from '../types/data-sets'

export const getDataSetsService = async (): Promise<PagedDatasetsModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: PagedDatasetsModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.DATASETS}/?organisationId=${session.loginIdentity.orgId}`,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch datasets')
  } catch (err) {
    logger(err)
  }
}
