import { ContactModel } from '@reapit/foundations-ts-definitions'

export const contact = {
  id: 'MKC16000007',
  created: '2019-03-27T12:31:21.0000000Z',
  modified: '2020-01-14T09:55:50.0000000Z',
  title: 'Mr',
  forename: 'Carson',
  surname: 'Philip',
  dateOfBirth: '2019-11-22',
  active: true,
  marketingConsent: 'notAsked',
  identityCheck: 'pending',
  source: '',
  homePhone: '01632 968347',
  workPhone: '020 7946 8347',
  mobilePhone: '07700 908347',
  email: 'cphilip133@rpsfiction.net',
  primaryAddress: {
    type: 'primary',
    buildingName: '123',
    buildingNumber: '1',
    line1: 'Harcourt Close',
    line2: 'Leighton Buzzard',
    line3: 'Bedfordshire',
    line4: '123123',
    postcode: 'LU7 2ST',
    countryId: 'GB',
  },
  secondaryAddress: {
    type: 'secondary',
    buildingName: '123',
    buildingNumber: '1',
    line1: 'Harcourt Close',
    line2: 'Leighton Buzzard',
    line3: 'Bedfordshire',
    line4: '123123',
    postcode: 'LU7 2ST',
    countryId: 'GB',
  },
  workAddress: '',
  officeIds: ['MKC'],
  negotiatorIds: ['RMK'],
  metadata: {},
  _eTag: '"9CBE436919C6BE89A8642BC70A7CFAEE"',
  _links: {
    self: {
      href: '/contacts/MKC16000007',
    },
    documents: {
      href: '/documents/?ownerType=contact&ownerId=MKC16000007',
    },
    identityChecks: {
      href: '/identityChecks/?contactId=MKC16000007',
    },
    offices: {
      href: '/offices/?id=MKC',
    },
    negotiators: {
      href: '/negotiators/?id=RMK',
    },
  },
  _embedded: {},
} as ContactModel
