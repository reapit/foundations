import React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import SetMemberStatusModal, {
  DisableMemberModalProps,
  handleDisableMember,
  handleDisableMemberSuccess,
} from '../disable-member-modal'

const props: DisableMemberModalProps = {
  member: { id: 'SomeID', developerId: 'SomeID' },
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
    const wrapper = render(
      <ReactRedux.Provider store={store}>
        <SetMemberStatusModal {...props} />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleDisableMemberSuccess', () => {
    it('should return a function when executing', () => {
      const mockOnSuccess = jest.fn()
      const mocksetSuccess = jest.fn()
      const onSuccessHandlerFn = handleDisableMemberSuccess(mockOnSuccess, mocksetSuccess)
      expect(onSuccessHandlerFn).toBeDefined()

      onSuccessHandlerFn()
      expect(mockOnSuccess).toBeCalled()
      expect(mocksetSuccess).toBeCalledWith(false)
    })
  })

  describe('handleDisableMember', () => {
    it('should run correctly', () => {
      const developerId = '123'
      const memberId = '456'
      const setSuccess = jest.fn()
      const fn = handleDisableMember(developerId, memberId, spyDispatch, setSuccess)
      fn()
      expect(spyDispatch).toBeCalled()
    })
  })
})
