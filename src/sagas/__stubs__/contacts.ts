export const contacts = {
  _embedded: [
    {
      id: 'MKC13000122',
      created: '2017-01-10T11:33:37.0000000Z',
      modified: '2020-01-02T09:28:53.0000000Z',
      title: 'Mss',
      forename: 'Holly',
      surname: 'Rees',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 968608'
        },
        {
          label: 'Mobile',
          detail: '07700 908608'
        },
        {
          label: 'Work',
          detail: '020 7946 8608'
        },
        {
          label: 'E-Mail',
          detail: 'hrees927@rpsfiction.net'
        }
      ],
      addresses: [
        {
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
        {
          type: 'previous',
          buildingName: 'Larch Cottage',
          buildingNumber: '7',
          line1: 'Ledburn',
          line2: 'Leighton Buzzard',
          line3: 'Buckinghamshire',
          line4: '',
          postcode: 'LU7 0PX',
          countryId: ''
        }
      ],
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
              'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/previous-7-Larch Cottage-LU7 0PX.png',
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
    },
    {
      id: 'BED12001604',
      created: '2015-08-04T08:06:44.0000000Z',
      modified: '2019-10-31T09:56:28.0000000Z',
      title: 'Ms',
      forename: 'Holly',
      surname: 'Marshall',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 966030'
        },
        {
          label: 'Mobile',
          detail: '07700 906030'
        },
        {
          label: 'Work',
          detail: '020 7946 6030'
        },
        {
          label: 'E-Mail',
          detail: 'hmarshall98@rpsfiction.net'
        }
      ],
      addresses: [
        {
          type: 'primary',
          buildingName: 'Mountain Ash',
          buildingNumber: '',
          line1: 'Station Road',
          line2: 'Ampthill',
          line3: 'Bedfordshire',
          line4: '',
          postcode: 'MK45 2RE',
          countryId: ''
        }
      ],
      officeIds: ['BED'],
      negotiatorIds: ['MM'],
      metadata: {
        addresses: [
          {
            documentImage:
              'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary--Mountain Ash-MK45 2RE(1).jpg',
            year: '8',
            month: '3',
            documentType: 'Current Council Tax Bill'
          }
        ]
      },
      _links: {
        self: {
          href: '/contacts/BED12001604'
        },
        documents: {
          href: '/documents/?OwnerType=contact&OwnerId=BED12001604'
        },
        identityChecks: {
          href: '/identityChecks/?ContactId=BED12001604'
        }
      }
    },
    {
      id: 'MKC12000004',
      created: '2015-04-15T14:16:48.0000000Z',
      modified: '2020-01-02T09:30:05.0000000Z',
      title: 'Msssss',
      forename: 'Holly',
      surname: 'Bremner',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 960917'
        },
        {
          label: 'Mobile',
          detail: '07700 900917'
        },
        {
          label: 'Work',
          detail: '020 7946 0917'
        },
        {
          label: 'E-Mail',
          detail: 'hbremner859@rpsfiction.net'
        }
      ],
      addresses: [
        {
          type: 'primary',
          buildingName: 'Larch Cottage',
          buildingNumber: '21',
          line1: 'Salisbury Grove',
          line2: 'Giffard Park',
          line3: 'Milton Keynes',
          line4: 'Buckinghamshire',
          postcode: 'MK14 5QA',
          countryId: ''
        }
      ],
      officeIds: ['MKC'],
      negotiatorIds: ['MLD'],
      metadata: {
        addresses: [
          {
            documentImage:
              'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/primary-21-Larch Cottage-MK14 5QA.webp',
            year: '5',
            month: '3',
            documentType: 'Current Full UK Driving Licence'
          }
        ]
      },
      _links: {
        self: {
          href: '/contacts/MKC12000004'
        },
        documents: {
          href: '/documents/?OwnerType=contact&OwnerId=MKC12000004'
        },
        identityChecks: {
          href: '/identityChecks/?ContactId=MKC12000004'
        }
      }
    },
    {
      id: 'MKC07001329',
      created: '2010-10-05',
      modified: '2019-11-01T09:08:50.0000000Z',
      title: 'Mss',
      forename: 'Holly',
      surname: 'Blades',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 960745'
        },
        {
          label: 'Mobile',
          detail: '07700 900745'
        },
        {
          label: 'Work',
          detail: '020 7946 0745'
        },
        {
          label: 'E-Mail',
          detail: 'hblades625@rpsfiction.net'
        }
      ],
      addresses: [
        {
          type: 'primary',
          buildingName: '',
          buildingNumber: '91',
          line1: 'Crowborough Lane',
          line2: 'Kents Hill',
          line3: 'Milton Keynes',
          line4: 'Buckinghamshire',
          postcode: 'MK7 6JN',
          countryId: ''
        }
      ],
      officeIds: ['MKC'],
      negotiatorIds: ['AZB'],
      metadata: {},
      _links: {
        self: {
          href: '/contacts/MKC07001329'
        },
        documents: {
          href: '/documents/?OwnerType=contact&OwnerId=MKC07001329'
        },
        identityChecks: {
          href: '/identityChecks/?ContactId=MKC07001329'
        }
      }
    }
  ],
  pageNumber: 1,
  pageSize: 10,
  pageCount: 4,
  totalCount: 4,
  _links: {
    self: {
      href: '/contacts/?PageNumber=1&PageSize=10&name=Holly'
    },
    first: {
      href: '/contacts/?PageNumber=1&PageSize=10&name=Holly'
    }
  }
}

