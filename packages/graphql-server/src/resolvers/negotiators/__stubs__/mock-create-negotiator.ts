import { CreateNegotiatorArgs } from '../negotiators'

export const mockCreateNegotiatorArgs: CreateNegotiatorArgs = {
  name: 'Mr John Smith',
  jobTitle: 'Senior Sales Negotiator',
  active: true,
  officeId: 'OXF',
  workPhone: '01234 567890',
  mobilePhone: '07890 123456',
  email: 'example@email.com',
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
}
