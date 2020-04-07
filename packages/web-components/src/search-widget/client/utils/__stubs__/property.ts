/* eslint-disable */
import { PickedPropertyModel } from '../../../types'

export const propertyStub: PickedPropertyModel = {
  id: 'RPT200112',
  marketingMode: 'sellingAndLetting',
  address: {
    buildingName: '',
    buildingNumber: '15',
    line1: 'Example street',
    line2: 'Solihull',
    line3: 'West Midlands',
    line4: '',
    postcode: 'B91 2XX',
    countryId: 'GB',
    geolocation: { latitude: 52.415859, longitude: 1.777338 },
  },
  description:
    'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
  bedrooms: 4,
  bathrooms: 2,
  selling: {
    instructed: '2018-11-18',
    price: 250000,
    qualifier: 'askingPrice',
    status: 'underOffer',
    completed: '',
    exchanged: '',
    tenure: { type: 'leasehold', expiry: '2019-05-01' },
    vendorId: 'RPT200112',
  },
  letting: {
    instructed: '2018-11-18',
    availableFrom: '2018-12-26',
    availableTo: '2019-03-23',
    rent: 750,
    rentFrequency: 'monthly',
    furnishing: [],
    term: 'long',
    status: 'toLet',
    agentRole: '',
    landlordId: '',
  },
  type: ['house'],
  style: ['detached'],
}
