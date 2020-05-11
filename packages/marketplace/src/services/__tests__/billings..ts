import { fetchMonthlyBilling } from '../billings'
import { generateHeader, URLS } from '@/constants/api'
import { fetcher, setQueryParams } from '@reapit/elements'

describe('should fetchMonthlyBilling run correctly', () => {
  it('fetcher should be called', () => {
    const applicationId = ['applicationId']
    const month = '2020-05'
    const headers = generateHeader(window.reapit.config.marketplaceApiKey)
    const url = `${URLS.trafficEvents}/billing/${month}?${setQueryParams({ applicationId })}`

    fetchMonthlyBilling({ applicationId, month }).then(() => {
      expect(fetcher).toBeCalledWith({
        headers,
        url,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
      })
    })
  })
})
