import { AreaModel } from '../../../types'

export const areaMock: AreaModel = {
  id: 'BHM',
  created: '2020-02-24T06:59:43.0000000Z',
  modified: '2020-03-03T09:24:59.0000000Z',
  name: 'Birmingham',
  active: true,
  type: 'polygon',
  area: ['51.60009,-0.21788', '51.47025,-0.27282', '51.50445,0.00184'],
  departmentIds: ['G'],
  officeIds: ['OXF', 'SOL'],
  _eTag: '"909A2F6137DC77F82CB6AD6BAF76DE11"',
  _links: {
    self: {
      href: '/areas/BHM',
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
