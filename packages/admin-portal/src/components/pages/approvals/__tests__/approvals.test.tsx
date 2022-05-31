import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { approvalsStub } from '@/sagas/approvals/__stubs__/approvals'
import Routes from '@/constants/routes'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/apps/__stubs__/revision-detail'
import appState from '@/reducers/__stubs__/app-state'
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
} from '../approvals'

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
      expect(mockHistory.push).toBeCalledWith(`${Routes.APPROVALS}?page=1`)
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
      const wrapper = render(
        <Content loading={false} waitingApprovalList={approvalsStub.data.data || []} tableColumns={mockTableColumns} />,
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot', () => {
      const wrapper = render(<Content loading={true} waitingApprovalList={[]} tableColumns={mockTableColumns} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderId', () => {
    it('should renderId correctly', () => {
      const input = {
        page: 1,
      }
      const wrapper = render(<div>{renderId(input)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should renderId correctly', () => {
      const input = {
        page: 2,
      }
      const wrapper = render(<div>{renderId(input)}</div>)
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
      const wrapper = render(<div>{renderViewDetailButton(mockProps)}</div>)
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
      expect(result).toHaveLength(6)
    })
  })

  describe('AdminApprovals', () => {
    let store
    beforeEach(() => {
      const mockStore = configureStore()
      store = mockStore(appState)
    })
    it('should match a snapshot', () => {
      expect(
        render(
          <ReactRedux.Provider store={store}>
            <MemoryRouter initialEntries={[{ pathname: Routes.APPROVALS, key: 'adminApprovalRoute' }]}>
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
