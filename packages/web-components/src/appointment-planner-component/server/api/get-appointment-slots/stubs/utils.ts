import { FindAppointmentsBetweenParams, FindAvailableNegotiatorIdParams } from '../utils'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export const findAvailableNegotiatorIdParams = {
  caseFirstFreeSecondBusy: {
    output: 'ASDS',
    input: {
      negotiatorIds: ['ASDS', 'SSSS'],
      appointments: [
        {
          id: 'RPT2000077',
          created: '2020-09-03T03:34:50Z',
          modified: '2020-09-03T03:34:50Z',
          start: '2021-02-01T08:00:00Z',
          end: '2021-02-01T09:00:00Z',
          typeId: 'VW',
          description: 'Meet landlord at the property to get the key.',
          recurring: false,
          recurrence: null,
          cancelled: false,
          followUp: {
            due: '2021-10-05',
            responseId: '',
            notes: null,
          },
          propertyId: 'MLK070168',
          organiserId: 'JAS',
          negotiatorIds: ['SSSS'],
          officeIds: [],
          attendee: null,
          accompanied: true,
          negotiatorConfirmed: true,
          attendeeConfirmed: true,
          propertyConfirmed: true,
          _eTag: '"EBF8741293739FD5905BCA2FCC41DBEE"',
          _links: {
            self: {
              href: '/appointments/RPT2000077',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
            organiser: {
              href: '/negotiators/JAS',
            },
            property: {
              href: '/properties/MLK070168',
            },
            negotiators: {
              href: '/negotiators/?id=SSSS',
            },
          },
          _embedded: null,
          metadata: {},
        },
      ],
      dateTimeEnd: '2021-02-01T12:00:00.000Z',
      dateTimeStart: '2021-02-01T08:00:00.000Z',
    },
  },
  caseFirstBusySecondFree: {
    output: 'SSSS',
    input: {
      negotiatorIds: ['ASDS', 'SSSS'],
      appointments: [
        {
          id: 'RPT2000075',
          created: '2020-09-03T03:21:34Z',
          modified: '2020-09-03T03:21:34Z',
          start: '2021-01-31T16:00:00Z',
          end: '2021-01-31T17:00:00Z',
          typeId: 'VW',
          description: 'Meet landlord at the property to get the key.',
          recurring: false,
          recurrence: null,
          cancelled: false,
          followUp: {
            due: '2022-10-05',
            responseId: '',
            notes: null,
          },
          propertyId: 'MLK070168',
          organiserId: 'ANT',
          negotiatorIds: ['ASDS'],
          officeIds: [],
          attendee: null,
          accompanied: true,
          negotiatorConfirmed: true,
          attendeeConfirmed: true,
          propertyConfirmed: true,
          _eTag: '"D9A910FB7D7D148FF64B6E9CA5E031C4"',
          _links: {
            self: {
              href: '/appointments/RPT2000075',
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
              href: '/negotiators/?id=ASDS',
            },
          },
          _embedded: null,
          metadata: {},
        },
      ],
      dateTimeEnd: new Date('2021-01-31T20:00:00.000Z'),
      dateTimeStart: new Date('2021-01-31T16:00:00.000Z'),
    },
  },
  caseBothAreBusy: {
    output: undefined,
    input: {
      negotiatorIds: ['ASDS', 'SSSS'],
      appointments: [
        {
          id: 'RPT2000073',
          created: '2020-09-03T03:20:23Z',
          modified: '2020-09-03T03:20:23Z',
          start: '2021-01-31T08:00:00Z',
          end: '2021-01-31T09:00:00Z',
          typeId: 'VW',
          description: 'Meet landlord at the property to get the key.',
          recurring: false,

          cancelled: false,
          followUp: {
            due: '2022-10-05',
            responseId: '',
            notes: null,
          },
          propertyId: 'MLK070168',
          organiserId: 'ANT',
          negotiatorIds: ['ASDS'],
          officeIds: [],
          attendee: null,
          accompanied: true,
          negotiatorConfirmed: true,
          attendeeConfirmed: true,
          propertyConfirmed: true,
          _eTag: '"25A3498606C9E8FA1DE0C54A2BE6CA22"',
          _links: {
            self: {
              href: '/appointments/RPT2000073',
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
              href: '/negotiators/?id=ASDS',
            },
          },
          _embedded: null,
          metadata: {},
        },
        {
          id: 'RPT2000074',
          created: '2020-09-03T03:20:47Z',
          modified: '2020-09-03T03:20:47Z',
          start: '2021-01-31T08:00:00Z',
          end: '2021-01-31T09:00:00Z',
          typeId: 'VW',
          description: 'Meet landlord at the property to get the key.',
          recurring: false,

          cancelled: false,
          followUp: {
            due: '2022-10-05',
            responseId: '',
            notes: null,
          },
          propertyId: 'MLK070168',
          organiserId: 'ANT',
          negotiatorIds: ['SSSS'],
          officeIds: [],
          attendee: null,
          accompanied: true,
          negotiatorConfirmed: true,
          attendeeConfirmed: true,
          propertyConfirmed: true,
          _eTag: '"80521A92579BFB3BCC09420342357F51"',
          _links: {
            self: {
              href: '/appointments/RPT2000074',
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
              href: '/negotiators/?id=SSSS',
            },
          },
          _embedded: null,
          metadata: {},
        },
      ],
      dateTimeEnd: new Date('2021-01-31T12:00:00.000Z'),
      dateTimeStart: new Date('2021-01-31T08:00:00.000Z'),
    },
  },
}

export const findAppointmentsBetweenParamsOutput: AppointmentModel[] = [
  {
    id: 'RPT2000075',
    created: '2020-09-03T03:21:34Z',
    modified: '2020-09-03T03:21:34Z',
    start: '2021-01-31T16:00:00Z',
    end: '2021-01-31T17:00:00Z',
    typeId: 'VW',
    description: 'Meet landlord at the property to get the key.',
    recurring: false,

    cancelled: false,
    followUp: {
      due: '2022-10-05',
      responseId: '',
      notes: null,
    },
    propertyId: 'MLK070168',
    organiserId: 'ANT',
    negotiatorIds: ['ASDS'],
    officeIds: [],
    attendee: null,
    accompanied: true,
    negotiatorConfirmed: true,
    attendeeConfirmed: true,
    propertyConfirmed: true,
    _links: {
      self: {
        href: '/appointments/RPT2000075',
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
        href: '/negotiators/?id=ASDS',
      },
    },
    _embedded: null,
    metadata: {},
  },
]

export const findAppointmentsBetweenParams: FindAppointmentsBetweenParams = {
  appointments: [
    {
      id: 'RPT2000073',
      created: '2020-09-03T03:20:23Z',
      modified: '2020-09-03T03:20:23Z',
      start: '2021-01-31T08:00:00Z',
      end: '2021-01-31T09:00:00Z',
      typeId: 'VW',
      description: 'Meet landlord at the property to get the key.',
      recurring: false,
      cancelled: false,
      followUp: {
        due: '2022-10-05',
        responseId: '',
        notes: null,
      },
      propertyId: 'MLK070168',
      organiserId: 'ANT',
      negotiatorIds: ['ASDS'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _links: {
        self: {
          href: '/appointments/RPT2000073',
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
          href: '/negotiators/?id=ASDS',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'RPT2000074',
      created: '2020-09-03T03:20:47Z',
      modified: '2020-09-03T03:20:47Z',
      start: '2021-01-31T08:00:00Z',
      end: '2021-01-31T09:00:00Z',
      typeId: 'VW',
      description: 'Meet landlord at the property to get the key.',
      recurring: false,

      cancelled: false,
      followUp: {
        due: '2022-10-05',
        responseId: '',
        notes: null,
      },
      propertyId: 'MLK070168',
      organiserId: 'ANT',
      negotiatorIds: ['SSSS'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _links: {
        self: {
          href: '/appointments/RPT2000074',
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
          href: '/negotiators/?id=SSSS',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'RPT2000075',
      created: '2020-09-03T03:21:34Z',
      modified: '2020-09-03T03:21:34Z',
      start: '2021-01-31T16:00:00Z',
      end: '2021-01-31T17:00:00Z',
      typeId: 'VW',
      description: 'Meet landlord at the property to get the key.',
      recurring: false,

      cancelled: false,
      followUp: {
        due: '2022-10-05',
        responseId: '',
        notes: null,
      },
      propertyId: 'MLK070168',
      organiserId: 'ANT',
      negotiatorIds: ['ASDS'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _links: {
        self: {
          href: '/appointments/RPT2000075',
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
          href: '/negotiators/?id=ASDS',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'RPT2000076',
      created: '2020-09-03T03:22:28Z',
      modified: '2020-09-03T03:22:28Z',
      start: '2021-02-01T08:00:00Z',
      end: '2021-02-01T09:00:00Z',
      typeId: 'VW',
      description: 'Meet landlord at the property to get the key.',
      recurring: false,

      cancelled: false,
      followUp: {
        due: '2022-10-05',
        responseId: '',
        notes: null,
      },
      propertyId: 'MLK070168',
      organiserId: 'ANT',
      negotiatorIds: ['SSSS'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _links: {
        self: {
          href: '/appointments/RPT2000076',
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
          href: '/negotiators/?id=SSSS',
        },
      },
      _embedded: null,
      metadata: {},
    },
    {
      id: 'RPT2000077',
      created: '2020-09-03T03:34:50Z',
      modified: '2020-09-03T03:34:50Z',
      start: '2021-02-01T08:00:00Z',
      end: '2021-02-01T09:00:00Z',
      typeId: 'VW',
      description: 'Meet landlord at the property to get the key.',
      recurring: false,

      cancelled: false,
      followUp: {
        due: '2021-10-05',
        responseId: '',
        notes: null,
      },
      propertyId: 'MLK070168',
      organiserId: 'JAS',
      negotiatorIds: ['SSSS'],
      officeIds: [],
      attendee: null,
      accompanied: true,
      negotiatorConfirmed: true,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      _links: {
        self: {
          href: '/appointments/RPT2000077',
        },
        type: {
          href: '/configuration/appointmentTypes/VW',
        },
        organiser: {
          href: '/negotiators/JAS',
        },
        property: {
          href: '/properties/MLK070168',
        },
        negotiators: {
          href: '/negotiators/?id=SSSS',
        },
      },
      _embedded: null,
      metadata: {},
    },
  ],
  dateTimeStart: new Date('2021-01-31T16:00:00.000Z'),
  dateTimeEnd: new Date('2021-01-31T20:00:00.000Z'),
}
