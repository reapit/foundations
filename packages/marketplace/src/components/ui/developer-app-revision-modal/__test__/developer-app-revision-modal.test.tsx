import * as React from 'react'
import { shallow } from 'enzyme'

import {
  DeveloperAppRevisionModal,
  DeveloperAppRevisionModalProps,
  handleUseEffectToFetchAppRevisionDetail,
  handleUseEffectToFetchAppRevisions,
  handelePendingRevisionsModalAfterClose,
  handleCancelPendingRevisionsButtonClick,
  backToAppDetailsModal,
} from '../developer-app-revision-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

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
  revisionDetailState: {
    loading: false,
    error: false,
    revisionDetailData: {
      data: revisionDetailDataStub.data,
      scopes: appPermissionStub,
      desktopIntegrationTypes: integrationTypesStub,
    },
    approveFormState: 'PENDING',
    declineFormState: 'PENDING',
  },
  revisionsState: {
    loading: false,
    revisions: revisionsDataStub,
  },
  afterClose: jest.fn(),
  clearAppRevisionDetail: jest.fn(),
  clearAppRevisions: jest.fn(),
  declineAppRevision: jest.fn(),
  fetchAppDetail: jest.fn(),
  fetchAppRevisionDetail: jest.fn(),
  fetchAppRevisions: jest.fn(),
  loginIdentity: {
    adminId: '1',
    clientId: '2',
    developerId: '3',
    email: 'mock@test.com',
    name: 'mock user',
    userCode: 'mockUserCode',
  },
}

describe('DeveloperAppRevisionModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperAppRevisionModal {...props} />)).toMatchSnapshot()
  })
  describe('handleUseEffectToFetchAppRevisionDetail', () => {
    it('should run correctly', () => {
      const {
        appId,
        appDetailState: { appDetailData },
        fetchAppRevisionDetail,
        visible,
      } = props
      const appRevisionId = appDetailData?.data.id || ''
      const fn = handleUseEffectToFetchAppRevisionDetail(appId, appRevisionId, fetchAppRevisionDetail, visible)
      fn()
      expect(fetchAppRevisionDetail).toBeCalledWith({
        appId,
        appRevisionId,
      })
    })
  })
  describe('handleUseEffectToFetchAppRevisions', () => {
    it('should run correctly', () => {
      const { appId, fetchAppRevisions, visible } = props
      const fn = handleUseEffectToFetchAppRevisions(appId, fetchAppRevisions, visible)
      fn()
      expect(fetchAppRevisions).toBeCalledWith(appId)
    })
  })
  describe('handelePendingRevisionsModalAfterClose', () => {
    it('should run correctly', () => {
      const { afterClose, clearAppRevisions, clearAppRevisionDetail } = props
      const fn = handelePendingRevisionsModalAfterClose(afterClose, clearAppRevisions, clearAppRevisionDetail)
      fn()
      expect(afterClose).toBeCalled()
      expect(clearAppRevisions).toBeCalled()
      expect(clearAppRevisionDetail).toBeCalled()
    })
  })
  describe('handleCancelPendingRevisionsButtonClick', () => {
    it('should run correctly', () => {
      const {
        declineAppRevision,
        appId,
        revisionDetailState: { revisionDetailData },
        loginIdentity,
      } = props
      const appRevisionId = revisionDetailData?.data.id || ''
      const fn = handleCancelPendingRevisionsButtonClick(declineAppRevision, appId, appRevisionId, loginIdentity)
      fn()
      if (!appRevisionId || !loginIdentity) {
        expect(handleCancelPendingRevisionsButtonClick).toReturn()
      }
      expect(declineAppRevision).toBeCalledWith({
        appId,
        appRevisionId,
        name: loginIdentity?.name,
        email: loginIdentity?.email,
        rejectionReason: 'Developer Cancelled',
      })
    })
  })
  describe('backToAppDetailsModal', () => {
    it('should run correctly', () => {
      const { clearAppRevisions, clearAppRevisionDetail, fetchAppDetail, appId } = props
      const fn = backToAppDetailsModal(fetchAppDetail, clearAppRevisions, clearAppRevisionDetail, appId)
      fn()
      expect(clearAppRevisions).toBeCalled()
      expect(clearAppRevisionDetail).toBeCalled()
      expect(fetchAppDetail).toBeCalledWith(appId)
    })
  })
})
