import { ReferralTypeModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockReferralTypes: ReferralTypeModelPagedResult = {
  _embedded: [
    {
      id: 'JTS',
      name: 'Testimonial',
    },
    {
      id: 'JRV',
      name: 'Removals',
    },
  ],
  pageNumber: 1,
  pageSize: 100,
  pageCount: 2,
  totalPageCount: 1,
  totalCount: 2,
}
