import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  ApproveRevisionModal,
  ApproveRevisionModalProps,
  handleAfterClose,
  handleOnSubmit,
} from '../approve-revision-modal'
import appState from '@/reducers/__stubs__/app-state'
import { approveRevision } from '@/actions/revision-detail'

const props: ApproveRevisionModalProps = {
  onApproveSuccess: jest.fn(),
  visible: true,
}

describe('ApproveRevisionModal', () => {
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
          <ApproveRevisionModal {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleAfterClose', () => {
    it('should call onApproveSuccess correctly', () => {
      const mockProps = {
        isSuccessed: true,
        onApproveSuccess: jest.fn(),
        isLoading: true,
        afterClose: jest.fn(),
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.onApproveSuccess).toBeCalled()
    })
    it('should call onApproveSuccess correctly', () => {
      const mockProps = {
        isSuccessed: false,
        onApproveSuccess: jest.fn(),
        isLoading: false,
        afterClose: jest.fn(),
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.afterClose).toBeCalled()
    })
  })

  describe('handleOnSubmit', () => {
    it('should call submitApproveRevision', () => {
      const mockAppId = 'test'
      const mockAppRevisionId = 'test'
      const mockFormValues = {
        email: 'test@test.com',
        name: 'test',
      }
      const fn = handleOnSubmit(spyDispatch, mockAppId, mockAppRevisionId)
      fn(mockFormValues)
      expect(spyDispatch).toBeCalledWith(
        approveRevision({ appId: mockAppId, appRevisionId: mockAppRevisionId, ...mockFormValues }),
      )
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
