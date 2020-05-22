import { fetcherWithBlob } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { logger } from 'logger'

export const downloadDocument = async (documentId: string) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    headers['accept'] = 'application/octet-stream'

    const response = await fetcherWithBlob({
      url: `${URLS.documents}/${documentId}/download`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })

    let url = window.URL.createObjectURL(response)
    let a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = `${documentId}`

    document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox

    a.click()
    a.remove() //afterwards we remove the element again
  } catch (error) {
    logger(error)
    return error
  }
}
