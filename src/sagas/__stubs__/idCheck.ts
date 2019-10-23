import { IdentityCheckModel } from '@/types/contact-api-schema'

export const idCheck: IdentityCheckModel = {
  id: 'AYL19000004',
  contactId: 'AYL19000002',
  created: '2019-10-14T15:23:21',
  modified: '2019-10-22T09:46:24',
  checkDate: '2019-10-14T15:23:17',
  status: 'pass',
  negotiatorId: 'LJW',
  documents: [
    {
      typeId: 'PP',
      expiry: '2019-12-05T16:44:00',
      details: 'This is a test'
    },
    {
      typeId: 'ER',
      expiry: '2019-12-05T16:44:00',
      details: 'This is a test'
    }
  ],
  metadata: {
    primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000002-This is a test.jpg',
    secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000002-secondary test.jpg'
  },
  links: [
    {
      rel: 'self',
      href: 'http://reapit.cloud.tyk.io/AYL19000002/identityChecks/AYL19000004',
      action: 'GET'
    },
    {
      rel: 'contact',
      href: 'http://reapit.cloud.tyk.io/AYL19000002',
      action: 'GET'
    },
    {
      rel: 'idDocumentType',
      href: 'https://reapit.cloud.tyk.io/configuration/identityDocumentTypes/PP',
      action: 'GET'
    },
    {
      rel: 'idDocumentType',
      href: 'https://reapit.cloud.tyk.io/configuration/identityDocumentTypes/ER',
      action: 'GET'
    }
  ]
}
