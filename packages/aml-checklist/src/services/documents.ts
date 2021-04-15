import { fetcherWithBlob, notification } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { logger } from '@reapit/utils'

export const downloadDocument = async (documentId: string) => {
  try {
    const headers = await initAuthorizedRequestHeaders()

    const documentBlob = await fetcherWithBlob({
      url: `${URLS.documents}/${documentId}/download`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: {
        ...headers,
        accept: 'application/octet-stream',
      },
    })

    if (documentBlob) {
      return window.URL.createObjectURL(documentBlob)
    }
  } catch (error) {
    logger(error)
    notification.error({ message: 'Document not found' })
  }
}
