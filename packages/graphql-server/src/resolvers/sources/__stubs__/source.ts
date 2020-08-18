import { SourceModel } from '../../../types'

export const sourceMock: SourceModel = {
  id: 'ADV',
  created: '2018-12-12T12:30:23.0000000Z',
  modified: '2019-01-08T12:30:34.0000000Z',
  name: 'Property Portal',
  type: 'source',
  officeIds: ['OXF'],
  departmentIds: ['G'],
  _eTag: null,
  _links: {
    self: {
      href: '/sources/ADV',
    },
    offices: {
      href: '/offices/?id=OXF',
    },
    departments: {
      href: '/departments/?id=G',
    },
  },
  _embedded: null,
}
