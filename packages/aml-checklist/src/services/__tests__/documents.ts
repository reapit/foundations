import { downloadDocument } from '../documents'
import * as ReapitElements from '@reapit/elements'
import { URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'

describe('checklist-detail', () => {
  const mockedLinkElem = { href: '', download: '', click: jest.fn(), remove: jest.fn() }
  const mockedAppendChildFn = jest.fn()
  const mockedCreateObjectURL = jest.fn(() => 'mocked url')
  let spyFetcher
  const mockedBlob = new Blob()

  beforeAll(() => {
    ;(window as any).URL = {
      createObjectURL: mockedCreateObjectURL,
    }
    jest.spyOn(document, 'createElement').mockImplementation(() => (mockedLinkElem as unknown) as HTMLAnchorElement)
    document.body.appendChild = mockedAppendChildFn

    spyFetcher = jest.spyOn(ReapitElements, 'fetcherWithBlob').mockImplementation(
      () =>
        new Promise(resolve => {
          resolve(mockedBlob)
        }),
    )
  })

  it('should run correctly', async () => {
    const documentId = 'mock-id'

    const headers = await initAuthorizedRequestHeaders()
    headers['accept'] = 'application/octet-stream'

    await downloadDocument(documentId)
    expect(spyFetcher).toHaveBeenCalledWith({
      url: `${URLS.documents}/${documentId}/download`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    expect(mockedCreateObjectURL).toHaveBeenCalledWith(mockedBlob)
    expect(mockedAppendChildFn).toHaveBeenCalledWith(mockedLinkElem)
    expect(mockedLinkElem.href).toBe('mocked url')
    expect(mockedLinkElem.download).toBe(documentId)
    expect(mockedLinkElem.click).toHaveBeenCalled()
    expect(mockedLinkElem.remove).toHaveBeenCalled()
  })
})
