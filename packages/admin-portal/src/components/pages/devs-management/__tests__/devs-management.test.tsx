import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import {
  DevsManagement,
  onPageChangeHandler,
  onSearchHandler,
  handleFetchData,
  onClickStatusButton,
  renderResult,
  handleFetchMemberData,
  handleToggleVisibleModal,
  closeDisableMemberModal,
  openDisableMemberModal,
} from '../devs-management'
import { getMockRouterProps } from '@/utils/mock-helper'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperModelPagedResult, MemberModel } from '@reapit/foundations-ts-definitions'
import { fetchDeveloperList, fetchDeveloperMemberList } from '@/actions/devs-management'
import { DevsManagementFilterFormValues } from '@/components/ui/devs-management-filter-form'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

const createStore = (loading: boolean, data?: DeveloperModelPagedResult) => {
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

  window.reapit.config.limitedUserAccessWhitelist = []

  beforeEach(() => {
    mockStore = configureStore()
  })
  it('should match a snapshot when LOADING false', () => {
    store = mockStore(createStore(false, {}))
    expect(
      render(
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
      render(
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
      render(
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

describe('handleFetchMemberData', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const params = {
      id: 'SOME_ID',
    }
    const fn = handleFetchMemberData(dispatch)
    fn(params)
    expect(dispatch).toBeCalledWith(fetchDeveloperMemberList(params))
  })
})

describe('handleToggleVisibleModal', () => {
  it('should run correctly', () => {
    const setModalOpen = jest.fn()
    handleToggleVisibleModal(setModalOpen, true)()
    expect(setModalOpen).toBeCalledWith(true)
  })
})

describe('closeDisableMemberModal', () => {
  it('should run correctly', () => {
    const setDisableMemberModalVisible = jest.fn()
    closeDisableMemberModal(setDisableMemberModalVisible)()
    expect(setDisableMemberModalVisible).toBeCalledWith(false)
  })
})

describe('openDisableMemberModal', () => {
  it('should run correctly', () => {
    const setSelectedUser = jest.fn()
    const setDisableMemberModalVisible = jest.fn()
    const user = {} as MemberModel
    openDisableMemberModal(setSelectedUser, setDisableMemberModalVisible, user)()
    expect(setSelectedUser).toBeCalledWith(user)
    expect(setDisableMemberModalVisible).toBeCalledWith(true)
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

describe('renderResult', () => {
  it('should match snapshot when no result', () => {
    const columns = [
      {
        Header: '#',
        id: 'id',
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Company', accessor: 'company' },
      { Header: 'Job Title', accessor: 'jobTitle' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'telephone' },
      {
        Header: 'Created',
        accessor: 'created',
      },
      {
        Header: 'Status',
        accessor: 'status',
        columnProps: {
          className: 'capitalize',
        },
      },
      {
        Header: '',
        id: 'buttonColumn',
      },
    ]
    const result = renderResult([], columns, 0)
    expect(result).toMatchSnapshot()
  })

  it('should match snapshot when has result data', () => {
    const columns = [
      {
        Header: '#',
        id: 'id',
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Company', accessor: 'company' },
      { Header: 'Job Title', accessor: 'jobTitle' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'telephone' },
      {
        Header: 'Created',
        accessor: 'created',
      },
      {
        Header: 'Status',
        accessor: 'status',
        columnProps: {
          className: 'capitalize',
        },
      },
      {
        Header: '',
        id: 'buttonColumn',
      },
    ]
    const data = [
      {
        about: '',
        agreedTerms: '2020-08-27T12:34:30',
        company: 'Merisis Technology Ltd',
        companyAddress: {
          buildingName: '',
          buildingNumber: '',
          line1: '',
          line2: '',
          line3: '',
          line4: '',
          postcode: '',
        },
        created: '2020-08-27T12:34:32',
        email: 'martin.coumbe@merisis.com',
        externalId: 'c9988cf6-ce52-40a7-aedb-aa5e235d9057',
        id: 'e40cfb8e-8bd9-454b-be58-15439565a020',
        isInactive: false,
        jobTitle: '',
        modified: '2020-08-27T12:34:32',
        name: 'Martin Coumbe',
        registrationNumber: '',
        status: 'incomplete',
        taxNumber: '',
        telephone: '0844 870 0555',
        website: '',
      },
    ]
    const result = renderResult(data, columns, 0)
    expect(result).toMatchSnapshot()
  })
})
