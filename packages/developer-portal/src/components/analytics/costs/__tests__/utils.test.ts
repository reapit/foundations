import { mockMonthlyBillingData } from '../../../../tests/__stubs__/billing'
import { AnalyticsFilterState } from '../../state/use-analytics-state'
import { flattenBillingData, getMonthsRange, handleAggregateBillingData } from '../utils'

describe('getMonthsRange', () => {
  it('should return a range of dates', () => {
    const result = getMonthsRange({ monthFrom: '2022-03', monthTo: '2022-04' } as AnalyticsFilterState, 'MMM')

    expect(result).toEqual(['Apr', 'Mar'])
  })
})

describe('handleAggregateBillingData', () => {
  it('should return a range of dates', () => {
    const curried = handleAggregateBillingData([mockMonthlyBillingData, mockMonthlyBillingData])

    const result = curried()

    expect(result).toEqual({
      services: [
        {
          amount: 1276,
          cost: 15.95,
          itemCount: 14,
          items: [
            {
              amount: 314,
              cost: 3.925,
              itemCount: 4,
              items: [
                {
                  amount: 1276,
                  cost: 15.95,
                  itemCount: 14,
                  items: [{ amount: 314, cost: 3.925, itemCount: 4, items: [], name: 'contacts' }],
                  name: 'contacts',
                },
              ],
              name: 'contacts',
            },
          ],
          name: 'API Requests',
        },
        {
          amount: 1276,
          cost: 15.95,
          itemCount: 14,
          items: [{ amount: 314, cost: 3.925, itemCount: 4, items: [], name: 'DW Usage' }],
          name: 'Data Warehouse',
        },
      ],
      totalCost: 2000,
    })
  })
})

describe('flattenBillingData', () => {
  it('should return a range of dates', () => {
    const result = flattenBillingData(mockMonthlyBillingData.services ?? [])

    expect(result).toEqual([
      ['Service Name', 'Item Count', 'Number Items', 'Cost'],
      ['API Requests', 14, 1276, 15.95],
      ['Service Name', 'Item Count', 'Number Items', 'Cost'],
      ['contacts', 4, 314, 3.925],
      ['Service Name', 'Item Count', 'Number Items', 'Cost'],
      ['contacts', 14, 1276, 15.95],
      ['Service Name', 'Item Count', 'Number Items', 'Cost'],
      ['contacts', 4, 314, 3.925],
      ['Data Warehouse', 14, 1276, 15.95],
      ['Service Name', 'Item Count', 'Number Items', 'Cost'],
      ['DW Usage', 4, 314, 3.925],
    ])
  })
})
