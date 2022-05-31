import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'
import {
  renderIsFeature,
  renderForm,
  handleCloseAppDeleteModal,
  renderCreatedAt,
  renderDeleteAction,
  refreshForm,
  handleOnSubmit,
  handleChangePage,
  renderContent,
  AppsManagement,
  renderChecked,
} from '../apps-management'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { setDeleteAppInitFormState } from '@/actions/app-delete'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('admin-apps', () => {
  describe('renderIsFeature', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const fn = renderIsFeature(mockDispatch)
      const row = { original: { id: '123' } }
      const cell = { value: '123' }
      const wrapper = fn({ row, cell })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderCreatedAt', () => {
    it('should match snapshot', () => {
      const cell = { value: '2020-01-01T00:00:00Z' }
      const wrapper = render(<div>{renderCreatedAt({ cell })}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderDeleteAction', () => {
    it('should render DeleteActions', () => {
      const setDataDeleteModal = jest.fn()
      const deleteModalData = {
        visible: true,
        appId: '123',
        appName: '123',
        developerName: '123',
      }
      const fn = renderDeleteAction({ deleteModalData, setDataDeleteModal })
      const row = {
        original: {
          id: '123',
          appName: 'mockAppName',
        },
      }
      const wrapper = render(<div>{fn({ row })}</div>)
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
      expect(history.push).toBeCalledWith(Routes.APPS)
    })
  })

  describe('renderForm', () => {
    it('should return correctly', () => {
      const fn = renderForm({ values: {}, status: null })
      expect(fn).toMatchSnapshot()
    })
  })

  describe('handleCloseAppDeleteModal', () => {
    it('should return correctly', () => {
      const mockProps = {
        setDataDeleteModal: jest.fn(),
        dispatch: jest.fn(),
      }
      handleCloseAppDeleteModal(mockProps)()
      expect(mockProps.setDataDeleteModal).toBeCalled()
      expect(mockProps.dispatch).toBeCalledWith(setDeleteAppInitFormState())
    })
  })

  describe('handleOnSubmit', () => {
    it('should run correctly', () => {
      const mockRouter = getMockRouterProps({})
      const fn = handleOnSubmit(mockRouter.history)
      fn(
        {
          appName: 'mockAppName',
          companyName: 'mockCompanyName',
          developerName: 'mockDeveloperName',
          registeredFrom: '2020-10-01T00:00:00Z',
          registeredTo: '2020-10-01T10:00:00Z',
        },
        { setStatus: jest.fn() },
      )
      expect(mockRouter.history.push).toBeCalled()
    })
  })

  describe('handleChangePage', () => {
    const mockRouter = getMockRouterProps({})
    const fn = handleChangePage(mockRouter.history)
    fn(1)
    expect(mockRouter.history.push).toBeCalled()
  })

  describe('renderContent', () => {
    const mockProps = {
      adminAppsData: appsDataStub.data,
      columns: [
        {
          Header: 'AppID',
          accessor: 'id',
        },
        {
          Header: 'App Name',
          accessor: 'name',
        },
        {
          Header: 'App Summary',
          accessor: 'summary',
        },
        {
          Header: 'Developer Name',
          accessor: 'developer',
        },
        {
          Header: 'Is Listed',
          accessor: 'isListed',
        },
        {
          Header: 'Pending Revisions',
          accessor: 'pendingRevisions',
        },
        {
          Header: 'Direct API',
          accessor: 'isDirectApi',
        },
        {
          Header: 'Created',
          accessor: 'created',
          Cell: renderCreatedAt,
        },
      ],
    }
    const wrapper = render(<div>{renderContent(mockProps)}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  describe('AdminApprovals', () => {
    window.reapit.config.limitedUserAccessWhitelist = []
    let store
    beforeEach(() => {
      const mockStore = configureStore()
      store = mockStore(appState)
    })
    it('should match a snapshot', () => {
      expect(
        render(
          <ReactRedux.Provider store={store}>
            <MemoryRouter initialEntries={[{ pathname: Routes.APPROVALS, key: 'adminApps' }]}>
              <AppsManagement />
            </MemoryRouter>
          </ReactRedux.Provider>,
        ),
      ).toMatchSnapshot()
    })
  })

  describe('renderChecked', () => {
    it('should return checked icon', () => {
      expect(render(<div>{renderChecked({ cell: { value: true } })}</div>)).toMatchSnapshot()
    })

    it('should return null', () => {
      expect(render(<div>{renderChecked({ cell: { value: false } })}</div>)).toMatchSnapshot()
    })
  })
})
