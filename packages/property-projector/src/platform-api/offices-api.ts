import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PagedResultOfficeModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '@/constants/api'
import { getAllResource } from '@/util/api-helper'

export const getOffices = async (
  session: ReapitConnectSession,
  criteria?: string,
): Promise<PagedResultOfficeModel_ | undefined> => {
  let url = URLS.OFFICES

  if (criteria !== null || criteria !== '') {
    url = `${url}?${criteria}`
    console.log(url, 'thisisisit')
  }

  try {
    const response: PagedResultOfficeModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Offices', err.message)
  }
}

export const getAllOffices = async (session: ReapitConnectSession) => {
  return (await getAllResource(session, getOffices, new URLSearchParams())).map(({ id, name }) => {
    return {
      id,
      name,
    }
  })
}
