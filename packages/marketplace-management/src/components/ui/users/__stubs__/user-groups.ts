import { GroupModelPagedResult } from '../../../../types/organisations-schema'

export const data: GroupModelPagedResult = {
  _embedded: [
    {
      id: 'string',
      modified: '2019-08-14T12:30:02.0000000Z',
      created: '2019-08-14T12:30:02.0000000Z',
      description: 'string',
    },
  ],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalPageCount: 0,
  totalCount: 0,
  _links: {
    additionalProp1: {
      href: 'string',
    },
    additionalProp2: {
      href: 'string',
    },
    additionalProp3: {
      href: 'string',
    },
  },
}

export const listUserGroup = [
  {
    id: 'id1',
    description: 'description 1',
  },
  {
    id: 'id2',
    description: 'description 2',
  },
  {
    id: 'id3',
    description: 'description 3',
  },
  {
    id: 'id4',
    description: 'description 4',
  },
]

export const listUserGroupMember = [
  {
    id: 'id1',
    description: 'description 1',
  },
  {
    id: 'id3',
    description: 'description 2',
  },
]
