import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render } from '../../../../tests/react-testing'
import { DeveloperModelPagedResult } from '@reapit/foundations-ts-definitions'
import appState from '@/reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import Routes from '@/constants/routes'

import MemberNameCell, { MemberNameCellProps } from '../../subscriptions/subscription-member-name-cell'

const createStore = (loading: boolean, data?: DeveloperModelPagedResult) => {
  return {
    ...appState,
    adminDevManagement: {
      loading,
      ...(data ? { data } : {}),
    },
  }
}

const initProps = (): MemberNameCellProps => ({
  cell: { value: '123' },
})

describe('MemberNameCell', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })

  it('should render MemberNameCell', () => {
    store = mockStore(
      createStore(false, {
        data: [
          { id: '123', name: 'long' },
          { id: '56', name: 'Will' },
        ],
      }),
    )
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SUBSCRIPTIONS, key: 'subscriptions' }]}>
            <MemberNameCell {...initProps()} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
