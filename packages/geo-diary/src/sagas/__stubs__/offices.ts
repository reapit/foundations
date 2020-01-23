import { OfficeModel } from '@reapit/foundations-ts-definitions'

export const officeStub: OfficeModel = {
  id: 'string',
  created: '2020-01-21T19:33:51.422Z',
  modified: '2020-01-21T19:33:51.422Z',
  name: 'string',
  manager: 'string',
  address: {
    type: 'string',
    buildingName: 'string',
    buildingNumber: 'string',
    line1: 'string',
    line2: 'string',
    line3: 'string',
    line4: 'string',
    postcode: 'string',
    countryId: 'string'
  },
  workPhone: 'string',
  email: 'string',
  metadata: {
    additionalProp1: {},
    additionalProp2: {},
    additionalProp3: {}
  }
}
