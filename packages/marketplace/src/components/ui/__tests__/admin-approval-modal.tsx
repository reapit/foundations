import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import {
  AdminApprovalModalInner,
  AdminApprovalModalInnerProps,
  handleOnApproveSuccess,
  handleOnDeclineSuccess,
  handleSetIsDeclineModal,
  handleSetIsApproveModal,
} from '../admin-approval-modal'

const mockState = {
  ...appState,
  auth: {
    loginType: 'DEVELOPER',
  },
} as ReduxState

const props: AdminApprovalModalInnerProps = {
  onApprovalClick: jest.fn(),
  onDeclineClick: jest.fn(),
}

describe('AdminRevisionModalInner', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot when ERROR true', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <AdminApprovalModalInner {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
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
