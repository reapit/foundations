import * as React from 'react'
import { mount } from 'enzyme'
import { AdminDevManagement, onPageChangeHandler, onSearchHandler, handleFetchData } from '../admin-dev-management'
import { AdminDevManagementFilterFormValues } from '@/components/ui/admin-dev-management-filter-form'
import { getMockRouterProps } from '@/utils/mock-helper'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'
import { adminDevManagementRequestData } from '@/actions/admin-dev-management'

const createStore = (loading: boolean, data?: PagedResultDeveloperModel_) => {
  return {
    ...appState,
    adminDevManagement: {
      loading,
      ...(data ? { data } : {}),
    },
  }
}

describe('AdminDevManagement', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })
  it('should match a snapshot when LOADING false', () => {
    store = mockStore(createStore(false, {}))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.ADMIN_DEV_MANAGEMENT, key: 'adminDevManagementRoute' }]}>
            <AdminDevManagement />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should show loader when LOADING true', () => {
    store = mockStore(createStore(true, {}))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.ADMIN_DEV_MANAGEMENT, key: 'adminDevManagementRoute' }]}>
            <AdminDevManagement />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should render blank Info when data is empty', () => {
    store = mockStore(createStore(true))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.ADMIN_DEV_MANAGEMENT, key: 'adminDevManagementRoute' }]}>
            <AdminDevManagement />
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
      name: '',
      company: '',
    } as AdminDevManagementFilterFormValues)
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
        name: '',
        company: '',
      } as AdminDevManagementFilterFormValues,
      {
        setStatus: jest.fn(),
      },
    )
    expect(mockRouterProps.history.push).toBeCalled()
  })
})

describe('handleFetchData', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const params = {
      page: 1,
      queryString: 'string',
    }
    const fn = handleFetchData(dispatch)
    fn(params)
    expect(dispatch).toBeCalledWith(adminDevManagementRequestData(params))
  })
})
