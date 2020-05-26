import * as React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { approvalsStub } from '@/sagas/__stubs__/approvals'
import routes from '@/constants/routes'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { ReduxState } from '@/types/core'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import {
  AdminApprovals,
  handleCloseModal,
  handleOnPageChange,
  Content,
  renderId,
  renderViewDetailButton,
  generateTableColumn,
  handleViewDetailOnClick,
  HandleViewDetailOnClickParams,
} from '../admin-approvals'
import Routes from '@/constants/routes'

describe('admin-approvals', () => {
  describe('handleCloseModal', () => {
    it('should call dispatch', () => {
      const setIsModalOpen = jest.fn()
      const fn = handleCloseModal({ setIsModalOpen })
      fn()
      expect(setIsModalOpen).toBeCalled()
    })
  })

  describe('handleOnPageChange', () => {
    it('should call dispatch', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleOnPageChange(mockHistory)
      fn(1)
      expect(mockHistory.push).toBeCalledWith(`${routes.ADMIN_APPROVALS}?page=1`)
    })
  })

  describe('Content', () => {
    const mockTableColumns = [
      {
        Header: 'AppId',
        accessor: 'appId',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ]
    it('should match snapshot', () => {
      const wrapper = shallow(
        <Content loading={false} waitingApprovalList={approvalsStub.data.data || []} tableColumns={mockTableColumns} />,
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot', () => {
      const wrapper = shallow(<Content loading={true} waitingApprovalList={[]} tableColumns={mockTableColumns} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderId', () => {
    it('should renderId correctly', () => {
      const input = {
        page: 1,
      }
      const wrapper = shallow(<div>{renderId(input)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should renderId correctly', () => {
      const input = {
        page: 2,
      }
      const wrapper = shallow(<div>{renderId(input)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderViewDetailButton', () => {
    it('should render correctly', () => {
      const mockProps = {
        revisionDetail: revisionDetailDataStub.data,
        appDetail: appDetailDataStub.data,
        setIsModalOpen: jest.fn(),
        dispatch: jest.fn(),
      }
      const wrapper = shallow(<div>{renderViewDetailButton(mockProps)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('generateTableColumn', () => {
    it('should render correctly', () => {
      const mockProps = {
        page: 1,
        revisionDetail: revisionDetailDataStub.data,
        appDetail: appDetailDataStub.data,
        setIsModalOpen: jest.fn(),
        dispatch: jest.fn(),
      }
      const result = generateTableColumn(mockProps)
      expect(result).toHaveLength(5)
    })
  })

  describe('AdminApprovals', () => {
    const mockState = {
      revisionDetail: {
        revisionDetailData: {
          data: revisionsDataStub,
        },
      },
      revisions: {
        revisions: revisionsDataStub,
      },
      appDetail: {
        appDetailData: appDetailDataStub,
      },
      adminApps: {
        adminAppsData: appsDataStub.data,
        loading: false,
      },
      adminApprovals: {
        loading: false,
        adminApprovalsData: {
          data: {
            data: [
              {
                appId: 'ddc8b25e-42a2-468e-aa8f-4091eee6958f',
                type: 'App Revision',
                description: 'A developer has submitted a request to modify their application',
                appRevisionId: '4afb0bb9-c1f8-403a-8fd6-1c92b4244906',
                links: [
                  {
                    rel: 'self',
                    href:
                      'http://reapit.cloud.tyk.io/marketplace/apps/ddc8b25e-42a2-468e-aa8f-4091eee6958f/revisions/4afb0bb9-c1f8-403a-8fd6-1c92b4244906',
                    action: 'GET',
                  },
                  {
                    rel: 'approve',
                    href:
                      'http://reapit.cloud.tyk.io/marketplace/apps/ddc8b25e-42a2-468e-aa8f-4091eee6958f/revisions/4afb0bb9-c1f8-403a-8fd6-1c92b4244906/approve',
                    action: 'GET',
                  },
                  {
                    rel: 'reject',
                    href:
                      'http://reapit.cloud.tyk.io/marketplace/apps/ddc8b25e-42a2-468e-aa8f-4091eee6958f/revisions/4afb0bb9-c1f8-403a-8fd6-1c92b4244906/reject',
                    action: 'GET',
                  },
                ],
              },
            ],
          },
        },
      },
    } as ReduxState
    let store
    beforeEach(() => {
      /* mocking store */
      const mockStore = configureStore()
      store = mockStore(mockState)
    })
    it('should match a snapshot', () => {
      expect(
        mount(
          <ReactRedux.Provider store={store}>
            <MemoryRouter initialEntries={[{ pathname: Routes.ADMIN_APPROVALS, key: 'adminApprovalRoute' }]}>
              <AdminApprovals />
            </MemoryRouter>
          </ReactRedux.Provider>,
        ),
      ).toMatchSnapshot()
    })
  })

  describe('handleViewDetailOnClick', () => {
    it('should render correctly', () => {
      const mockParams = {
        dispatch: jest.fn(),
        appRevisionId: '1231',
        currentRevisionId: '1232',
        appId: '1234',
        currentAppId: '1233',
        setIsModalOpen: jest.fn(),
      } as HandleViewDetailOnClickParams
      const fn = handleViewDetailOnClick(mockParams)
      fn()
      expect(mockParams.dispatch).toBeCalled()
    })
  })
})
