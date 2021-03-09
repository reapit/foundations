export default {
  id: '09853406-d838-469c-8f9f-92a92793e53f',
  published: '2021-03-09T10:38:24.7449133+00:00',
  summary: 'Summary of the event',
  type: 'testEventType',
  actor: {
    id: 'XX',
    type: 'source',
    name: 'Zoopla',
    email: '',
    mobilePhone: '',
    address: {
      buildingName: '',
      buildingNumber: '',
      line1: '',
      line2: '',
      line3: '',
      line4: '',
      postcode: '',
      countryId: '',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
    },
  },
  object: {
    id: 'FakeEnquiryId',
    type: 'enquiry',
    name: 'Will McVay',
    email: 'willmcvay@pm.me',
    mobilePhone: '+447930464427',
    address: {
      buildingName: '',
      buildingNumber: '10',
      line1: 'Static street',
      line2: 'Solihull',
      line3: 'West Midlands',
      line4: '',
      postcode: 'B91 3DA',
      countryId: 'GB',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
    },
  },
  _links: {
    self: {
      href: '/events/09853406-d838-469c-8f9f-92a92793e53f',
    },
    actor: {
      href: '/sources/XX',
    },
    object: {
      href: '/enquiries/FakeEnquiryId',
    },
  },
  _embedded: null,
}
