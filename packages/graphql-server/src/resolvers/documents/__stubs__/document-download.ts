import { GetDocumentDownloadArgs } from '../documents'

export const documentDownloadArgMock: GetDocumentDownloadArgs = {
  id: 'id',
}

export const documentDownloadReturnMock = {
  contentType: 'string',
  fileDownloadName: 'string',
  lastModified: '2020-08-24T09:44:55.933Z',
  entityTag: {
    tag: {
      buffer: 'string',
      offset: 0,
      length: 0,
      value: 'string',
      hasValue: true,
    },
    isWeak: true,
  },
  enableRangeProcessing: true,
}
