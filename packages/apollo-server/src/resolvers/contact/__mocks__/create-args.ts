import { CreateContactArgs } from "../contact";

export const mockCreateArgs = {
  id: 'MKC16000098',
  created: '2019-04-23T16:05:19.0000000Z',
  modified: null,
  title: 'Ms',
  forename: 'Saoirse',
  surname: 'Chadwick',
  dateOfBirth: '1986-06-30',
  active: true,
  marketingConsent: 'notAsked',
  identityCheck: 'unchecked',
  communications: [
    {
      detail: '01632 961556',
      label: 'Home',
    },
    {
      detail: '07700 901556',
      label: 'Mobile',
    },
    {
      detail: '020 7946 1556',
      label: 'Work',
    },
    {
      detail: 'schadwick512@rpsfiction.net',
      label: 'E-Mail',
    },
  ],
  addresses: [
    {
      type: 'primary',
      line1: 'Station Road',
      line2: 'Bow Brickhill',
      line3: 'Milton Keynes',
      line4: 'Buckinghamshire',
      postcode: 'MK17 9JU',
      countryId: '',
      buildingName: 'Tilbrook Farm',
      buildingNumber: '',
    },
  ],
  officeIds: ['MKC'],
  negotiatorIds: ['RMK'],
  metadata: {},
} as CreateContactArgs
