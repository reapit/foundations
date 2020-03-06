import { CreateOfficeArgs } from '../offices'

export const createOfficeArgsMock: CreateOfficeArgs = {
  name: 'Reapit',
  manager: 'Mr John Smith',
  address: {
    buildingName: '',
    buildingNumber: '15',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: '',
    postcode: 'B91 2XX',
    countryId: 'GB',
  },
  workPhone: '01234 567890',
  email: 'example@email.com',
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
}
