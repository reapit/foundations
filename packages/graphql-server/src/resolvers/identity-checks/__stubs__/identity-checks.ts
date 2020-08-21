import { PagedResultIdentityCheckModel_ } from '../../../types'

export const identityChecksMock: PagedResultIdentityCheckModel_ = {
  _embedded: [
    {
      id: 'RPT20000093',
      contactId: 'RPT20000207',
      created: '2020-03-06T10:01:38.0000000Z',
      modified: '2020-03-06T10:01:38.0000000Z',
      checkDate: '2020-01-22',
      status: 'pending',
      negotiatorId: 'PHKL',
      identityDocument1: {
        documentId: null,
        typeId: 'DL',
        expiry: '2050-03-22',
        details: 'Driving License',
      },
      identityDocument2: {
        documentId: null,
        typeId: 'PP',
        expiry: '2045-12-01',
        details: 'Passport',
      },
      metadata: null,
      _eTag: '"F6438EA989CA8385C2A5B0E7D6D6259C"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000093',
        },
        contact: {
          href: '/contacts/RPT20000207',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/DL',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT20000092',
      contactId: 'RPT20000205',
      created: '2020-03-05T10:01:31.0000000Z',
      modified: '2020-03-06T10:01:39.0000000Z',
      checkDate: '2020-01-22',
      status: 'pending',
      negotiatorId: 'JAS',
      identityDocument1: {
        documentId: null,
        typeId: 'DL',
        expiry: '2050-03-22',
        details: 'Driving License',
      },
      identityDocument2: {
        documentId: null,
        typeId: 'PP',
        expiry: '2045-12-01',
        details: 'Passport',
      },
      metadata: null,
      _eTag: '"BDC56087FA000A5065F6219DF525272B"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000092',
        },
        contact: {
          href: '/contacts/RPT20000205',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/DL',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT20000091',
      contactId: 'RPT20000203',
      created: '2020-03-04T10:01:51.0000000Z',
      modified: '2020-03-05T10:01:32.0000000Z',
      checkDate: '2020-01-22',
      status: 'pending',
      negotiatorId: 'JAS',
      identityDocument1: {
        documentId: null,
        typeId: 'DL',
        expiry: '2050-03-22',
        details: 'Driving License',
      },
      identityDocument2: {
        documentId: null,
        typeId: 'PP',
        expiry: '2045-12-01',
        details: 'Passport',
      },
      metadata: null,
      _eTag: '"CFD56A5E04B649418E15BFBD271CDA08"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000091',
        },
        contact: {
          href: '/contacts/RPT20000203',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/DL',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT20000090',
      contactId: 'RPT20000201',
      created: '2020-03-03T10:01:19.0000000Z',
      modified: '2020-03-04T10:01:52.0000000Z',
      checkDate: '2020-01-22',
      status: 'pending',
      negotiatorId: 'JAS',
      identityDocument1: {
        documentId: null,
        typeId: 'DL',
        expiry: '2050-03-22',
        details: 'Driving License',
      },
      identityDocument2: {
        documentId: null,
        typeId: 'PP',
        expiry: '2045-12-01',
        details: 'Passport',
      },
      metadata: null,
      _eTag: '"0ACCFFB96404ED368C2734B1FE7C2C09"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000090',
        },
        contact: {
          href: '/contacts/RPT20000201',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/DL',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT20000089',
      contactId: 'RPT20000199',
      created: '2020-03-02T10:01:21.0000000Z',
      modified: '2020-03-03T10:01:19.0000000Z',
      checkDate: '2020-01-22',
      status: 'pending',
      negotiatorId: 'JAS',
      identityDocument1: {
        documentId: null,
        typeId: 'DL',
        expiry: '2050-03-22',
        details: 'Driving License',
      },
      identityDocument2: {
        documentId: null,
        typeId: 'PP',
        expiry: '2045-12-01',
        details: 'Passport',
      },
      metadata: null,
      _eTag: '"2A0FF835E60051CAF741512644B03CD8"',
      _links: {
        self: {
          href: '/identityChecks/RPT20000089',
        },
        contact: {
          href: '/contacts/RPT20000199',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/DL',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/PP',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 5,
  pageCount: 5,
  totalCount: 264,
  _links: {
    self: {
      href: '/identityChecks/?PageNumber=1&PageSize=5',
    },
    first: {
      href: '/identityChecks/?PageNumber=1&PageSize=5',
    },
    next: {
      href: '/identityChecks/?PageNumber=2&PageSize=5',
    },
    last: {
      href: '/identityChecks/?PageNumber=53&PageSize=5',
    },
  },
}
