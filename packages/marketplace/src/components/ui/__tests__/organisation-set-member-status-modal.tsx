import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import SetMemberStatusModal, {
  SetMemberStatusModalProps,
  handleSetMemberStatus,
  handleSetMemberStatusSuccess,
} from '../organisation-set-member-status-modal'
import { developerSetStatusSetInitFormState, developerSetStatusRequest } from '@/actions/developer-set-status'
import { developerStub } from '@/sagas/__stubs__/developer'

const props: SetMemberStatusModalProps = {
  developer: { id: '', isInactive: false },
  onSuccess: () => jest.fn(),
  onCancel: () => jest.fn(),
  visible: true,
}

describe('SetMemberStatusModal', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match snapshot', () => {
    const wrapper = mount(
      <ReactRedux.Provider store={store}>
        <SetMemberStatusModal {...props} />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleSetMemberStatusSuccess', () => {
    it('should return a function when executing', () => {
      const mockOnSuccess = jest.fn()
      const onSuccessHandlerFn = handleSetMemberStatusSuccess(mockOnSuccess, spyDispatch)
      expect(onSuccessHandlerFn).toBeDefined()

      onSuccessHandlerFn()
      expect(mockOnSuccess).toBeCalled()
      expect(spyDispatch).toBeCalledWith(developerSetStatusSetInitFormState())
    })
  })

  describe('handleSetMemberStatus', () => {
    it('should run correctly', () => {
      const fn = handleSetMemberStatus(developerStub, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(
        developerSetStatusRequest({ ...developerStub, isInactive: !developerStub.isInactive }),
      )
    })
  })
})
