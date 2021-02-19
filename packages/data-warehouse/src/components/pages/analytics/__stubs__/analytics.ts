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
    itemCount: null,
    name: 'API Requests',
    subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: null, subRows: [] }],
  },
]

export const subBilling = {
  from: '2019-11',
  to: '2020-06',
  periods: [
    {
      name: '2019-11',
      periodStart: '2019-11-01',
      periodEnd: '2019-11-30',
      periodName: 'November 2019',
      cost: 0.0,
      services: [
        {
          name: 'Data Warehouse',
          cost: 1,
        },
        {
          name: 'Application Listing',
          cost: 1,
        },
        {
          name: 'Developer Edition',
          cost: 1,
        },
      ],
    },
    {
      name: '2019-12',
      periodStart: '2019-12-01',
      periodEnd: '2019-12-31',
      periodName: 'December 2019',
      cost: 0.0,
      services: [
        {
          name: 'Data Warehouse',
          cost: 0.0,
        },
      ],
    },
    {
      name: '2020-01',
      periodStart: '2020-01-01',
      periodEnd: '2020-01-31',
      periodName: 'January 2020',
      cost: 0.0,
      services: [
        {
          name: 'Data Warehouse',
          cost: 0.0,
        },
      ],
    },
    {
      name: '2020-02',
      periodStart: '2020-02-01',
      periodEnd: '2020-02-29',
      periodName: 'February 2020',
      cost: 0.0,
      services: [
        {
          name: 'Data Warehouse',
          cost: 0.0,
        },
      ],
    },
    {
      name: '2020-03',
      periodStart: '2020-03-01',
      periodEnd: '2020-03-31',
      periodName: 'March 2020',
      cost: 0.0,
      services: [
        {
          name: 'Data Warehouse',
          cost: 0.0,
        },
      ],
    },
    {
      name: '2020-04',
      periodStart: '2020-04-01',
      periodEnd: '2020-04-30',
      periodName: 'April 2020',
      cost: 0.3,
      services: [
        {
          name: 'Data Warehouse',
          cost: 0.3,
        },
      ],
    },
    {
      name: '2020-05',
      periodStart: '2020-05-01',
      periodEnd: '2020-05-31',
      periodName: 'May 2020',
      cost: 0.5,
      services: [
        {
          name: 'Data Warehouse',
          cost: 0.5,
        },
      ],
    },
  ],
}
