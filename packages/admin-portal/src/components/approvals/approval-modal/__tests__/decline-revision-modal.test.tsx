import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../../tests/react-testing'
import configureStore from 'redux-mock-store'

import {
  DeclineRevisionModal,
  DeclineRevisionModalProps,
  handleAfterClose,
  handleOnSubmit,
  onCancelButtonClick,
} from '../decline-revision-modal'
import appState from '@/reducers/__stubs__/app-state'
import { requestDeclineRevision } from '@/actions/revision-detail'

const props: DeclineRevisionModalProps = {
  onDeclineSuccess: jest.fn(),
  visible: true,
}

describe('DeclineRevisionModal', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should match a snapshot', () => {
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <DeclineRevisionModal {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleAfterClose', () => {
    it('should call afterClose', () => {
      const mockProps = {
        isSuccessed: false,
        onDeclineSuccess: jest.fn(),
        isLoading: false,
        afterClose: jest.fn(),
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.afterClose).toBeCalled()
    })
    it('should call onDeclineSuccess', () => {
      const mockProps = {
        isSuccessed: true,
        onDeclineSuccess: jest.fn(),
        isLoading: true,
        afterClose: jest.fn(),
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.onDeclineSuccess).toBeCalled()
    })

    it('handleOnSubmit', () => {
      const mockSetRejectionReason = jest.fn()
      const mockAppId = '123'
      const mockAppRevisionId = '123'
      const mockFormValues = {
        email: 'test@asd.com',
        name: 'test',
        rejectionReason: 'test',
      }
      const fn = handleOnSubmit(mockSetRejectionReason, spyDispatch, mockAppId, mockAppRevisionId)
      fn(mockFormValues)
      expect(mockSetRejectionReason).toBeCalled()
      expect(spyDispatch).toBeCalledWith(
        requestDeclineRevision({ appId: mockAppId, appRevisionId: mockAppRevisionId, ...mockFormValues }),
      )
    })
  })

  describe('onCancelButtonClick', () => {
    it('should run directly', () => {
      const mockAfterClose = jest.fn()
      const fn = onCancelButtonClick(mockAfterClose)
      fn()
      expect(mockAfterClose).toBeCalled()
    })
  })
})
