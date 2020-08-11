import { OfferModel } from '../../../types'

export const offerMock: OfferModel = {
  id: 'BCK1600026',
  created: '2016-11-15T10:54:35.0000000Z',
  modified: '2020-03-06T05:54:14.0000000Z',
  currency: 'GPD',
  applicantId: 'applicantId',
  propertyId: 'propertyId',
  negotiatorId: 'negotiatorId',
  date: '2016-11-15T10:54:35.0000000Z',
  amount: 200,
  status: 'withdrawn',
  inclusions: 'PAE',
  exclusions: 'PAE',
  conditions: 'conditions',
  metadata: {},
  _eTag: '"1ECC96DDBB42001F7220E84DF435A89D"',
  _links: {
    self: {
      href: '/Offers/BCK1600026',
    },
    type: {
      href: '/configuration/OfferTypes/MI',
    },
    organiser: {
      href: '/negotiators/PAE',
    },
    property: {
      href: '/properties/RPT200002',
    },
    negotiators: {
      href: '/negotiators/?id=PAE',
    },
  },
  _embedded: null,
}

export const offersWithId = id => {
  return { ...offerMock, id }
}
