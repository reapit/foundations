import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { API_BASE_URL } from './constants'

export const getProperties = async (
  keywords: string,
  isRental: boolean,
  apiKey: string,
): Promise<PagedResultPropertyModel_ | undefined> => {
  const url = new URL(`${API_BASE_URL}/properties`)

  return fetcher<PagedResultPropertyModel_, { keywords: string; isRental: boolean }>({
    url: String(url),
    headers: getClientHeaders(apiKey),
    body: {
      isRental,
      keywords,
    },
  })
}
