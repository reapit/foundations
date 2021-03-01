import { DocumentModel } from '@reapit/foundations-ts-definitions'

export const documentMock: DocumentModel = {
  id: 'OXF20000060',
  created: '2020-01-25T15:44:28.0000000Z',
  modified: '2020-01-26T09:24:02.0000000Z',
  associatedType: 'property',
  associatedId: 'OXF190347',
  typeId: 'DET',
  name: '24 Smithson Road Details.pdf',
  _links: {
    self: {
      href: '/documents/OXF20000060',
    },
    download: {
      href: '/documents/OXF20000060/download',
    },
    type: {
      href: '/configuration/documentTypes/DET',
    },
  },
}
