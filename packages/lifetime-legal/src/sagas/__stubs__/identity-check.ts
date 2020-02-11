import { IdentityCheckModel } from '@reapit/foundations-ts-definitions'

export const identityCheck = {
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
  _eTag: '385DCC877457FA81A5780A4467CE3E5B',
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
} as IdentityCheckModel
