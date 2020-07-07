import * as React from 'react'
import { shallow } from 'enzyme'
import CostExplorerTable, { prepareTableData } from '../cost-explorer-table'
import { monthlyBillingData, tableData } from '@/sagas/__stubs__/monthly-billing'

import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { developerState } from '@/sagas/__stubs__/developer'

const mockState = {
  developer: developerState,
} as ReduxState

describe('CostExplorerTable', () => {
  it('should match a snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(mockState)
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <CostExplorerTable />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('prepareTableData', () => {
  it('should run correctly', () => {
    const { services = [] } = monthlyBillingData
    expect(prepareTableData(services)).toEqual(tableData)
  })

  it('should return correct data', () => {
    const { services = [] } = monthlyBillingData
    const input = [
      ...services,
      {
        cost: 7.975,
        itemCount: 7,
        amount: 638,
        items: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2 }],
        name: 'TEST',
      },
    ]

    const expected = [
      {
        amount: 638,
        cost: 7.975,
        itemCount: 7,
        name: 'API Requests',
        subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2, subRows: [] }],
      },
      {
        cost: 7.975,
        itemCount: null,
        amount: 638,
        subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: null, subRows: [] }],
        name: 'TEST',
      },
    ]

    expect(prepareTableData(input)).toEqual(expected)
  })
})
