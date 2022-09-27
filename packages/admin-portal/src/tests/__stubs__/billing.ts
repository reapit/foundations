import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'

export const mockBillingBreakdownForMonthV2Model: BillingBreakdownForMonthV2Model = {
  period: '2022-08',
  totalCost: 0.1,
  services: [
    {
      name: 'API Requests',
      amount: 10,
      cost: 0.1,
      itemCount: 1,
      items: [
        {
          name: 'offices',
          amount: 10,
          cost: 0.1,
          itemCount: 1,
          items: [
            {
              name: 'offices',
              amount: 10,
              cost: 0.1,
              itemCount: 0,
            },
          ],
        },
      ],
    },
  ],
}
