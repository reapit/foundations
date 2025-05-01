import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockSubscriptionModelPagedResult: Marketplace.SubscriptionModelPagedResult = {
  data: [
    {
      id: 'acd6c925-325f-40a2-b561-fc3670c914ef',
      created: '2022-09-26T11:40:27',
      renews: '2023-09-26',
      developerId: '421b65bc-dd09-4c34-90fa-dacc3cd2ff5a',
      organisationName: 'Reapit Ltd Internal',
      customerId: '',
      applicationId: 'f83e679e-a7cd-4889-a7f9-f4a8a8ed5a09',
      user: 'willmcvay@me.com',
      type: 'applicationListing',
      summary: 'Application listing for Reapit Insights',
      cost: 595.0,
      frequency: 'annually',
    },
    {
      id: 'acd6c925-325f-40a2-b561-fc3670c914ef',
      created: '2022-09-26T11:40:27',
      renews: '2023-09-26',
      developerId: '421b65bc-dd09-4c34-90fa-dacc3cd2ff5a',
      organisationName: 'Reapit Ltd Internal',
      customerId: '',
      applicationId: 'f83e679e-a7cd-4889-a7f9-f4a8a8ed5a09',
      user: 'willmcvay@me.com',
      type: 'developerRegistration',
      summary: 'Application listing for Reapit Insights',
      cost: 595.0,
      frequency: 'annually',
    },
  ],
  pageNumber: 1,
  pageSize: 999,
  pageCount: 1,
  totalCount: 2,
}
