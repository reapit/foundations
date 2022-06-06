import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import {
  Customers,
  onSearchHandler,
  onPageChangeHandler,
  generateFilterValues,
  CheckMarkCell,
  LogoUploadButtonCell,
  CustomersFilterForm,
  renderContent,
  columns,
  refreshForm,
} from '../customers'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { customersList } from '@/sagas/customers/__stubs__/customers-list'
import { History } from 'history'

const historyMock = {
  push: jest.fn(),
} as unknown as History<any>

describe('Customers', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })
  it('should match a snapshot when LOADING false', () => {
    store = mockStore(appState)
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CUSTOMERS, key: 'customersRoute' }]}>
            <Customers />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when LOADING true', () => {
    store = mockStore({
      ...appState,
      customers: {
        list: {
          ...appState.customers.list,
          isLoading: true,
        },
      },
    })
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CUSTOMERS, key: 'customersRoute' }]}>
            <Customers />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when data is empty', () => {
    store = mockStore({
      ...appState,
      customers: {
        list: {
          ...appState.customers.list,
          data: [],
        },
      },
    })
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CUSTOMERS, key: 'customersRoute' }]}>
            <Customers />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('renderContent', () => {
    const mockProps = {
      customerData: customersList.data,
      columns,
    }
    const wrapper = render(<div>{renderContent(mockProps)}</div>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('onSearchHandler', () => {
  const setStatusMock = jest.fn()
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should setStatus when !query', () => {
    const fn = onSearchHandler(historyMock)
    fn({ name: '' }, { setStatus: setStatusMock })
    expect(setStatusMock).toHaveBeenCalledWith('Please enter at least one search criteria')
  })
  it('should push history when has query', () => {
    const fn = onSearchHandler(historyMock)
    const spy = jest.spyOn(historyMock, 'push')
    fn({ name: 'test' }, { setStatus: setStatusMock })
    expect(setStatusMock).toHaveBeenCalledWith('')
    expect(spy).toHaveBeenCalledWith(`${Routes.CUSTOMERS}?name=test`)
  })
})

describe('onPageChangeHandler', () => {
  it('should work correctly', () => {
    const fn = onPageChangeHandler(historyMock, new URLSearchParams())
    fn(2)
    const spy = jest.spyOn(historyMock, 'push')
    expect(spy).toHaveBeenCalledWith(`${Routes.CUSTOMERS}?page=2`)
  })
})

describe('generateFilterValues', () => {
  it('should work correctly', () => {
    const result = generateFilterValues(new URLSearchParams('?name=test'))
    expect(result).toEqual({ name: 'test' })
  })
})

describe('LogoUploadButtonCell', () => {
  it('should match snapshot', () => {
    const wrapper = render(<LogoUploadButtonCell />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('CheckMarkCell', () => {
  it('should match snapshot with value', () => {
    const wrapper = render(<CheckMarkCell cell={{ value: 'yes' }} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot without value', () => {
    const wrapper = render(<CheckMarkCell cell={{ value: null }} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('CustomersFilterForm', () => {
  it('should match snapshot', () => {
    const history = {
      push: jest.fn(),
    } as any
    const wrapper = render(
      <CustomersFilterForm filterValues={{ name: 'test' }} onSearch={jest.fn()} history={history} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('refreshForm', () => {
  it('should return correctly', () => {
    const history = {
      push: jest.fn(),
    }
    const fn = refreshForm(history)
    fn()
    expect(history.push).toBeCalledWith(Routes.CUSTOMERS)
  })
})
