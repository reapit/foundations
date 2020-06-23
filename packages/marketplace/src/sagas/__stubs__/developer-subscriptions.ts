import { SubscriptionModel, PagedResultSubscriptionModel_ } from '@reapit/foundations-ts-definitions'

export const subscriptionModelStub: SubscriptionModel = {
  id: '123',
  created: '',
  cancelled: 'cancelled',
  renews: 'reviews',
  developerId: '123',
  applicationId: '123',
  user: 'tester@reapit.com',
  type: 'developerEdition',
  summary: 'summary',
  cost: 123,
  frequency: '1',
}

export const listSubscriptionsStub: PagedResultSubscriptionModel_ = {
  data: [subscriptionModelStub],
  pageCount: 1,
  pageNumber: 1,
  pageSize: 12,
  totalCount: 12,
}
