import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export const appointmentDataStub: AppointmentModel = {
  id: 'RPT2000028',
  created: '2020-01-10T02:45:50',
  modified: '2020-01-10T02:45:50',
  start: '2020-01-10T10:27:01',
  end: '2020-01-10T10:40:01',
  typeId: 'VW',
  description: "It has windows, a roof and doors - it's basically a house.",
  directions: 'SW',
  recurring: false,
  cancelled: false,
  followUp: {
    due: '2020-01-10T10:20:01',
    responseId: '',
    notes: 'It has windows, a roof and doors'
  },
  property: {
    id: 'BED140946',
    arrangements: "Don't let the cat in",
    address: {
      buildingName: '',
      buildingNumber: '42',
      line1: 'Mill Road',
      line2: 'Sharnbrook',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK44 1NX',
      country: 'GB',
      geolocation: {
        latitude: 52.223253,
        longitude: -0.532454
      }
    }
  },
  organiserId: 'BED160186',
  negotiators: [
    {
      id: 'LJW',
      name: 'Liam Jowett',
      communicationDetails: [
        {
          label: 'E-Mail',
          detail: 'hphillips@reapit.com'
        }
      ]
    }
  ],
  offices: [
    {
      id: 'RPT',
      name: 'Reapit',
      communicationDetails: [
        {
          label: 'Work',
          detail: 'test'
        },
        {
          label: 'E-Mail',
          detail: 'teste'
        },
        {
          label: 'Business',
          detail: 'testb'
        }
      ]
    }
  ],
  attendee: {
    id: 'BED160186',
    type: 'applicant',
    contacts: [
      {
        id: 'BED16000217',
        name: 'Ms Kali Geddes',
        communicationDetails: [
          {
            label: 'Home',
            detail: '01632 963403'
          },
          {
            label: 'Mobile',
            detail: '07700 903403'
          },
          {
            label: 'Work',
            detail: '020 7946 3403'
          },
          {
            label: 'E-Mail',
            detail: 'kgeddes225@rpsfiction.net'
          }
        ]
      }
    ]
  },
  accompanied: false,
  negotiatorConfirmed: false,
  attendeeConfirmed: false,
  propertyConfirmed: false,
  metadata: {},
  _links: {
    self: {
      href: '/appointments/RPT2000028'
    },
    type: {
      href: '/configuration/appointmentTypes/VW'
    },
    organiser: {
      href: '/negotiators/BED160186'
    }
  }
}
