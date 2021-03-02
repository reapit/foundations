import { JournalEntryModelPagedResult } from '@reapit/foundations-ts-definitions'

export const journalEntriesMock: JournalEntryModelPagedResult = {
  _embedded: [
    {
      created: '2020-08-18T06:57:08.0000000Z',
      propertyId: 'OXF190022',
      associatedType: 'applicant',
      associatedId: 'OXF190001',
      typeId: 'MI',
      negotiatorId: '',
      description: 'Mr John Smith contacted us via live chat regarding 62 Test Road',
      _links: {
        property: {
          href: '/properties/OXF190022',
        },
        type: {
          href: '/configuration/journalEntryTypes/MI',
        },
      },
      _embedded: null,
    },
    {
      created: '2020-08-17T08:53:54.0000000Z',
      propertyId: 'HEO155576',
      associatedType: '',
      associatedId: '',
      typeId: 'ON',
      negotiatorId: 'ADV',
      description: 'ddddd',
      _links: {
        negotiator: {
          href: '/negotiators/ADV',
        },
        property: {
          href: '/properties/HEO155576',
        },
        type: {
          href: '/configuration/journalEntryTypes/ON',
        },
      },
      _embedded: null,
    },
  ],
}
