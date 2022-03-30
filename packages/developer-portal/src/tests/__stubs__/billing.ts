import { BillingBreakdownForMonthV2Model, ServiceItemBillingV2Model } from '@reapit/foundations-ts-definitions'

export const mockMonthlyBillingData: BillingBreakdownForMonthV2Model = {
  period: '2020-06',
  services: [
    {
      cost: 7.975,
      itemCount: 7,
      amount: 638,
      items: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2 }],
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
