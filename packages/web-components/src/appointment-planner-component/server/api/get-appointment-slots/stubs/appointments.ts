// appointemnt stubs
// PagedResultAppointmentModel_

import { PagedResultAppointmentModel_ } from '@reapit/foundations-ts-definitions'

// copy result from
export const appointmentsDataStub: PagedResultAppointmentModel_ = {
  _embedded: [
    {
      id: 'MLK0700882',
      created: '2008-03-27',
      modified: '2008-03-30',
      start: '2008-03-28T11:45:00Z',
      end: '2008-03-28T12:15:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,
      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F005',
        notes: '',
      },
      propertyId: 'MLK070168',
      organiserId: 'ANT',
      negotiatorIds: ['ANT'],
      officeIds: [],
      attendee: {
        id: 'MLK070235',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"303E72E6FA4B9ACBF039C573460E299F"',
      _links: {
        self: {
          href: '/appointments/MLK0700882',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/ANT',
        },
        property: {
          href: '/properties/MLK070168',
        },
        negotiators: {
          href: '/negotiators/?id=ANT',
        },
        attendee: {
          href: '/applicants/MLK0700882',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'MLK0700888',
      created: '2008-04-07',
      modified: '2008-04-21',
      start: '2008-04-12T10:30:00Z',
      end: '2008-04-12T11:00:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: true,
      followUp: {
        due: null,
        responseId: 'F007',
        notes: '',
      },
      propertyId: 'MLK070168',
      organiserId: 'ANT',
      negotiatorIds: ['ANT'],
      officeIds: [],
      attendee: {
        id: 'MLK070589',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"AD6A357F92C176D3A06BEB54CF344878"',
      _links: {
        self: {
          href: '/appointments/MLK0700888',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/ANT',
        },
        property: {
          href: '/properties/MLK070168',
        },
        negotiators: {
          href: '/negotiators/?id=ANT',
        },
        attendee: {
          href: '/applicants/MLK0700888',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'ONE0801016',
      created: '2009-06-05',
      modified: '2009-06-11',
      start: '2009-06-06T13:30:00Z',
      end: '2009-06-06T14:00:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F003',
        notes: '',
      },
      propertyId: 'ONE080159',
      organiserId: 'DJB',
      negotiatorIds: ['DJB'],
      officeIds: [],
      attendee: {
        id: 'ONE080494',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"A3DF3F4BA4A1CBEBA3DDCECACDC5762B"',
      _links: {
        self: {
          href: '/appointments/ONE0801016',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/DJB',
        },
        property: {
          href: '/properties/ONE080159',
        },
        negotiators: {
          href: '/negotiators/?id=DJB',
        },
        attendee: {
          href: '/applicants/ONE0801016',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900330',
      created: '2009-11-29',
      modified: '2009-12-17',
      start: '2009-11-30T16:00:00Z',
      end: '2009-11-30T16:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,
      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F002',
        notes: '',
      },
      propertyId: 'NTN090004',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"2B5446BD15B1DAD346728D1C2518A759"',
      _links: {
        self: {
          href: '/appointments/NTN0900330',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN090004',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900332',
      created: '2009-11-29',
      modified: '2009-12-17',
      start: '2009-11-30T16:00:00Z',
      end: '2009-11-30T16:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F003',
        notes: '',
      },
      propertyId: 'NTN090004',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"A70AB771737870B30ED5EA04931C331D"',
      _links: {
        self: {
          href: '/appointments/NTN0900332',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN090004',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900417',
      created: '2009-11-29',
      modified: '2009-11-30',
      start: '2009-12-01T14:00:00Z',
      end: '2009-12-01T14:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: true,
      followUp: {
        due: null,
        responseId: 'F007',
        notes: '',
      },
      propertyId: 'NTN060004',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"86E575AC9590524BC6D24950538744AF"',
      _links: {
        self: {
          href: '/appointments/NTN0900417',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN060004',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900434',
      created: '2009-11-29',
      modified: '2009-11-30',
      start: '2009-12-01T14:00:00Z',
      end: '2009-12-01T14:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: true,
      followUp: {
        due: null,
        responseId: 'F007',
        notes: '',
      },
      propertyId: 'NTN060004',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"B0678CA0979325264DF8CC69778ED2E2"',
      _links: {
        self: {
          href: '/appointments/NTN0900434',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN060004',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0902436',
      created: '2009-12-02T10:00:00Z',
      modified: null,
      start: '2009-12-02T10:00:00Z',
      end: '2009-12-02T10:30:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'NPG090022',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"A0D5DA15D030490C432D371153FA0EE5"',
      _links: {
        self: {
          href: '/appointments/NPG0902436',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NPG090022',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900331',
      created: '2009-11-30',
      modified: '2009-12-17',
      start: '2009-12-02T14:30:00Z',
      end: '2009-12-02T15:00:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F003',
        notes: '',
      },
      propertyId: 'NTN090004',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"07E1D4C7EEE7922E83BBCCECAD71CBAF"',
      _links: {
        self: {
          href: '/appointments/NTN0900331',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN090004',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900333',
      created: '2009-11-30',
      modified: '2009-12-17',
      start: '2009-12-02T14:30:00Z',
      end: '2009-12-02T15:00:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F002',
        notes: '',
      },
      propertyId: 'NTN090004',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"978746973D908823047B60E85E88CD50"',
      _links: {
        self: {
          href: '/appointments/NTN0900333',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN090004',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NGL0904024',
      created: '2009-12-06T12:00:00Z',
      modified: null,
      start: '2009-12-06T12:00:00Z',
      end: '2009-12-06T12:30:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'NGL090011',
      organiserId: 'KLB',
      negotiatorIds: ['KLB'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"BED88CFBE853AB5360E2C301E635EEDB"',
      _links: {
        self: {
          href: '/appointments/NGL0904024',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/KLB',
        },
        property: {
          href: '/properties/NGL090011',
        },
        negotiators: {
          href: '/negotiators/?id=KLB',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'STL0901132',
      created: '2009-12-07T13:30:00Z',
      modified: null,
      start: '2009-12-07T13:30:00Z',
      end: '2009-12-07T14:00:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'STL090013',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"6B2688AA1B4407988D8A9D316D487ABF"',
      _links: {
        self: {
          href: '/appointments/STL0901132',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/STL090013',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0901241',
      created: '2009-12-07',
      modified: '2009-12-10',
      start: '2009-12-08T14:00:00Z',
      end: '2009-12-08T14:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F003',
        notes: '',
      },
      propertyId: 'NPG040068',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"E24B65B22558D37DEDF1B570E15FD8D0"',
      _links: {
        self: {
          href: '/appointments/NPG0901241',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NPG040068',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0901253',
      created: '2009-12-07',
      modified: '2009-12-10',
      start: '2009-12-08T14:00:00Z',
      end: '2009-12-08T14:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F004',
        notes: '',
      },
      propertyId: 'NPG040068',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: {
        id: 'NPG090669',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"77963E4BEC03D7CE81B0A38E98401800"',
      _links: {
        self: {
          href: '/appointments/NPG0901253',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NPG040068',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
        attendee: {
          href: '/applicants/NPG0901253',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0901237',
      created: '2009-12-21',
      modified: '2010-01-06',
      start: '2009-12-24T10:00:00Z',
      end: '2009-12-24T10:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: true,
      followUp: {
        due: null,
        responseId: 'F007',
        notes: '',
      },
      propertyId: 'NPG040068',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: {
        id: 'NPG090019',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"FAC3491518C5268EE2686879560FD8A7"',
      _links: {
        self: {
          href: '/appointments/NPG0901237',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NPG040068',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
        attendee: {
          href: '/applicants/NPG0901237',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0901244',
      created: '2009-12-21',
      modified: '2010-01-06',
      start: '2009-12-24T10:00:00Z',
      end: '2009-12-24T10:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: true,
      followUp: {
        due: null,
        responseId: 'F007',
        notes: '',
      },
      propertyId: 'NPG040068',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"3FA5028EB714BC011CDC9F73789B74AD"',
      _links: {
        self: {
          href: '/appointments/NPG0901244',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NPG040068',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0900905',
      created: '2009-12-24',
      modified: '2009-12-29',
      start: '2009-12-25T14:30:00Z',
      end: '2009-12-25T15:00:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F004',
        notes: '',
      },
      propertyId: 'NPG060298',
      organiserId: 'ANT',
      negotiatorIds: ['ANT'],
      officeIds: [],
      attendee: {
        id: 'NPG090080',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"87317BA3178B81C78468A309D164AAB3"',
      _links: {
        self: {
          href: '/appointments/NPG0900905',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/ANT',
        },
        property: {
          href: '/properties/NPG060298',
        },
        negotiators: {
          href: '/negotiators/?id=ANT',
        },
        attendee: {
          href: '/applicants/NPG0900905',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0900129',
      created: '2009-12-24',
      modified: '2009-12-28',
      start: '2009-12-30T17:30:00Z',
      end: '2009-12-30T18:00:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: true,
      followUp: {
        due: null,
        responseId: 'F007',
        notes: '',
      },
      propertyId: 'NPG050008',
      organiserId: 'ANT',
      negotiatorIds: ['ANT'],
      officeIds: [],
      attendee: {
        id: 'NPG090771',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: false,
      attendeeConfirmed: true,
      propertyConfirmed: false,
      _eTag: '"0C6E0BD1B336E81522C2A26B0DE33134"',
      _links: {
        self: {
          href: '/appointments/NPG0900129',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/ANT',
        },
        property: {
          href: '/properties/NPG050008',
        },
        negotiators: {
          href: '/negotiators/?id=ANT',
        },
        attendee: {
          href: '/applicants/NPG0900129',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0901255',
      created: '2009-12-29',
      modified: '2010-01-04',
      start: '2010-01-01T14:00:00Z',
      end: '2010-01-01T14:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F006',
        notes: '',
      },
      propertyId: 'NPG040068',
      organiserId: 'ANT',
      negotiatorIds: ['ANT'],
      officeIds: [],
      attendee: {
        id: 'NPG090973',
        type: 'applicant',
        contacts: [],
      },
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"D63F3FFF62CC2918DCBAA738316982B1"',
      _links: {
        self: {
          href: '/appointments/NPG0901255',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/ANT',
        },
        property: {
          href: '/properties/NPG040068',
        },
        negotiators: {
          href: '/negotiators/?id=ANT',
        },
        attendee: {
          href: '/applicants/NPG0901255',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0901509',
      created: '2010-01-12T11:00:00Z',
      modified: null,
      start: '2010-01-12T11:00:00Z',
      end: '2010-01-12T11:30:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'NTN090012',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"0831FB5D5A623F53AE8ED8F1A0973B74"',
      _links: {
        self: {
          href: '/appointments/NTN0901509',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN090012',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NPG0902939',
      created: '2010-01-14T10:30:00Z',
      modified: null,
      start: '2010-01-14T10:30:00Z',
      end: '2010-01-14T11:00:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'NPG090036',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"865058A8F075F6D7DBB8CF03D2CD75EC"',
      _links: {
        self: {
          href: '/appointments/NPG0902939',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NPG090036',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'STL0901901',
      created: '2010-01-26T10:00:00Z',
      modified: null,
      start: '2010-01-26T10:00:00Z',
      end: '2010-01-26T10:30:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'STL090050',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"53B3AECD830D6DCD6BBF0E28328DCEC7"',
      _links: {
        self: {
          href: '/appointments/STL0901901',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/STL090050',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'ONL0901254',
      created: '2010-01-31T11:00:00Z',
      modified: null,
      start: '2010-01-31T11:00:00Z',
      end: '2010-01-31T11:30:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'ONL090006',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"8AB2CB610C48A3502794ECDB047FEAF3"',
      _links: {
        self: {
          href: '/appointments/ONL0901254',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/ONL090006',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'ONL0901286',
      created: '2010-01-31T12:30:00Z',
      modified: null,
      start: '2010-01-31T12:30:00Z',
      end: '2010-01-31T13:00:00Z',
      typeId: 'VL',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: '',
        notes: '',
      },
      propertyId: 'ONL090007',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"D1F432C24F25EA09A89D33C9B2CEB0EE"',
      _links: {
        self: {
          href: '/appointments/ONL0901286',
        },
        type: {
          href: '/configuration/appointmentTypes/VL',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/ONL090007',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'NTN0900501',
      created: '2010-02-08',
      modified: '2010-02-08',
      start: '2010-02-05T10:00:00Z',
      end: '2010-02-05T10:30:00Z',
      typeId: 'VW',
      description: '',
      recurring: false,

      cancelled: false,
      followUp: {
        due: null,
        responseId: 'F004',
        notes: '',
      },
      propertyId: 'NTN090012',
      organiserId: 'JDA',
      negotiatorIds: ['JDA'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _eTag: '"5CF64D224BFC9D598BBDD8AA15A23EC3"',
      _links: {
        self: {
          href: '/appointments/NTN0900501',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JDA',
        },
        property: {
          href: '/properties/NTN090012',
        },
        negotiators: {
          href: '/negotiators/?id=JDA',
        },
      },
      _embedded: null,
      metadata: {},
    },
  ],
  pageNumber: 1,
  pageSize: 25,
  pageCount: 25,
  totalPageCount: 301,
  totalCount: 7502,
  _links: {
    self: {
      href: '/appointments/?PageNumber=1&PageSize=25',
    },
    first: {
      href: '/appointments/?PageNumber=1&PageSize=25',
    },
    next: {
      href: '/appointments/?PageNumber=2&PageSize=25',
    },
    last: {
      href: '/appointments/?PageNumber=301&PageSize=25',
    },
  },
}
