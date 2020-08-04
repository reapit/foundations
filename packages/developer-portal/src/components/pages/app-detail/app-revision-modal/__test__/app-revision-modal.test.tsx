import * as React from 'react'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

import {
  DeveloperAppRevisionModal,
  AppRevisionModalProps,
  handleUseEffectToFetchAppRevisionDetail,
  handleUseEffectToFetchAppRevisions,
  handelePendingRevisionsModalAfterClose,
  handleCancelPendingRevisionsButtonClick,
  backToAppDetailsModal,
  onCancelRevisionSuccess,
} from '../app-revision-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { LoginIdentity } from '@reapit/connect-session'
import {
  fetchAppDetail,
  fetchAppRevisionDetail,
  clearAppRevisionDetail,
  declineAppRevision,
  fetchAppRevisionList,
  clearAppRevisionList,
} from '@/actions/apps'

const props: AppRevisionModalProps = {
  appId: '1',
  visible: true,
  appDetailState: {
    isLoading: false,
    data: appDetailDataStub.data,
    errorMessage: '',
  },
  afterClose: jest.fn(),
}

describe('DeveloperAppRevisionModal', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <DeveloperAppRevisionModal {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleUseEffectToFetchAppRevisionDetail', () => {
    it('should run correctly', () => {
      const { appId, appDetailState, visible } = props
      const { data } = appDetailState as AppDetailState
      const appRevisionId = data?.id || ''
      const fn = handleUseEffectToFetchAppRevisionDetail(appId, spyDispatch, visible, appRevisionId)
      fn()
      expect(spyDispatch).toBeCalledWith(
        fetchAppRevisionDetail({
          id: appId,
          revisionId: appRevisionId,
        }),
      )
    })
  })
  describe('handleUseEffectToFetchAppRevisions', () => {
    it('should run correctly', () => {
      const { appId, visible } = props
      const fn = handleUseEffectToFetchAppRevisions(appId, spyDispatch, visible)
      fn()
      expect(spyDispatch).toBeCalledWith(fetchAppRevisionList({ id: appId }))
    })
  })
  describe('handelePendingRevisionsModalAfterClose', () => {
    it('should run correctly', () => {
      const { afterClose } = props
      const fn = handelePendingRevisionsModalAfterClose(afterClose, spyDispatch)
      fn()
      expect(afterClose).toBeCalled()
      expect(spyDispatch).toBeCalledWith(clearAppRevisionList())
      expect(spyDispatch).toBeCalledWith(clearAppRevisionDetail())
    })
  })
  describe('handleCancelPendingRevisionsButtonClick', () => {
    it('should run correctly', () => {
      const { appId } = props
      const appRevisionId = 'test'
      const loginIdentity: LoginIdentity = {
        adminId: '1',
        clientId: '2',
        developerId: '3',
        email: 'mock@test.com',
        name: 'mock user',
        userCode: 'mockUserCode',
        groups: [],
      }
      const fn = handleCancelPendingRevisionsButtonClick(spyDispatch, appId, appRevisionId, loginIdentity)
      fn()
      if (!appRevisionId || !loginIdentity) {
        expect(handleCancelPendingRevisionsButtonClick).toReturn()
      }
      expect(spyDispatch).toBeCalledWith(
        declineAppRevision({
          id: appId,
          revisionId: appRevisionId,
          name: loginIdentity?.name,
          email: loginIdentity?.email,
          rejectionReason: 'Developer Cancelled',
        }),
      )
    })
  })
  describe('backToAppDetailsModal', () => {
    it('should run correctly', () => {
      const { appId } = props
      const fn = backToAppDetailsModal(appId, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(clearAppRevisionList())
      expect(spyDispatch).toBeCalledWith(clearAppRevisionDetail())
      expect(spyDispatch).toBeCalledWith(fetchAppDetail({ id: appId }))
    })
  })
  describe('onCancelRevisionSuccess', () => {
    it('should run correctly', () => {
      const mockSetIsDeclinedSuccessfully = jest.fn()
      const fn = onCancelRevisionSuccess(mockSetIsDeclinedSuccessfully)
      fn()
      expect(mockSetIsDeclinedSuccessfully).toBeCalledWith(true)
    })
  })
})
