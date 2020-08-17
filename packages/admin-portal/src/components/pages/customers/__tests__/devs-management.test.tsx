import * as React from 'react'
import { mount } from 'enzyme'
import {
  DevsManagement,
  onPageChangeHandler,
  onSearchHandler,
  handleFetchData,
  onClickStatusButton,
} from '../devs-management'
import { getMockRouterProps } from '@/utils/mock-helper'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'
import { fetchDeveloperList } from '@/actions/devs-management'
import { DevsManagementFilterFormValues } from '@/components/ui/devs-management-filter-form'

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
          <MemoryRouter initialEntries={[{ pathname: Routes.DEV_MANAGEMENT, key: 'adminDevManagementRoute' }]}>
            <DevsManagement />
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
          <MemoryRouter initialEntries={[{ pathname: Routes.DEV_MANAGEMENT, key: 'adminDevManagementRoute' }]}>
            <DevsManagement />
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
          <MemoryRouter initialEntries={[{ pathname: Routes.DEV_MANAGEMENT, key: 'adminDevManagementRoute' }]}>
            <DevsManagement />
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
    } as DevsManagementFilterFormValues)
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
      } as DevsManagementFilterFormValues,
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
    expect(dispatch).toBeCalledWith(fetchDeveloperList(params))
  })
})

describe('onClickStatusButton', () => {
  it('should run correctly', () => {
    const setDeveloper = jest.fn()
    const setIsSetStatusModalOpen = jest.fn()
    const developerData = {}
    const fn = onClickStatusButton(setDeveloper, setIsSetStatusModalOpen, developerData)
    fn()
    expect(setDeveloper).toBeCalledWith({ ...developerData })
    expect(setIsSetStatusModalOpen).toBeCalledWith(true)
  })
})
