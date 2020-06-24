import { BillingBreakdownForMonthV2Model, ServiceItemBillingV2Model } from '@reapit/foundations-ts-definitions'

export const monthlyBillingData: BillingBreakdownForMonthV2Model = {
  period: '2020-06',
  services: [
    {
      cost: 7.975,
      itemCount: 7,
      amount: 638,
      items: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2 }],
      name: 'API Requests',
    },
  ] as ServiceItemBillingV2Model[],
  totalCost: 9.57,
}

export const tableData = [
  {
    amount: 638,
    cost: 7.975,
    itemCount: 7,
    name: 'API Requests',
    subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2, subRows: [] }],
  },
]
