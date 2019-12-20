export const contacts = {
  pageNumber: 1,
  pageSize: 10,
  pageCount: 10,
  totalCount: 3966,
  _links: {
    self: {
      href: '/contacts/?PageNumber=1&PageSize=10',
    },
    first: {
      href: '/contacts/?PageNumber=1&PageSize=10',
    },
    next: {
      href: '/contacts/?PageNumber=2&PageSize=10',
    },
    last: {
      href: '/contacts/?PageNumber=397&PageSize=10',
    },
  },
  _embedded: [
    {
      id: 'MOD19000001',
      created: '2019-11-26T11:19:23.0000000Z',
      modified: '2019-12-13T13:32:28.0000000Z',
      title: 'Mrs',
      forename: 'Development',
      surname: 'Environment',
      dateOfBirth: '1986-06-29T13:00:00.0000000Z',
      active: false,
      marketingConsent: 'notAsked',
      identityCheck: 'pass',
      communications: [
        {
          detail: '6',
          label: 'Home',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: '15 Furzen Crescent',
          line2: 'line2',
          line3: 'line3',
          line4: null,
          postcode: 'AL10 9QN',
          countryId: null,
          buildingName: 'building name',
          buildingNumber: '1',
        },
      ],
      officeIds: ['RPT'],
      negotiatorIds: ['RPT'],
      metadata: {
        declarationRisk: {
          reason: 'Test',
          type: 'Simplified',
          riskAssessmentForm:
            'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/riskAssessment-Simplified-Test.jpg',
        },
        addresses: [
          {
            documentImage:
              'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/primary-1-building name-AL10 9QN(2).jpg',
            year: '3',
            month: '5',
            documentType: 'Account, investment or insurance documents',
          },
        ],
      },
      _links: {
        self: {
          href: '/contacts/MOD19000001',
        },
        idChecks: {
          href: '/contacts/MOD19000001/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'AYL19000004',
      created: '2019-11-05T12:47:50.0000000Z',
      modified: '2019-11-26T13:18:04.0000000Z',
      title: 'Mr',
      forename: 'Paul',
      surname: 'Rideout',
      dateOfBirth: '1981-03-25',
      active: true,
      marketingConsent: 'notAsked',
      identityCheck: 'cancelled',
      communications: [
        {
          detail: '07970709595',
          label: 'Mobile',
        },
        {
          detail: 'paul@efc.co.uk',
          label: 'E-Mail',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Stephen Crescent',
          line2: 'Humberston',
          line3: 'Grimsby',
          line4: 'North East Lincolnshir',
          postcode: 'DN36 4DT',
          countryId: 'GB',
          buildingName: '',
          buildingNumber: '38',
        },
      ],
      officeIds: ['AYL'],
      negotiatorIds: ['FGM'],
      metadata: {
        addresses: [
          {
            documentImage: 'data:',
            year: '17',
            month: '10',
            documentType: 'Current Council Tax Bill',
          },
        ],
        declarationRisk: {
          reason: 'Passed',
          type: 'Simplified',
          declarationForm: 'data:',
          riskAssessmentForm: 'data:',
        },
      },
      _links: {
        self: {
          href: '/contacts/AYL19000004',
        },
        idChecks: {
          href: '/contacts/AYL19000004/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'AYL19000003',
      created: '2019-11-05T12:35:44.0000000Z',
      modified: '2019-11-26T13:18:04.0000000Z',
      title: 'Mr',
      forename: 'Dave',
      surname: 'Gilbert',
      dateOfBirth: '1981-03-25',
      active: false,
      marketingConsent: 'notAsked',
      identityCheck: 'pending',
      communications: [
        {
          detail: '07773816633',
          label: 'Mobile',
        },
        {
          detail: 'dave@gtfc.co.uk',
          label: 'E-Mail',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Potternewton Lane',
          line2: 'Chapel Allerton',
          line3: 'Leeds',
          line4: 'West Yorkshire',
          postcode: 'LS7 3LW',
          countryId: 'GB',
          buildingName: '',
          buildingNumber: '86a',
        },
      ],
      officeIds: ['AYL'],
      negotiatorIds: ['FGM'],
      metadata: {
        addresses: [
          {
            documentImage: 'data:',
            year: '2',
            month: '10',
            documentType: 'Current Council Tax Bill',
          },
        ],
        declarationRisk: {
          reason: 'Passed',
          type: 'Simplified',
          declarationForm: 'data:',
          riskAssessmentForm: 'data:',
        },
      },
      _links: {
        self: {
          href: '/contacts/AYL19000003',
        },
        idChecks: {
          href: '/contacts/AYL19000003/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'AYL19000002',
      created: '2019-11-04T11:32:55.0000000Z',
      modified: '2019-11-26T13:18:04.0000000Z',
      title: 'Mr',
      forename: 'Charles',
      surname: 'Babbage',
      dateOfBirth: '1981-03-26',
      active: false,
      marketingConsent: 'notAsked',
      identityCheck: 'cancelled',
      communications: [
        {
          detail: '07773816633',
          label: 'Home',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Stephen Crescent',
          line2: 'Humberston',
          line3: 'Grimsby',
          line4: 'North East Lincolnshie',
          postcode: 'DN36 4DT',
          countryId: 'GB',
          buildingName: 'Tyto Alba',
          buildingNumber: '38',
        },
      ],
      officeIds: ['AYL'],
      negotiatorIds: ['FGM'],
      metadata: {
        addresses: [
          {
            documentImage:
              'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-38-Tyto Alba-DN36 4DT.jpg',
            year: '16',
            month: '12',
            documentType: 'Current Council Tax Bill',
          },
        ],
      },
      _links: {
        self: {
          href: '/contacts/AYL19000002',
        },
        idChecks: {
          href: '/contacts/AYL19000002/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT19000366',
      created: '2019-11-03T19:45:29.0000000Z',
      modified: '2019-12-11T07:11:42.0000000Z',
      title: 'Mr',
      forename: 'Dawson',
      surname: 'Scott',
      dateOfBirth: '1981-03-24T17:00:00.0000000Z',
      active: true,
      marketingConsent: 'notAsked',
      identityCheck: 'pending',
      communications: [
        {
          detail: '111111',
          label: 'Mobile',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Stephen Crescent',
          line2: 'Grimsby',
          line3: 'N E Lincs',
          line4: 'Somewhere',
          postcode: 'DN36 4DT',
          countryId: 'GB',
          buildingName: 'Name',
          buildingNumber: '38',
        },
      ],
      officeIds: ['RPT'],
      negotiatorIds: ['RPT'],
      metadata: {
        addresses: [
          {
            documentImage: 'data:',
            year: '2',
            month: '11',
            documentType: 'HMRC Tax notification documentation (this does not include P60’s)',
          },
        ],
        declarationRisk: {
          reason: 'Passed',
          type: 'Simplified',
          riskAssessmentForm: 'data:',
        },
      },
      _links: {
        self: {
          href: '/contacts/RPT19000366',
        },
        idChecks: {
          href: '/contacts/RPT19000366/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT19000365',
      created: '2019-11-03T19:09:58.0000000Z',
      modified: '2019-11-04T16:16:28.0000000Z',
      title: 'Ms',
      forename: 'Katy',
      surname: 'Easton',
      dateOfBirth: '1984-09-24',
      active: true,
      marketingConsent: 'notAsked',
      identityCheck: 'pending',
      communications: [
        {
          detail: '07773816633',
          label: 'Mobile',
        },
        {
          detail: 'katy@the-goddards.co.uk',
          label: 'E-Mail',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Northbourne Road',
          line2: 'London',
          line3: '',
          line4: '',
          postcode: 'SE5 9RL',
          countryId: 'GB',
          buildingName: 'Ash Lodge',
          buildingNumber: '3',
        },
      ],
      officeIds: ['RPT'],
      negotiatorIds: ['RPT'],
      metadata: {
        addresses: [
          {
            documentImage: 'data:',
            year: '5',
            month: '12',
            documentType: 'HMRC Tax notification documentation (this does not include P60’s)',
          },
        ],
        declarationRisk: {
          reason: 'asasd',
          type: 'Simplified',
          declarationForm: 'data:',
          riskAssessmentForm: 'data:',
        },
      },
      _links: {
        self: {
          href: '/contacts/RPT19000365',
        },
        idChecks: {
          href: '/contacts/RPT19000365/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'AYL19000001',
      created: '2019-10-31T14:19:51.0000000Z',
      modified: '2019-12-13T05:38:17.0000000Z',
      title: 'Mrs',
      forename: 'H',
      surname: 'Phillips',
      dateOfBirth: '2019-12-12',
      active: true,
      marketingConsent: 'grant',
      identityCheck: 'pass',
      communications: [
        {
          detail: 'asd',
          label: 'Home',
        },
        {
          detail: 'asd',
          label: 'Mobile',
        },
        {
          detail: 'asd',
          label: 'Work',
        },
        {
          detail: 'sad@gmail.com',
          label: 'E-Mail',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Kingsway Place',
          line2: 'London',
          line3: 'a',
          line4: 'a',
          postcode: 'EC1R 0LU',
          countryId: 'GB',
          buildingName: 'aa',
          buildingNumber: '37',
        },
      ],
      officeIds: ['AYL'],
      negotiatorIds: ['FGM'],
      metadata: {
        externalId: '98c5da30-1037-403a-98db-d50de6afcb25',
        profileAvatarUrl:
          'https://myapp-avatar-images.s3.eu-west-2.amazonaws.com/98c5da30-1037-403a-98db-d50de6afcb25.png',
        addresses: [
          {
            documentImage: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/primary-37-aa-EC1R 0LU.png',
            year: '2',
            month: '2',
            documentType: 'Mortgage Statement or Mortgage Redemption Statement',
          },
        ],
        declarationRisk: {
          reason: 'asdasd',
          type: 'Simplified',
          declarationForm:
            'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/declaration-Simplified-asdasd.png',
          riskAssessmentForm:
            'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/riskAssessment-Simplified-asdasd.png',
        },
      },
      _links: {
        self: {
          href: '/contacts/AYL19000001',
        },
        idChecks: {
          href: '/contacts/AYL19000001/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT19000363',
      created: '2019-10-25T11:09:08.0000000Z',
      modified: '2019-12-10T10:13:44.0000000Z',
      title: 'Mr',
      forename: 'Rogan',
      surname: 'Johnstone',
      dateOfBirth: '1986-06-30',
      active: true,
      marketingConsent: 'notAsked',
      identityCheck: 'pending',
      communications: [
        {
          detail: '01632 964799',
          label: 'Home',
        },
        {
          detail: '07700 904799',
          label: 'Mobile',
        },
        {
          detail: '020 7946 4799',
          label: 'Work',
        },
        {
          detail: 'rjohnstone534@iwantdetails.co.uk',
          label: 'E-Mail',
        },
      ],
      addresses: [
        {
          type: 'primary',
          line1: 'Farm Street',
          line2: 'High Wycombe',
          line3: 'Milton Keynes',
          line4: '',
          postcode: 'MK4 4AG',
          countryId: '',
          buildingName: '',
          buildingNumber: '46',
        },
      ],
      officeIds: ['MKC'],
      negotiatorIds: ['RWX'],
      metadata: {
        externalId: '490cd314-b218-4e33-b36e-347d45dd3d2b',
        profileAvatarUrl:
          'https://myapp-avatar-images.s3.eu-west-2.amazonaws.com/490cd314-b218-4e33-b36e-347d45dd3d2b.png',
      },
      _links: {
        self: {
          href: '/contacts/RPT19000363',
        },
        idChecks: {
          href: '/contacts/RPT19000363/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'BED19000003',
      created: '2019-10-24T09:11:29.0000000Z',
      modified: '2019-10-24T09:14:55.0000000Z',
      title: 'Mr',
      forename: 'James',
      surname: 'Brown',
      dateOfBirth: null,
      active: true,
      marketingConsent: 'notAsked',
      identityCheck: 'pending',
      communications: [
        {
          detail: '07800654321',
          label: 'Mobile',
        },
        {
          detail: 'Jbrown@test.com',
          label: 'E-Mail',
        },
      ],
      addresses: null,
      officeIds: ['BED'],
      negotiatorIds: ['ARM'],
      metadata: null,
      _links: {
        self: {
          href: '/contacts/BED19000003',
        },
        idChecks: {
          href: '/contacts/BED19000003/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: 'RPT19000362',
      created: '2019-10-24T08:29:00.0000000Z',
      modified: '2019-10-24T08:30:17.0000000Z',
      title: '',
      forename: '',
      surname: '',
      dateOfBirth: null,
      active: true,
      marketingConsent: 'notAsked',
      identityCheck: 'unchecked',
      communications: [
        {
          detail: 'tdfdsgd@fsdfgdf.com',
          label: 'E-Mail',
        },
      ],
      addresses: null,
      officeIds: ['RPT'],
      negotiatorIds: ['RPT'],
      metadata: null,
      _links: {
        self: {
          href: '/contacts/RPT19000362',
        },
        idChecks: {
          href: '/contacts/RPT19000362/identityChecks',
        },
      },
      _embedded: null,
    },
  ],
}
