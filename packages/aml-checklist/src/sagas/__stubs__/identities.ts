export const identities = {
  _embedded: [
    {
      id: 'RPT19000114',
      contactId: 'MKC19000013',
      created: '0001-01-01T00:00:00',
      modified: '2019-11-01T15:28:09',
      checkDate: '0001-01-01T00:00:00',
      status: 'pass',
      negotiatorId: 'LJW',
      document1: {
        typeId: 'DL',
        expiry: '2019-11-14T00:00:00',
        details: 'adwqr'
      },
      metadata: {
        primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC19000013-adwqr.png'
      },
      _links: {
        self: {
          href: '/identityChecks/RPT19000114'
        },
        contact: {
          href: '/contacts/MKC19000013'
        },
        identityDocument1Type: {
          href: '/configuration/identityDocumentTypes/DL'
        }
      }
    }
  ],
  pageNumber: 1,
  pageSize: 50,
  pageCount: 1,
  totalCount: 1,
  _links: {
    self: {
      href:
        '/identityChecks/?PageNumber=1&PageSize=50&ContactId=MKC19000013&ContactId=BED16000182&ContactId=MKC16000060&ContactId=BED16000099&ContactId=MKC16000011&ContactId=MKC15000909&ContactId=BUC15000679&ContactId=BED15002235&ContactId=BED15002208&ContactId=BED15001889'
    },
    first: {
      href:
        '/identityChecks/?PageNumber=1&PageSize=50&ContactId=MKC19000013&ContactId=BED16000182&ContactId=MKC16000060&ContactId=BED16000099&ContactId=MKC16000011&ContactId=MKC15000909&ContactId=BUC15000679&ContactId=BED15002235&ContactId=BED15002208&ContactId=BED15001889'
    }
  }
}
