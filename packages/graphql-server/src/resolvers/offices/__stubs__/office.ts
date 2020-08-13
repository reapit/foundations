import { OfficeModel } from '../../../types'

export const officeMock: OfficeModel = {
  id: 'TCM',
  created: '2020-03-05T09:20:43.0000000Z',
  modified: '2020-03-05T10:01:53.0000000Z',
  name: 'Test create mutation updated',
  manager: 'Reapit',
  address: {
    buildingName: 'Landmark 81',
    buildingNumber: '1',
    line1: 'line1',
    line2: '',
    line3: '',
    line4: '',
    postcode: '',
    countryId: '',
  },
  workPhone: '0987654321',
  email: 'tester@reapit.com',
  metadata: {},
  _eTag: '"84C6AB9009CE154F3CDB9F3362314D4A"',
  _links: {
    self: {
      href: '/offices/TCM',
    },
    negotiators: {
      href: '/negotiators/?officeId=TCM',
    },
  },
  _embedded: null,
}
