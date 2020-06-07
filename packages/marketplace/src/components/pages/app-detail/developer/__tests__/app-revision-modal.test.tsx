import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import AppRevisionModal, {
  AppRevisionModalProps,
  handleUseEffectToFetchAppRevisions,
  handleUseEffectToFetchAppRevisionDetail,
  handleCancelPendingRevisionsSuccessCallback,
} from '../app-revision-modal'
import { revisionsRequestData } from '@/actions/revisions'
import { revisionDetailRequestData } from '@/actions/revision-detail'
import { developerFetchAppDetail } from '@/actions/developer'
import appState from '@/reducers/__stubs__/app-state'

const mockProps: AppRevisionModalProps = {
  appDetailState: {
    data: appDetailDataStub.data,
    isAppDetailLoading: false,
  },
  visible: true,
  appId: appDetailDataStub.data.id || '',
  afterClose: jest.fn(),
}

describe('ClientAppInstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailState.data?.id || ''
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <AppRevisionModal {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleUseEffectToFetchAppRevisions', () => {
    it('should run correctly when the modal is visible', () => {
      const fn = handleUseEffectToFetchAppRevisions(appId, true, spyDispatch)
      fn()
      if (appId) {
        expect(spyDispatch).toBeCalledWith(
          revisionsRequestData({
            appId,
          }),
        )
      }
    })
  })
  describe('handleUseEffectToFetchAppRevisionDetail', () => {
    it('should run correctly when the modal is visible', () => {
      const revisions = appState.revisions.revisions?.data
      const appRevisionId = revisions && revisions[0].id
      const fn = handleUseEffectToFetchAppRevisionDetail(appId, true, spyDispatch, appRevisionId)
      fn()
      if (appId && appRevisionId) {
        expect(spyDispatch).toBeCalledWith(
          revisionDetailRequestData({
            appId,
            appRevisionId,
          }),
        )
      }
    })
  })
  describe('handleCancelPendingRevisionsSuccessCallback', () => {
    it('should run correctly when the modal is visible', () => {
      const setIsConfirmationModalVisible = jest.fn()
      const clientId = appState.auth.loginSession?.loginIdentity.clientId || ''
      const fn = handleCancelPendingRevisionsSuccessCallback(
        appId,
        clientId,
        spyDispatch,
        setIsConfirmationModalVisible,
      )
      fn()
      expect(spyDispatch).toBeCalledWith(
        developerFetchAppDetail({
          id: appId,
          clientId,
        }),
      )
    })
  })
})
