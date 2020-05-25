import { DocumentModel } from '@reapit/foundations-ts-definitions'
import { downloadDocument } from '../documents'
import * as ReapitElements from '@reapit/elements'
import { URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'

describe('checklist-detail', () => {
  const mockedLinkElem = { href: '', download: '', click: jest.fn(), remove: jest.fn() }
  const mockedAppendChildFn = jest.fn()
  const mockedCreateObjectURL = jest.fn(() => 'mocked url')
  let spyFetcherWithBlob
  let spyFetcher
  const documentObject = { name: 'document.png' } as DocumentModel
  const mockedBlob = new Blob()

  beforeAll(() => {
    ;(window as any).URL = {
      createObjectURL: mockedCreateObjectURL,
    }
    jest.spyOn(document, 'createElement').mockImplementation(() => (mockedLinkElem as unknown) as HTMLAnchorElement)
    document.body.appendChild = mockedAppendChildFn

    spyFetcherWithBlob = jest.spyOn(ReapitElements, 'fetcherWithBlob').mockImplementation(
      () =>
        new Promise(resolve => {
          resolve(mockedBlob)
        }),
    )

    spyFetcher = jest.spyOn(ReapitElements, 'fetcher').mockImplementation(
      () =>
        new Promise(resolve => {
          resolve(documentObject)
        }),
    )
  })

  it('should run correctly', async () => {
    const documentId = 'mock-id'

    const headers = await initAuthorizedRequestHeaders()

    await downloadDocument(documentId)

    expect(spyFetcherWithBlob).toHaveBeenCalledWith({
      url: `${URLS.documents}/${documentId}/download`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: {
        ...headers,
        accept: 'application/octet-stream',
      },
    })
    expect(spyFetcher).toHaveBeenCalledWith({
      url: `${URLS.documents}/${documentId}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    expect(mockedCreateObjectURL).toHaveBeenCalledWith(mockedBlob)
    expect(mockedAppendChildFn).toHaveBeenCalledWith(mockedLinkElem)
    expect(mockedLinkElem.href).toBe('mocked url')
    expect(mockedLinkElem.download).toBe(documentObject.name)
    expect(mockedLinkElem.click).toHaveBeenCalled()
    expect(mockedLinkElem.remove).toHaveBeenCalled()
  })
})
