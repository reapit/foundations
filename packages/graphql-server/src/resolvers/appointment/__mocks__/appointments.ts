import {GetAppointmentsResult} from '../appointments'

export const appointments:GetAppointmentsResult =  {
  _embedded: [
    {
      id: 'OXF180001',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      start: '2018-08-14T12:30:02.0000000Z',
      end: '2018-08-14T13:30:02.0000000Z',
      typeId: 'VW',
      description: 'Meet landlord at the property to get the key.',
      recurring: true,
      cancelled: false,
      followUp: {
        due: '2018-10-05',
        responseId: 'OXF190033',
        notes: 'Meet at the property.',
      },
      propertyId: 'OXF190022',
      organiserId: 'JAS',
      negotiatorIds: ['JAS'],
      officeIds: ['OXF', 'SOL'],
      attendee: {
        id: 'OXF20001',
        type: 'applicant',
        contacts: [
          {
            id: 'OXF19000001',
            name: 'Mr John Smith',
            homePhone: '01234 567890',
            workPhone: '01234 567890',
            mobilePhone: '07890 123456',
            email: 'example@email.com',
          },
        ],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
      _eTag: null,
      _links: {
        self: {
          href: '/appointments/OXF180001',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JAS',
        },
        property: {
          href: '/properties/OXF190022',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        negotiators: {
          href: '/negotiators/?id=JAS',
        },
        attendee: {
          href: '/applicants/OXF180001',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/appointments/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/appointments/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/appointments/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/appointments/?PageNumber=25&PageSize=1',
    },
  },
}
