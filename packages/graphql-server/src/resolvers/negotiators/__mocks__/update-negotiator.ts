import { UpdateNegotiatorArgs } from '../negotiators'

export const updateNegotiatorArgsMock: UpdateNegotiatorArgs = {
  name: 'Mr John Smith',
  jobTitle: 'Senior Sales Negotiator',
  active: true,
  workPhone: '01234 567890',
  mobilePhone: '07890 123456',
  email: 'example@email.com',
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  id: 'HCJK',
  _eTag: '"1BB55D4EE820DDF381996328B6950C13"',
}
