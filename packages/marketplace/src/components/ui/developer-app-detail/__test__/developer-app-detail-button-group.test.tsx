import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import DeveloperAppDetailButtonGroup, {
  DeveloperAppDetailButtonGroupProps,
  handleEditDetailButtonClick,
  handlenDeleteAppButtonClick,
  handlePendingRevisionButtonClick,
  handleInstallationButtonClick,
} from '../developer-app-detail-button-group'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { removeAuthenticationCode } from '@/actions/app-detail'
import routes from '@/constants/routes'

const mockState = {
  client: {
    appDetail: {
      data: appDetailDataStub.data,
      isAppDetailLoading: false,
    },
    appSummary: {
      data: null,
      isAppSummaryLoading: false,
    },
  },
  appDetail: {
    authentication: {
      code: 'mockAuthenticationCode',
    },
  },
} as ReduxState

const mockProps: DeveloperAppDetailButtonGroupProps = {
  appDetailState: {
    data: appDetailDataStub.data,
    isAppDetailLoading: false,
  },
  setIsInstallationsModalOpen: jest.fn(),
  setIsAppRevisionComparisionModalOpen: jest.fn(),
  setIsDeleteModalOpen: jest.fn(),
}

describe('ClientAppInstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailState.data?.id || ''
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <DeveloperAppDetailButtonGroup {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleEditDetailButtonClick', () => {
    it('should run correctly', () => {
      const history = {
        push: jest.fn(),
      }
      const fn = handleEditDetailButtonClick(history, spyDispatch, appId)
      fn()
      expect(spyDispatch).toBeCalledWith(removeAuthenticationCode())
      expect(history.push).toBeCalledWith(`${routes.DEVELOPER_MY_APPS}/${appId}/edit`)
    })
  })
  describe('handlenDeleteAppButtonClick', () => {
    it('should run correctly', () => {
      const setIsDeleteModalOpen = jest.fn()
      const fn = handlenDeleteAppButtonClick(setIsDeleteModalOpen)
      fn()
      expect(setIsDeleteModalOpen).toBeCalledWith(true)
    })
  })
  describe('handlePendingRevisionButtonClick', () => {
    it('should run correctly', () => {
      const setIsAppRevisionComparisionModalOpen = jest.fn()
      const fn = handlePendingRevisionButtonClick(setIsAppRevisionComparisionModalOpen)
      fn()
      expect(setIsAppRevisionComparisionModalOpen).toBeCalledWith(true)
    })
  })
  describe('handleInstallationButtonClick', () => {
    it('should run correctly', () => {
      const setIsInstallationsModalOpen = jest.fn()
      const fn = handleInstallationButtonClick(setIsInstallationsModalOpen)
      fn()
      expect(setIsInstallationsModalOpen).toBeCalledWith(true)
    })
  })
})
