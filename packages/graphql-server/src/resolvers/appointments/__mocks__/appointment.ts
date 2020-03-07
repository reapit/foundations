import { AppointmentModel } from '../../../types'

export const appointmentMock: AppointmentModel = {
  id: 'BCK1600026',
  created: '2016-11-15T10:54:35.0000000Z',
  modified: '2020-03-06T05:54:14.0000000Z',
  start: '2016-11-19T07:00:00.0000000Z',
  end: '2016-11-19T07:30:00.0000000Z',
  typeId: 'MI',
  description: '',
  recurring: true,
  cancelled: false,
  followUp: {
    due: null,
    responseId: '',
    notes: '',
  },
  propertyId: 'RPT200002',
  organiserId: 'PAE',
  negotiatorIds: ['PAE'],
  officeIds: [],
  attendee: null,
  accompanied: true,
  negotiatorConfirmed: false,
  attendeeConfirmed: false,
  propertyConfirmed: false,
  metadata: {},
  _eTag: '"1ECC96DDBB42001F7220E84DF435A89D"',
  _links: {
    self: {
      href: '/appointments/BCK1600026',
    },
    type: {
      href: '/configuration/appointmentTypes/MI',
    },
    organiser: {
      href: '/negotiators/PAE',
    },
    property: {
      href: '/properties/RPT200002',
    },
    negotiators: {
      href: '/negotiators/?id=PAE',
    },
  },
  _embedded: null,
}
