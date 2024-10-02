import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockSubscriptionModelPagedResult: Marketplace.SubscriptionModelPagedResult = {
  data: [
    {
      id: 'MOCK_ID',
      created: '2021-05-16T14:54:56',
      cancelled: '2022-04-07T15:27:29',
      renews: '2022-03-01',
      developerId: 'MOCK_DEV_ID',
      organisationName: 'Reapit Ltd',
      customerId: 'MOCK_CUSTOMER_ID',
      applicationId: 'MOCK_APP_ID',
      user: 'test@example.com',
      type: 'developerEdition',
      summary: 'Developer edition license for test@example.com',
      cost: 300.0,
      frequency: 'monthly',
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 12,
  totalCount: 116,
}
