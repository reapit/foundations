import { MonthlyBilling } from '@/reducers/developer'

export const monthlyBillingData: MonthlyBilling = {
  period: '2020-05',
  requestsByService: [
    {
      cost: 0.05,
      endpointCount: 1,
      requestCount: 4,
      requestsByEndpoint: [
        {
          cost: 0.05,
          endpoint: 2,
          requestCount: 4,
        },
      ],
      serviceName: 'offices',
    },
  ],
  totalCost: 0.05,
  totalEndpoints: 1,
  totalRequests: 4,
}

export const tableData = [
  {
    cost: 0.05,
    endpointCount: 1,
    requestCount: 4,
    subRows: [
      {
        cost: 0.05,
        serviceName: 2,
        requestCount: 4,
      },
    ],
    serviceName: 'offices',
  },
]
