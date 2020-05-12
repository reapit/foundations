import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import ClientAppDetailManage, {
  handleCloseUninstallConfirmationModal,
  handleUninstallAppButtonClick,
} from '../client-app-detail-manage'

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
} as ReduxState

describe('ClientAppDetailManage', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <ClientAppDetailManage />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleCloseUninstallConfirmationModal', () => {
    const mockFunction = jest.fn()
    const fn = handleCloseUninstallConfirmationModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('handleUninstallAppButtonClick', () => {
    const mockFunction = jest.fn()
    const fn = handleUninstallAppButtonClick(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(true)
  })
})
