import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { mount, shallow } from 'enzyme'
import TestRenderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import DeveloperAppDetail, {
  handleOnDeleteAppSuccess,
  renderAppHeaderButtonGroup,
  closeInstallationsModal,
  closeAppRevisionComparisionModal,
  closeDeleteAppModal,
} from '../developer-app-detail'
import routes from '@/constants/routes'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'
import { installationStub } from '@/sagas/__stubs__/installation'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'

const mockState = {
  developer: {
    developerAppDetail: {
      data: appDetailDataStub.data,
      isAppDetailLoading: false,
    },
  },
  auth: {
    loginType: 'CLIENT',
  },
  revisions: {
    revisions: revisionsDataStub,
    loading: false,
  },
  revisionDetail: {
    revisionDetailData: revisionDetailDataStub,
    approveFormState: 'PENDING',
    declineFormState: 'PENDING',
    loading: false,
  },
  installations: {
    installationsAppData: installationStub,
    formState: 'PENDING',
    installationsFilteredAppData: installationStub,
    loading: false,
    loadingFilter: false,
  },
  appDelete: {},
} as ReduxState

describe('DeveloperAppDetail', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    const history = createMemoryHistory()
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Router history={history}>
            <DeveloperAppDetail />
          </Router>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('renderAppHeaderButtonGroup', () => {
    const mockAppId = 'testAppId'
    it('should match snapshot', () => {
      const wrapper = shallow(
        <div>
          {renderAppHeaderButtonGroup(
            mockAppId,
            mockState.developer.developerAppDetail,
            jest.fn(),
            jest.fn(),
            jest.fn(),
          )}
        </div>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleOnDeleteAppSuccess', () => {
    const history = {
      replace: jest.fn(),
    }
    const fn = handleOnDeleteAppSuccess(history)
    fn()
    expect(history.replace).toBeCalledWith(routes.DEVELOPER_MY_APPS)
  })
  describe('handleOnDeleteAppSuccess', () => {
    const mockFunction = jest.fn()
    const fn = closeInstallationsModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('closeAppRevisionComparisionModal', () => {
    const mockFunction = jest.fn()
    const fn = closeAppRevisionComparisionModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('closeDeleteAppModal', () => {
    const mockFunction = jest.fn()
    const fn = closeDeleteAppModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
})
