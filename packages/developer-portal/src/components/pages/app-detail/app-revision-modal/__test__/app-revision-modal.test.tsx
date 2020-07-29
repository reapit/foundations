import * as React from 'react'
import { AppDetailState } from '@/reducers/app-detail'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

import {
  DeveloperAppRevisionModal,
  DeveloperAppRevisionModalProps,
  handleUseEffectToFetchAppRevisionDetail,
  handleUseEffectToFetchAppRevisions,
  handelePendingRevisionsModalAfterClose,
  handleCancelPendingRevisionsButtonClick,
  backToAppDetailsModal,
} from '../app-revision-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { revisionDetailRequestData, revisionDetailClearData, declineRevision } from '@/actions/revision-detail'
import { revisionsRequestData, revisionsClearData } from '@/actions/revisions'
import { appDetailRequestData } from '@/actions/app-detail'
import { LoginIdentity } from '@reapit/connect-session'

const props: DeveloperAppRevisionModalProps = {
  appId: '1',
  visible: true,
  appDetailState: {
    loading: false,
    error: false,
    appDetailData: { data: appDetailDataStub.data },
    authentication: {
      loading: false,
      code: '',
    },
    isStale: false,
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
      const { appDetailData } = appDetailState as AppDetailState
      const appRevisionId = appDetailData?.data.id || ''
      const fn = handleUseEffectToFetchAppRevisionDetail(appId, spyDispatch, visible, appRevisionId)
      fn()
      expect(spyDispatch).toBeCalledWith(
        revisionDetailRequestData({
          appId,
          appRevisionId,
        }),
      )
    })
  })
  describe('handleUseEffectToFetchAppRevisions', () => {
    it('should run correctly', () => {
      const { appId, visible } = props
      const fn = handleUseEffectToFetchAppRevisions(appId, spyDispatch, visible)
      fn()
      expect(spyDispatch).toBeCalledWith(revisionsRequestData({ appId }))
    })
  })
  describe('handelePendingRevisionsModalAfterClose', () => {
    it('should run correctly', () => {
      const { afterClose } = props
      const fn = handelePendingRevisionsModalAfterClose(afterClose, spyDispatch)
      fn()
      expect(afterClose).toBeCalled()
      expect(spyDispatch).toBeCalledWith(revisionsClearData(null))
      expect(spyDispatch).toBeCalledWith(revisionDetailClearData(null))
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
        declineRevision({
          appId,
          appRevisionId,
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
      expect(spyDispatch).toBeCalledWith(revisionsClearData(null))
      expect(spyDispatch).toBeCalledWith(revisionDetailClearData(null))
      expect(spyDispatch).toBeCalledWith(appDetailRequestData({ id: appId }))
    })
  })
})
