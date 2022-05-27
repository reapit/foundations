import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import Subscriptions, { onPageChangeHandler, onSearchHandler, renderResult } from '../'
import { getMockRouterProps } from '@/utils/mock-helper'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { SubscriptionsFilterFormValues } from '@/components/ui/subscriptions/subscriptions-filter-form'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

const createStore = (loading: boolean, data?: SubscriptionModelPagedResult) => {
  return {
    ...appState,
    list: {
      loading,
      ...(data ? { data } : {}),
    },
  }
}

describe('Subscriptions', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })
  it('should match a snapshot when LOADING false', () => {
    store = mockStore(createStore(false, {}))
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SUBSCRIPTIONS, key: 'subscriptionsRoute' }]}>
            <Subscriptions />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should show loader when LOADING true', () => {
    store = mockStore(createStore(true, {}))
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SUBSCRIPTIONS, key: 'subscriptionsRoute' }]}>
            <Subscriptions />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should render blank Info when data is empty', () => {
    store = mockStore(createStore(true))
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SUBSCRIPTIONS, key: 'subscriptionsRoute' }]}>
            <Subscriptions />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

const mockRouterProps = getMockRouterProps({ page: 2 })

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const onPageChangeHandlerFn = onPageChangeHandler(mockRouterProps.history, {
      type: 'developerEdition',
      developerName: 'developerName',
      userEmail: 'mail@example.com',
      appName: 'appName',
      status: 'active',
    } as SubscriptionsFilterFormValues)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(mockRouterProps.history.push).toBeCalled()
  })
})

describe('onSearchHandler', () => {
  it('should return a function when executing', () => {
    const onSearchHandlerFn = onSearchHandler(mockRouterProps.history)
    expect(onSearchHandlerFn).toBeDefined()

    onSearchHandlerFn(
      {
        type: 'developerEdition',
        developerName: 'developerName',
        userEmail: 'mail@example.com',
        appName: 'appName',
        status: 'active',
      } as SubscriptionsFilterFormValues,
      {
        setStatus: jest.fn(),
      },
    )
    expect(mockRouterProps.history.push).toBeCalled()
  })
})

describe('renderResult', () => {
  const columns = [
    { Header: 'Subscription Type', accessor: 'type' },
    { Header: 'Summary', accessor: 'summary' },
    { Header: 'Application ID', accessor: 'applicationId' },
    { Header: 'Member Name', accessor: 'developerId' },
    { Header: 'Member Email', accessor: 'user' },
    {
      Header: 'Start Date',
      accessor: 'created',
    },
    {
      Header: 'Renewal Date',
      accessor: 'renews',
    },
    { Header: 'Frequency', accessor: 'frequency' },
    { Header: 'Cost', accessor: 'cost' },
    { Header: 'Status', accessor: 'cancelled' },
    {
      Header: '',
      accessor: 'id',
    },
  ]
  it('should match snapshot when no result', () => {
    const result = renderResult([], columns, 0)
    expect(result).toMatchSnapshot()
  })

  it('should match snapshot when has result data', () => {
    const data = [
      {
        cost: 0,
        created: '2020-11-17T07:53:38',
        applicationId: '123',
        developerId: 'b1da6abb-a522-45b8-b7da-de186ea4a01b',
        frequency: 'monthly',
        id: '1de28f85-0239-497b-b20f-a855b79527e4',
        renews: '2020-12-17',
        summary: 'Developer edition license for ltran@reapit.com',
        type: 'developerEdition',
        user: 'ltran@reapit.com',
      },
    ]
    const result = renderResult(data, columns, 0)
    expect(result).toMatchSnapshot()
  })
})
