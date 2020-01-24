export const idCheck = {
  id: 'RPT19000104',
  contactId: 'AYL19000001',
  created: '0001-01-01T00:00:00',
  modified: '2019-12-13T05:41:45',
  checkDate: '0001-01-01T00:00:00',
  status: 'pass',
  negotiatorId: 'LJW',
  document1: {
    typeId: 'TX',
    expiry: '2020-02-07T00:00:00',
    details: 'Hshs'
  },
  document2: {
    typeId: 'CI',
    expiry: '2019-12-21T00:00:00',
    details: 'a'
  },
  metadata: {
    primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png'
  },
  _links: {
    self: {
      href: '/identityChecks/RPT19000104'
    },
    contact: {
      href: '/contacts/AYL19000001'
    },
    identityDocument1Type: {
      href: '/configuration/identityDocumentTypes/TX'
    },
    identityDocument2Type: {
      href: '/configuration/identityDocumentTypes/CI'
    }
  }
}