export const responseContactsWithStatus = {
  _embedded: [
    {
      created: '2017-01-10T11:33:37.0000000Z',
      modified: '2020-01-02T09:28:53.0000000Z',
      title: 'Mss',
      forename: 'Holly',
      surname: 'Rees',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 968608'
        },
        {
          label: 'Mobile',
          detail: '07700 908608'
        },
        {
          label: 'Work',
          detail: '020 7946 8608'
        },
        {
          label: 'E-Mail',
          detail: 'hrees927@rpsfiction.net'
        }
      ],
      addresses: [
        {
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
        {
          type: 'previous',
          buildingName: 'Larch Cottage',
          buildingNumber: '7',
          line1: 'Ledburn',
          line2: 'Leighton Buzzard',
          line3: 'Buckinghamshire',
          line4: '',
          postcode: 'LU7 0PX',
          countryId: ''
        }
      ],
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
              'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/previous-7-Larch Cottage-LU7 0PX.png',
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
      },
      id: 'MKC13000122',
      identityCheck: 'pass'
    },
    {
      created: '2015-08-04T08:06:44.0000000Z',
      modified: '2019-10-31T09:56:28.0000000Z',
      title: 'Ms',
      forename: 'Holly',
      surname: 'Marshall',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 966030'
        },
        {
          label: 'Mobile',
          detail: '07700 906030'
        },
        {
          label: 'Work',
          detail: '020 7946 6030'
        },
        {
          label: 'E-Mail',
          detail: 'hmarshall98@rpsfiction.net'
        }
      ],
      addresses: [
        {
          type: 'primary',
          buildingName: 'Mountain Ash',
          buildingNumber: '',
          line1: 'Station Road',
          line2: 'Ampthill',
          line3: 'Bedfordshire',
          line4: '',
          postcode: 'MK45 2RE',
          countryId: ''
        }
      ],
      officeIds: ['BED'],
      negotiatorIds: ['MM'],
      metadata: {
        addresses: [
          {
            documentImage:
              'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary--Mountain Ash-MK45 2RE(1).jpg',
            year: '8',
            month: '3',
            documentType: 'Current Council Tax Bill'
          }
        ]
      },
      _links: {
        self: {
          href: '/contacts/BED12001604'
        },
        documents: {
          href: '/documents/?OwnerType=contact&OwnerId=BED12001604'
        },
        identityChecks: {
          href: '/identityChecks/?ContactId=BED12001604'
        }
      },
      id: 'BED12001604',
      identityCheck: 'pass'
    },
    {
      created: '2015-04-15T14:16:48.0000000Z',
      modified: '2020-01-02T09:30:05.0000000Z',
      title: 'Msssss',
      forename: 'Holly',
      surname: 'Bremner',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 960917'
        },
        {
          label: 'Mobile',
          detail: '07700 900917'
        },
        {
          label: 'Work',
          detail: '020 7946 0917'
        },
        {
          label: 'E-Mail',
          detail: 'hbremner859@rpsfiction.net'
        }
      ],
      addresses: [
        {
          type: 'primary',
          buildingName: 'Larch Cottage',
          buildingNumber: '21',
          line1: 'Salisbury Grove',
          line2: 'Giffard Park',
          line3: 'Milton Keynes',
          line4: 'Buckinghamshire',
          postcode: 'MK14 5QA',
          countryId: ''
        }
      ],
      officeIds: ['MKC'],
      negotiatorIds: ['MLD'],
      metadata: {
        addresses: [
          {
            documentImage:
              'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/primary-21-Larch Cottage-MK14 5QA.webp',
            year: '5',
            month: '3',
            documentType: 'Current Full UK Driving Licence'
          }
        ]
      },
      _links: {
        self: {
          href: '/contacts/MKC12000004'
        },
        documents: {
          href: '/documents/?OwnerType=contact&OwnerId=MKC12000004'
        },
        identityChecks: {
          href: '/identityChecks/?ContactId=MKC12000004'
        }
      },
      id: 'MKC12000004'
    },
    {
      created: '2010-10-05',
      modified: '2019-11-01T09:08:50.0000000Z',
      title: 'Mss',
      forename: 'Holly',
      surname: 'Blades',
      active: true,
      marketingConsent: 'notAsked',
      source: {
        id: '',
        type: ''
      },
      communications: [
        {
          label: 'Home',
          detail: '01632 960745'
        },
        {
          label: 'Mobile',
          detail: '07700 900745'
        },
        {
          label: 'Work',
          detail: '020 7946 0745'
        },
        {
          label: 'E-Mail',
          detail: 'hblades625@rpsfiction.net'
        }
      ],
      addresses: [
        {
          type: 'primary',
          buildingName: '',
          buildingNumber: '91',
          line1: 'Crowborough Lane',
          line2: 'Kents Hill',
          line3: 'Milton Keynes',
          line4: 'Buckinghamshire',
          postcode: 'MK7 6JN',
          countryId: ''
        }
      ],
      officeIds: ['MKC'],
      negotiatorIds: ['AZB'],
      metadata: {},
      _links: {
        self: {
          href: '/contacts/MKC07001329'
        },
        documents: {
          href: '/documents/?OwnerType=contact&OwnerId=MKC07001329'
        },
        identityChecks: {
          href: '/identityChecks/?ContactId=MKC07001329'
        }
      },
      id: 'MKC07001329'
    }
  ],
  pageNumber: 1,
  pageSize: 10,
  pageCount: 4,
  totalCount: 4,
  _links: {
    self: {
      href: '/contacts/?PageNumber=1&PageSize=10&name=Holly'
    },
    first: {
      href: '/contacts/?PageNumber=1&PageSize=10&name=Holly'
    }
  }
}
