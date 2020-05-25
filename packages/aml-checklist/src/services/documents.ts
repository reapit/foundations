import { fetcherWithBlob, fetcher } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { logger } from 'logger'

export const downloadDocument = async (documentId: string) => {
  try {
    const headers = await initAuthorizedRequestHeaders()

    const [identityDocument, documentBlob] = await Promise.all([
      fetcher({
        url: `${URLS.documents}/${documentId}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers: headers,
      }),
      fetcherWithBlob({
        url: `${URLS.documents}/${documentId}/download`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers: {
          ...headers,
          accept: 'application/octet-stream',
        },
      }),
    ])

    let url = window.URL.createObjectURL(documentBlob)
    let a = window.document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = `${identityDocument.name}`
    // we need to append the element to the dom -> otherwise it will not work in firefox
    window.document.body.appendChild(a)

    a.click()
    a.remove() //afterwards we remove the element again
  } catch (error) {
    logger(error)
    return error
  }
}
