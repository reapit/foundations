import { DocumentModelPagedResult } from '@reapit/foundations-ts-definitions'

export const documentsMock: DocumentModelPagedResult = {
  _embedded: [
    {
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
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 2,
  _links: {
    self: {
      href: '/documents/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/documents/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/documents/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/documents/?PageNumber=2&PageSize=1',
    },
  },
}
