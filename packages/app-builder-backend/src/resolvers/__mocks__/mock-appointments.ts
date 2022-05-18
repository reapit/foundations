export const mockAppointments = {
  _embedded: [
    {
      id: 'MKT2200002',
      typeId: 'VW',
      created: '2022-01-13T13:39:01Z',
      modified: '2022-01-13T13:39:01Z',
      start: '2022-01-13T14:00:00Z',
      end: '2022-01-13T14:30:00Z',
      description: '',
      cancelled: false,
      recurring: false,
      property: {
        id: 'MKT210001',
        type: [],
      },
      followUp: {
        due: '2022-01-14',
        notes: '',
        responseId: '',
      },
      propertyConfirmed: false,
      negotiatorConfirmed: false,
      attendeeConfirmed: false,
      attendee: null,
      negotiators: [
        {
          id: 'ADV',
          name: 'App Developer',
        },
      ],
      offices: [
        {
          id: 'MKT',
          name: 'Marketplace 1',
        },
      ],
    },
    {
      id: 'MKT2200003',
      typeId: 'VW',
      created: '2022-01-21T09:04:47Z',
      modified: '2022-01-21T09:04:47Z',
      start: '2022-01-21T10:00:00Z',
      end: '2022-01-21T11:00:00Z',
      description: '',
      cancelled: false,
      recurring: false,
      property: {
        id: 'NGL140061',
        type: ['house'],
      },
      followUp: {
        due: '2022-01-22',
        notes: '',
        responseId: '',
      },
      propertyConfirmed: false,
      negotiatorConfirmed: false,
      attendeeConfirmed: false,
      attendee: null,
      negotiators: [
        {
          id: 'ADV',
          name: 'App Developer',
        },
      ],
      offices: [
        {
          id: 'MKT',
          name: 'Marketplace 1',
        },
      ],
    },
  ],
}
