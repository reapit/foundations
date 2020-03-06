import { IdentityCheckModel } from '../../../types'

export const identityCheckMock: IdentityCheckModel = {
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
}
