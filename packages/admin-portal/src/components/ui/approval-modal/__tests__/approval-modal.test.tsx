import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import {
  ApprovalModalInner,
  ApprovalModalInnerProps,
  handleOnApproveSuccess,
  handleOnDeclineSuccess,
  handleSetIsDeclineModal,
  handleSetIsApproveModal,
} from '../approval-modal'

const props: ApprovalModalInnerProps = {
  onApprovalClick: jest.fn(),
  onDeclineClick: jest.fn(),
}

describe('AdminRevisionModalInner', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })
  it('should match a snapshot when ERROR true', () => {
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <ApprovalModalInner {...props} />
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
