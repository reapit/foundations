import { AreaModel } from '../area'

export const area: AreaModel = {
  id: 'BMM',
  created: '2020-02-21T13:12:22.0000000Z',
  modified: '2020-02-21T13:12:22.0000000Z',
  name: 'Birmingham',
  active: true,
  type: 'polygon',
  area: ['51.60009,-0.21789', '51.47025,-0.27282', '51.50445,0.00184'],
  departmentIds: ['G'],
  officeIds: ['OXF', 'SOL'],
  _eTag: '"0C475763A2B7C645ECCCAEC1C2F8CD52"',
  _links: {
    self: {
      href: '/areas/BMM',
    },
    offices: {
      href: '/offices/?id=OXF&id=SOL',
    },
    departments: {
      href: '/departments/?id=G',
    },
  },
  _embedded: null,
}
