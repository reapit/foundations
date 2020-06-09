import * as React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import {
  renderIsFeature,
  renderForm,
  handleCloseAppDeleteModal,
  generateColumns,
  renderCreatedAt,
  renderDeleteAction,
  refreshForm,
  handleOnSubmit,
  handleChangePage,
  renderContent,
  AdminApps,
} from '../admin-apps'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

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
      const wrapper = shallow(<div>{renderCreatedAt({ cell })}</div>)
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
      const wrapper = shallow(<div>{fn({ row })}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should call delete action', () => {
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
      const wrapper = mount(<div>{fn({ row })}</div>)
      const button = wrapper.find('button')
      button.simulate('click')
      expect(setDataDeleteModal).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('generateColumns', () => {
    it('should match snapshot', () => {
      const dispatch = jest.fn()
      const setDataDeleteModal = jest.fn()
      const deleteModalData = {
        visible: true,
        appId: '123',
        appName: '123',
        developerName: '123',
      }
      const fn = generateColumns({ dispatch, setDataDeleteModal, deleteModalData })
      const wrapper = shallow(<div>{fn()}</div>)
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
      expect(history.push).toBeCalledWith(Routes.ADMIN_APPS)
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
      }
      handleCloseAppDeleteModal(mockProps)()
      expect(mockProps.setDataDeleteModal).toBeCalled()
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
      adminAppsData: appsDataStub,
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
    const wrapper = shallow(<div>{renderContent(mockProps)}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  describe('AdminApprovals', () => {
    let store
    beforeEach(() => {
      const mockStore = configureStore()
      store = mockStore(appState)
    })
    it('should match a snapshot', () => {
      expect(
        mount(
          <ReactRedux.Provider store={store}>
            <MemoryRouter initialEntries={[{ pathname: Routes.ADMIN_APPROVALS, key: 'adminApps' }]}>
              <AdminApps />
            </MemoryRouter>
          </ReactRedux.Provider>,
        ),
      ).toMatchSnapshot()
    })
  })
})
