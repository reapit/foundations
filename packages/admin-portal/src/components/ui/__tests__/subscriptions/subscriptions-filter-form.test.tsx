import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import { DeveloperModelPagedResult } from '@reapit/foundations-ts-definitions'
import appState from '@/reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import Routes from '@/constants/routes'

import SubscriptionsFilterForm, { SubscriptionsFormProps } from '../../subscriptions/subscriptions-filter-form'

const createStore = (loading: boolean, data?: DeveloperModelPagedResult) => {
  return {
    ...appState,
    adminDevManagement: {
      loading,
      ...(data ? { data } : {}),
    },
  }
}

const initProps = (): SubscriptionsFormProps => ({
  filterValues: {
    type: 'type',
    developerId: 'developerId',
  },
  onSearch: jest.fn(),
})

describe('SubscriptionsFilterForm', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })

  it('should render developer filter form', () => {
    store = mockStore(
      createStore(false, {
        data: [
          { id: '123', name: 'long' },
          { id: '56', name: 'Will' },
        ],
      }),
    )
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SUBSCRIPTIONS, key: 'adminDevManagementRoute' }]}>
            <SubscriptionsFilterForm {...initProps()} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
