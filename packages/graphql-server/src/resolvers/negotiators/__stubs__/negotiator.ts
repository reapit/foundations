import { NegotiatorModel } from '../../../types'

export const negotiatorMock: NegotiatorModel = {
  id: 'HCJK',
  created: '2020-03-06T10:01:43.0000000Z',
  modified: '2020-03-06T10:01:43.0000000Z',
  name: 'hcj67kdr4jfl7bg46gce8o',
  jobTitle: 'Senior Sales Negotiator',
  active: true,
  officeId: 'OXF',
  workPhone: '01234 567890',
  mobilePhone: '07890 123456',
  email: 'example@email.com',
  metadata: {},
  _eTag: '"1BB55D4EE820DDF381996328B6950C13"',
  _links: {
    self: {
      href: '/negotiators/HCJK',
    },
    office: {
      href: '/offices/OXF',
    },
  },
  _embedded: null,
}
