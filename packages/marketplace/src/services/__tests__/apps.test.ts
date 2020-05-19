import { generateHeader, URLS } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import { fetchAppDetail, fetchAppApiKey, fetchDesktopIntegrationTypes } from '../apps'

describe('fetchDesktopIntegrationTypes', () => {
  it('fetcher should run correctly', () => {
    const appId = 'testAppid'
    const clientId = 'testClientId'
    const headers = generateHeader(window.reapit.config.marketplaceApiKey)
    const url = `${URLS.apps}/${appId}?clientId=${clientId}`

    fetchDesktopIntegrationTypes().then(() => {
      expect(fetcher).toBeCalledWith({
        headers,
        url,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
      })
    })
  })
})

describe('fetchAppDetail', () => {
  it('fetcher should run correctly in case clientId is existed', () => {
    const appId = 'testAppid'
    const clientId = 'testClientId'
    const headers = generateHeader(window.reapit.config.marketplaceApiKey)
    const url = `${URLS.apps}/${appId}?clientId=${clientId}`

    fetchAppDetail({ clientId, id: appId }).then(() => {
      expect(fetcher).toBeCalledWith({
        headers,
        url,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
      })
    })
  })
  it('fetcher should run correctly in case clientId is empty', () => {
    const appId = 'testAppid'
    const headers = generateHeader(window.reapit.config.marketplaceApiKey)
    const url = `${URLS.apps}/${appId}`

    fetchAppDetail({ clientId: null, id: appId }).then(() => {
      expect(fetcher).toBeCalledWith({
        headers,
        url,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
      })
    })
  })
})

describe('fetchAppApiKey', () => {
  it('fetcher should run correctly', () => {
    const installationId = 'testInstallationId'
    const headers = generateHeader(window.reapit.config.marketplaceApiKey)
    const url = `${URLS.installations}/${installationId}/apiKey`

    fetchAppApiKey({ installationId }).then(() => {
      expect(fetcher).toBeCalledWith({
        headers,
        url,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
      })
    })
  })
})
