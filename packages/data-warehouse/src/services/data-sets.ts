import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
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
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch datasets')
  } catch (err) {
    console.error('Error', err.message)
  }
}
