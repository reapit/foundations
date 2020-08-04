import * as React from 'react'
import { shallow } from 'enzyme'
import CostExplorerTable from '../cost-explorer-table'

import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { developerState } from '@/sagas/__stubs__/developer'
import { tableData } from '@/sagas/__stubs__/monthly-billing'

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
          <CostExplorerTable tableData={tableData} columns={[]} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
