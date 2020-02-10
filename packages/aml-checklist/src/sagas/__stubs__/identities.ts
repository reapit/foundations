export const identities = {
  _embedded: [
    {
      id: 'RPT19000104',
      contactId: 'AYL19000001',
      created: '0001-01-01T00:00:00.0000000',
      modified: '2019-12-13T05:41:45.0000000Z',
      checkDate: '0001-01-01T00:00:00.0000000',
      status: 'pass',
      negotiatorId: 'LJW',
      identityDocument1: {
        documentId: 'SOME_ID',
        typeId: 'TX',
        expiry: '2020-02-07',
        details: 'Hshs',
      },
      identityDocument2: {
        documentId: 'SOME_ID',
        typeId: 'CI',
        expiry: '2019-12-21',
        details: 'a',
      },
      metadata: {},
      _eTag: '"51F8EECB09FB89903C42CAB63E3D5D0C"',
      _links: {
        self: {
          href: '/identityChecks/RPT19000104',
        },
        contact: {
          href: '/contacts/AYL19000001',
        },
        documentType1: {
          href: '/configuration/identityDocumentTypes/TX',
        },
        documentType2: {
          href: '/configuration/identityDocumentTypes/CI',
        },
      },
    },
  ],
  pageNumber: 1,
  pageSize: 50,
  pageCount: 1,
  totalCount: 1,
  _links: {
    self: {
      href: '/identityChecks/?PageNumber=1&PageSize=50&ContactId=AYL19000001',
    },
    first: {
      href: '/identityChecks/?PageNumber=1&PageSize=50&ContactId=AYL19000001',
    },
  },
}
