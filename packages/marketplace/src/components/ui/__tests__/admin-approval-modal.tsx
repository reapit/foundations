import * as React from 'react'
import { shallow } from 'enzyme'

import {
  AdminApprovalModalInner,
  AdminApprovalModalInnerProps,
  handleOnApproveSuccess,
  handleOnDeclineSuccess,
  handleSetIsDeclineModal,
  handleSetIsApproveModal,
} from '../admin-approval-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

const props = (loading: boolean, error: boolean): AdminApprovalModalInnerProps => ({
  appDetailState: {
    loading,
    error,
    appDetailData: { data: appDetailDataStub.data },
    authentication: {
      loading: false,
      code: '',
    },
    isStale: false,
  },
  revisionDetailState: {
    loading,
    error,
    revisionDetailData: { data: revisionDetailDataStub.data, scopes: appPermissionStub },
    approveFormState: 'PENDING',
    declineFormState: 'PENDING',
  },
  onApprovalClick: jest.fn(),
  onDeclineClick: jest.fn(),
})

describe('AdminRevisionModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(shallow(<AdminApprovalModalInner {...props(true, false)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<AdminApprovalModalInner {...props(false, false)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when ERROR true', () => {
    expect(shallow(<AdminApprovalModalInner {...props(false, true)} />)).toMatchSnapshot()
  })
})

describe('handleOnApproveSuccess', () => {
  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const fn = handleOnApproveSuccess(setIsApproveModalOpen)
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
  })
})

describe('handleOnDeclineSuccess', () => {
  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const fn = handleOnDeclineSuccess(setIsDeclineModalOpen)
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
  })
})

describe('handleSetIsDeclineModal', () => {
  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const afterClose = jest.fn()
    const fn = handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: true, afterClose })
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
    expect(afterClose).toBeCalled()
  })

  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const fn = handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: true })
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
  })
})

describe('handleSetIsApproveModal', () => {
  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const afterClose = jest.fn()
    const fn = handleSetIsApproveModal({ setIsApproveModalOpen, isApproveModalOpen: true, afterClose })
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
    expect(afterClose).toBeCalled()
  })

  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const fn = handleSetIsApproveModal({ setIsApproveModalOpen, isApproveModalOpen: true })
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
  })
})
