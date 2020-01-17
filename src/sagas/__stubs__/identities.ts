export const identities = {
  _embedded: [
    {
      id: 'RPT19000083',
      contactId: 'MKC13000122',
      created: '0001-01-01T00:00:00',
      modified: '2020-01-02T09:29:36',
      checkDate: '0001-01-01T00:00:00',
      status: 'pass',
      negotiatorId: 'LJW',
      documents: [
        {
          typeId: 'PP',
          expiry: '2020-07-03T23:00:00',
          details: '123123',
          _links: {
            idDocumentType: {
              href: '/configuration/identityDocumentTypes/PP'
            }
          }
        },
        {
          typeId: 'BB',
          expiry: '2020-01-12T00:00:00',
          details: 'ID Reference',
          _links: {
            idDocumentType: {
              href: '/configuration/identityDocumentTypes/BB'
            }
          }
        }
      ],
      metadata: {
        primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC13000122-123123(4).jpg',
        secondaryIdUrl: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/MKC13000122-ID Reference.png',
        referralType: 'Estate Planning',
        dateCallClient: '2020-01-03T09:29:25',
        timeSelection: '01:00',
        clientType: 'Individual',
        isUKResident: 'No',
        placeMeet: 'Home Address'
      }
    },
    {
      id: 'RPT19000105',
      contactId: 'BED12001604',
      created: '0001-01-01T00:00:00',
      modified: '2019-11-01T09:22:37',
      checkDate: '0001-01-01T00:00:00',
      status: 'pass',
      negotiatorId: 'LJW',
      documents: [
        {
          typeId: 'CI',
          expiry: '2019-11-16T00:00:00',
          details: 'test',
          _links: {
            idDocumentType: {
              href: '/configuration/identityDocumentTypes/CI'
            }
          }
        }
      ],
      metadata: {
        primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/BED12001604-test.png',
        referralType: 'Estate Planning',
        dateCallClient: '2019-11-30T09:21:25',
        timeSelection: '14:22',
        clientType: 'Individual',
        isUKResident: 'Yes',
        placeMeet: 'Home Address'
      }
    }
  ],
  pageNumber: 1,
  pageSize: 50,
  pageCount: 2,
  totalCount: 2,
  _links: {
    self: {
      href:
        '/identityChecks/?PageNumber=1&PageSize=50&ContactId=MKC13000122&ContactId=BED12001604&ContactId=MKC12000004&ContactId=MKC07001329'
    },
    first: {
      href:
        '/identityChecks/?PageNumber=1&PageSize=50&ContactId=MKC13000122&ContactId=BED12001604&ContactId=MKC12000004&ContactId=MKC07001329'
    }
  }
}
