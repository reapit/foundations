import { CreateCompanyArgs } from '../companies'

export const createCompanyArgsMock: CreateCompanyArgs = {
  name: 'Reapit',
  branch: 'Oxford',
  notes:
    'Founded in 1997, The Reapit Group is a property software provider of CRM and property management solutions specialising in the residential real estate sector',
  active: true,
  vatRegistered: true,
  typeIds: ['SP'],
  supplierTypeId: 'MG',
  workPhone: '01234 567890',
  mobilePhone: '07890 123456',
  email: 'example@email.com',
  address: {
    type: null,
    buildingName: '',
    buildingNumber: '15',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: '',
    postcode: 'B91 2XX',
    countryId: 'GB',
  },
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
}
