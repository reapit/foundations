import {
  BillingBreakdownForMonthV2Model,
  BillingOverviewForPeriodV2Model,
  ServiceItemBillingV2Model,
} from '@reapit/foundations-ts-definitions'

export const mockMonthlyBillingData: BillingBreakdownForMonthV2Model = {
  period: '2020-06',
  services: [
    {
      cost: 7.975,
      itemCount: 7,
      amount: 638,
      items: [
        {
          name: 'contacts',
          amount: 157,
          cost: 1.9625,
          itemCount: 2,
          items: [
            {
              cost: 7.975,
              itemCount: 7,
              amount: 638,
              items: [
                {
                  name: 'contacts',
                  amount: 157,
                  cost: 1.9625,
                  itemCount: 2,
                },
              ],
              name: 'contacts',
            },
          ],
        },
      ],
      name: 'API Requests',
    },
    {
      cost: 7.975,
      itemCount: 7,
      amount: 638,
      items: [{ name: 'DW Usage', amount: 157, cost: 1.9625, itemCount: 2 }],
      name: 'Data Warehouse',
    },
  ] as ServiceItemBillingV2Model[],
  totalCost: 1000,
}

export const mockBillingOverviewData: BillingOverviewForPeriodV2Model = {
  from: '2022-03',
  to: '2022-4',
  periods: [
    {
      period: '2022-03',
      periodStart: '2022-04-01',
      periodEnd: '2022-04-31',
      periodName: 'March 2022',
      cost: 0.3,
      services: [
        {
          name: 'API Requests',
          cost: 0.3,
        },
      ],
    },
    {
      period: '2022-04',
      periodStart: '2022-05-01',
      periodEnd: '2022-05-30',
      periodName: 'April 2022',
      cost: 0.594,
      services: [
        {
          name: 'API Requests',
          cost: 0.594,
        },
      ],
    },
  ],
}
