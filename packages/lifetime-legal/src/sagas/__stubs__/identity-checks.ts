import { PagedResultIdentityCheckModel_ } from '@reapit/foundations-ts-definitions'

export const identityChecks = {
  _embedded: [
    {
      id: 'RPT20000004',
      contactId: 'MKC16000007',
      created: '2020-01-14T10:08:25.0000000Z',
      modified: '2020-01-14T10:20:00.0000000Z',
      checkDate: '2020-01-13T03:00:00.0000000Z',
      status: 'pending',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'CI',
        expiry: '2020-01-14',
        details: '1231231',
      },
      identityDocument2: {
        documentId: '',
        typeId: 'BC',
        expiry: '2020-01-29',
        details: '12312312',
      },
      metadata: {},
      _eTag: '"385DCC877457FA81A5780A4467CE3E5B"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000004',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/CI',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/BC',
        },
      },
      _embedded: {},
    },
    {
      id: 'RPT20000003',
      contactId: 'MKC16000007',
      created: '2020-01-14T10:08:00.0000000Z',
      modified: '2020-01-14T10:08:25.0000000Z',
      checkDate: '2020-01-13T17:00:00.0000000Z',
      status: 'cancelled',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'CR',
        expiry: '2020-01-14',
        details: '12312312',
      },
      identityDocument2: null,
      metadata: {},
      _eTag: '"38764F8BB359A7E8131F325EDCCE9FC3"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000003',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/CR',
        },
      },
      _embedded: {},
    },
    {
      id: 'RPT20000002',
      contactId: 'MKC16000007',
      created: '2020-01-14T10:07:28.0000000Z',
      modified: '2020-01-14T10:08:00.0000000Z',
      checkDate: '2020-01-13T17:00:00.0000000Z',
      status: 'cancelled',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'BC',
        expiry: '2020-01-15',
        details: '123123123123',
      },
      identityDocument2: null,
      metadata: {},
      _eTag: '"B49CCEC4250BC3B706E4F7A1A729BE6B"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000002',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/BC',
        },
      },
      _embedded: {},
    },
    {
      id: 'RPT19000163',
      contactId: 'MKC16000007',
      created: '2019-12-18T09:42:32.0000000Z',
      modified: '2020-01-14T10:07:28.0000000Z',
      checkDate: '2019-12-15T23:00:00.0000000Z',
      status: 'cancelled',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'PP',
        expiry: '2019-12-14',
        details: '123',
      },
      identityDocument2: {
        documentId: '',
        typeId: 'TX',
        expiry: '2019-12-28',
        details: '123123123',
      },
      metadata: {},
      _eTag: '"743CCBF3213AEA54855EA289BE4B960F"',
      _links: {
        self: {
          href: '/identityChecks/RPT19000163',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/PP',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/TX',
        },
      },
      _embedded: {},
    },
    {
      id: 'RPT19000162',
      contactId: 'MKC16000007',
      created: '2019-12-18T09:41:44.0000000Z',
      modified: '2019-12-18T09:42:32.0000000Z',
      checkDate: '2019-12-18',
      status: 'cancelled',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'PP',
        expiry: '2019-12-17',
        details: '123',
      },
      identityDocument2: null,
      metadata: {},
      _eTag: '"FE484218ED828FCEC01E5B85FEFB24FB"',
      _links: {
        self: {
          href: '/identityChecks/RPT19000162',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: {},
    },
    {
      id: 'RPT19000161',
      contactId: 'MKC16000007',
      created: '2019-12-18T09:41:38.0000000Z',
      modified: '2019-12-18T09:41:44.0000000Z',
      checkDate: '2019-12-18',
      status: 'cancelled',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'PP',
        expiry: '2019-12-17',
        details: '123',
      },
      identityDocument2: null,
      metadata: {},
      _eTag: '"680DEE57009189F3AB732F46F5B5B467"',
      _links: {
        self: {
          href: '/identityChecks/RPT19000161',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: {},
    },
    {
      id: 'RPT19000159',
      contactId: 'MKC16000007',
      created: '2019-12-17T04:15:08.0000000Z',
      modified: '2019-12-18T09:41:38.0000000Z',
      checkDate: '2019-12-17',
      status: 'cancelled',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: '',
        typeId: 'PP',
        expiry: '2019-12-17',
        details: '123',
      },
      identityDocument2: null,
      metadata: {},
      _eTag: '"D1AB6D585C18B04BBA65C721A0AAB49E"',
      _links: {
        self: {
          href: '/identityChecks/RPT19000159',
        },
        contact: {
          href: '/contacts/MKC16000007',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: {},
    },
  ],
  pageNumber: 1,
  pageSize: 50,
  pageCount: 7,
  totalCount: 7,
  _links: {
    self: {
      href: '/identityChecks/?PageNumber=1&PageSize=50&ContactId=MKC16000007',
    },
    first: {
      href: '/identityChecks/?PageNumber=1&PageSize=50&ContactId=MKC16000007',
    },
  },
} as PagedResultIdentityCheckModel_
