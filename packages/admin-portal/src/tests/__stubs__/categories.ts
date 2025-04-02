import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockCategoryModelPagedResult: Marketplace.CategoryModelPagedResult = {
  data: [
    {
      id: 'string',
      name: 'string',
      description: 'string',
    },
    {
      id: '9',
      name: 'Tools',
      description: 'General purpose tools',
    },
    {
      id: '8',
      name: 'Social',
      description: 'Social media and collaborative',
    },
    {
      id: '7',
      name: 'Marketing',
      description: 'Marketing and advertisement',
    },
    {
      id: '6',
      name: 'Communication',
      description: 'Messaging and communication',
    },
    {
      id: '5',
      name: 'Media',
      description: 'Pictures and video',
    },
    {
      id: '4',
      name: 'Events',
      description: 'Events and scheduling',
    },
    {
      id: '3',
      name: 'Finance',
      description: 'Finance apps',
    },
    {
      id: '2',
      name: 'Productivity',
      description: 'Productivity aids',
    },
    {
      id: '1',
      name: 'Other',
      description: 'Everything else',
    },
  ],
  pageNumber: 1,
  pageSize: 50,
  pageCount: 10,
  totalCount: 10,
}
