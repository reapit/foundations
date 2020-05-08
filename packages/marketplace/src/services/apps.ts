import { fetcher } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'

export const fetchAppDetail = async ({ clientId, id }) => {
  const response = await fetcher({
    url: clientId ? `${URLS.apps}/${id}?clientId=${clientId}` : `${URLS.apps}/${id}`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}

export const fetchAppApiKey = async ({ installationId }) => {
  const response = await fetcher({
    url: `${URLS.installations}/${installationId}/apiKey`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}
