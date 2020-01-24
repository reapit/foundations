export const contact = {
  id: 'MKC13000122',
  created: '2017-01-10T11:33:37.0000000Z',
  modified: '2020-01-21T14:04:50.0000000Z',
  title: 'Msss',
  forename: 'Holly',
  surname: 'Rees',
  dateOfBirth: '1986-06-30',
  active: true,
  marketingConsent: 'notAsked',
  source: {
    id: '',
    type: ''
  },
  homePhone: '01632 968608',
  workPhone: '020 7946 8608',
  mobilePhone: '07700 908608',
  email: 'hrees927@rpsfiction.net',
  primaryAddress: {
    type: 'home',
    buildingName: 'Larch Cottage',
    buildingNumber: '12',
    line1: 'High Street North',
    line2: 'Stewkley',
    line3: 'Leighton Buzzard',
    line4: 'Buckinghamshire',
    postcode: 'LU7 0EP',
    countryId: 'GB'
  },
  secondaryAddress: {
    type: 'previous',
    buildingName: 'Larch Cottage',
    buildingNumber: '7',
    line1: 'Ledburn',
    line2: 'Leighton Buzzard',
    line3: 'Buckinghamshire',
    line4: '',
    postcode: 'LU7 0PX',
    countryId: ''
  },
  officeIds: ['MKC'],
  negotiatorIds: ['JPB'],
  metadata: {
    addresses: [
      {
        documentImage:
          'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/home-12-Larch Cottage-LU7 0EP.png',
        year: '2',
        month: '2',
        documentType: 'Bank / Building Society / Statement'
      },
      {
        documentImage:
          'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/previous-7-Larch Cottage-LU7 0PX(1).jpg',
        year: '3',
        month: '1',
        documentType: 'Credit Card Statements from main provider'
      }
    ],
    declarationRisk: {
      reason: 'Test',
      type: 'Simplified',
      riskAssessmentForm:
        'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/riskAssessment-Simplified-Test(1).png'
    }
  },
  _links: {
    self: {
      href: '/contacts/MKC13000122'
    },
    documents: {
      href: '/documents/?OwnerType=contact&OwnerId=MKC13000122'
    },
    identityChecks: {
      href: '/identityChecks/?ContactId=MKC13000122'
    }
  }
}

export const idCheck = {
  id: 'RPT19000083',
  contactId: 'MKC13000122',
  created: '0001-01-01T00:00:00',
  modified: '2020-01-21T03:39:53',
  checkDate: '0001-01-01T00:00:00',
  status: 'pass',
  negotiatorId: 'LJW',
  document1: {
    typeId: 'PP',
    expiry: '2020-07-03T23:00:00',
    details: '123123'
  },
  document2: {
    typeId: 'BB',
    expiry: '2020-01-12T00:00:00',
    details: 'ID Reference'
  },
  metadata: {
    primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png',
    secondaryIdUrl: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/MKC13000122-ID Reference.png'
  },
  _links: {
    self: {
      href: '/identityChecks/RPT19000083'
    },
    contact: {
      href: '/contacts/MKC13000122'
    },
    identityDocument1Type: {
      href: '/configuration/identityDocumentTypes/PP'
    },
    identityDocument2Type: {
      href: '/configuration/identityDocumentTypes/BB'
    }
  }
}
