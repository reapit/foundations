import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import { DeveloperModelPagedResult } from '@reapit/foundations-ts-definitions'
import appState from '@/reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import Routes from '@/constants/routes'

import SubscriptionsFilterForm, {
  SubscriptionsFormProps,
  prepareDevelopersOptions,
} from '../../subscriptions/subscriptions-filter-form'

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

describe('prepareDevelopersOptions', () => {
  it('prepareDevelopersOptions should return true result', () => {
    const data = [
      { id: '123', name: 'Alice' },
      { id: '456', name: 'Bob' },
    ]
    const expected = [
      { label: 'Alice', value: '123' },
      { label: 'Bob', value: '456' },
    ]
    expect(prepareDevelopersOptions(data)).toEqual(expected)
  })
})
