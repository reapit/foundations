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
    expect(prepareTableData(monthlyBillingData.requestsByService)).toEqual(tableData)
  })
})
