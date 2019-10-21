export const contact = {
  id: 'MKC16000098',
  created: '2019-05-12T17:05:19',
  title: 'Ms',
  forename: 'Saoirse',
  surname: 'Chadwick',
  active: true,
  marketingConsent: 'notAsked',
  identityCheck: 'unchecked',
  communications: [
    {
      label: 'Home',
      detail: '01632 961556'
    },
    {
      label: 'Mobile',
      detail: '07700 901556'
    },
    {
      label: 'Work',
      detail: '020 7946 1556'
    },
    {
      label: 'E-Mail',
      detail: 'schadwick512@rpsfiction.net'
    }
  ],
  addresses: [
    {
      type: 'primary',
      buildingName: 'Tilbrook Farm',
      buildingNumber: '',
      line1: 'Station Road',
      line2: 'Bow Brickhill',
      line3: 'Milton Keynes',
      line4: 'Buckinghamshire',
      postcode: 'MK17 9JU',
      countryId: ''
    }
  ],
  relationships: [
    {
      id: 'RMK',
      type: 'negotiator'
    },
    {
      id: 'MKC',
      type: 'office'
    }
  ],
  metadata: {
    primaryId: [
      {
        documents: [
          {
            typeId: 'CR',
            expiry: '2019-10-15T10:00:00Z',
            details: '1123',
            fileUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC16000007-1123.jpg'
          }
        ]
      }
    ],
    secondaryId: [
      {
        documents: [
          {
            typeId: 'PP',
            expiry: '2019-10-10T00:00:00Z',
            details: '123',
            fileUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC16000007-123(2).jpg'
          }
        ]
      }
    ],
    addresses: [
      {
        documentImage: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg',
        year: '1911',
        month: '6',
        documentType: 'Current Benefits Agency letter'
      }
    ]
  }
}

export const idCheck = {
  id: 'RPT19000010',
  contactId: 'MKC11001623',
  created: '0001-01-01T00:00:00',
  modified: '2019-10-19T02:52:10',
  checkDate: '2019-10-19T02:52:10',
  status: 'pending',
  negotiatorId: 'DAC',
  documents: [
    {
      typeId: 'RF',
      expiry: '2019-10-24T09:51:48',
      details: '2131231'
    }
  ],
  metadata: {
    secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
    agentCheck: {
      referralType: 'Vendor Compliance',
      timeSelection: '10:00',
      clientType: 'Individual',
      placeMeet: 'Home Address',
      isUKResident: 'Yes'
    }
  }
}
