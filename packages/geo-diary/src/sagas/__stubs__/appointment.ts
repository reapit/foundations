import { ExtendedAppointmentModel } from '@/types/core'
import { propertyStub } from '@/sagas/__stubs__/properties'
import { officeStub } from '@/sagas/__stubs__/offices'
import { negotiatorStub } from '@/sagas/__stubs__/negotiators'

export const appointmentDataStub: ExtendedAppointmentModel = {
  id: 'RPT2000028',
  created: '2020-01-10T02:45:50',
  modified: '2020-01-10T02:45:50',
  start: '2020-01-10T10:27:01',
  end: '2020-01-10T10:40:01',
  typeId: 'VW',
  description: "It has windows, a roof and doors - it's basically a house.",
  recurring: false,
  cancelled: false,
  followUp: {
    due: '2020-01-10T10:20:01',
    responseId: '',
    notes: 'It has windows, a roof and doors',
  },
  property: {
    id: 'BED140946',
    viewingArrangements: "Don't let the cat in",
    address: {
      buildingName: '',
      buildingNumber: '42',
      line1: 'Mill Road',
      line2: 'Sharnbrook',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK44 1NX',
      geolocation: {
        latitude: 52.223253,
        longitude: -0.532454,
      },
    },
  },
  organiserId: 'BED160186',
  negotiators: [
    {
      id: 'LJW',
      name: 'Liam Jowett',
    },
  ],
  offices: [
    {
      id: 'RPT',
      name: 'Reapit',
    },
  ],
  attendee: {
    id: 'BED160186',
    type: 'applicant',
    contacts: [
      {
        id: 'BED16000217',
        name: 'Ms Kali Geddes',
        homePhone: '01632 963403',
        mobilePhone: '07700 903403',
        workPhone: '020 7946 3403',
        email: 'kgeddes225@rpsfiction.net',
      },
    ],
  },
  accompanied: false,
  negotiatorConfirmed: false,
  attendeeConfirmed: false,
  propertyConfirmed: false,
  metadata: {},
  _links: {
    self: {
      href: '/appointments/RPT2000028',
    },
    type: {
      href: '/configuration/appointmentTypes/VW',
    },
    organiser: {
      href: '/negotiators/BED160186',
    },
  },
}

export const appointmentDataStubWithNegotiatorsOfficesProperty: ExtendedAppointmentModel = {
  property: propertyStub,
  offices: [officeStub],
  negotiators: [negotiatorStub],
  ...appointmentDataStub,
}
