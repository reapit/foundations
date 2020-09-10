import { PropertyModel } from '@reapit/foundations-ts-definitions'

const mockProperty: PropertyModel = {
  id: 'SOME_ID',
  created: 'SOME_CREATED_DATE',
  modified: 'SOME_MODIFIED_DATE',
  marketingMode: 'sales',
  currency: 'GBP',
  address: {
    line1: '3rd Floor, 67 – 74',
    line2: 'Saffron Hill',
    line3: 'London',
    line4: 'Greater London',
    postcode: 'EC1N 8QX',
  },
  departmentId: 'G',
  negotiatorId: 'SOME_NEGOTIATOR_ID',
  bedrooms: 5,
  receptions: 5,
  bathrooms: 2,
  selling: {
    instructed: 'SOME_INSTRUCTED_DATE',
    price: 100000,
    qualifier: 'SOME_QUALIFIER',
    status: 'forSale',
    tenure: {
      type: 'SOME_TYPE',
      expiry: 'SOME_EXPIRY_DATE',
    },
    vendorId: 'SOME_VENDOR_ID',
  },
  letting: {
    instructed: 'SOME_INSTRUCTED_DATE',
    availableFrom: 'SOME_AVAILABLE_FROM_DATE',
    availableTo: 'SOME_AVAILABLE_TO_DATE',
    rent: 5000,
    rentFrequency: 'monthly',
    term: 'SOME_TERM',
    status: 'toLet',
    landlordId: 'SOME_LANDLORD_ID',
  },
  officeIds: ['RPT'],
}

export default mockProperty
