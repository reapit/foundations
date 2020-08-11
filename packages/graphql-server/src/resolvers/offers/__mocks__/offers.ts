import { PagedResultOfferModel_ } from '../../../types'
import { offersWithId } from './offer'

export const offersMock: PagedResultOfferModel_ = {
  _embedded: [offersWithId(1), offersWithId(2), offersWithId(3), offersWithId(4), offersWithId(5)],
  pageNumber: 1,
  pageSize: 5,
  pageCount: 5,
  totalCount: 32,
  _links: {
    self: {
      href: '/offers/?PageNumber=1&PageSize=5&End=2020-03-06&Start=2020-02-08',
    },
    first: {
      href: '/offers/?PageNumber=1&PageSize=5&End=2020-03-06&Start=2020-02-08',
    },
    next: {
      href: '/offers/?PageNumber=2&PageSize=5&End=2020-03-06&Start=2020-02-08',
    },
    last: {
      href: '/offers/?PageNumber=7&PageSize=5&End=2020-03-06&Start=2020-02-08',
    },
  },
}
