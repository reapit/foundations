import { PagedResultContactsModel } from '@/types/contacts'

export const resultDataStub: PagedResultContactsModel = {
  data: [
    {
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
      ]
    }
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 1
}
