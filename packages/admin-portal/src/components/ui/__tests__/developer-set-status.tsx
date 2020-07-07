import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import {
  SetDeveloperStatusModal,
  SetDeveloperStatusProps,
  onAfterCloseHandler,
  onSuccessHandler,
  onConfirmButtonClick,
} from '../developer-set-status'
import { developerSetStatusSetInitFormState, developerSetStatusRequest } from '@/actions/developer-set-status'
import { developerStub } from '@/sagas/__stubs__/developer'

const props: SetDeveloperStatusProps = {
  developer: { id: '', isInactive: false },
  onSuccess: () => jest.fn(),
  visible: true,
}

describe('SetDeveloperStatusModal', () => {
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
        <SetDeveloperStatusModal {...props} />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('onAfterCloseHandler', () => {
    it('should return a function when executing', () => {
      const mockAfterClose = jest.fn()

      const onAfterCloseHandlerFn = onAfterCloseHandler(false, mockAfterClose)
      expect(onAfterCloseHandlerFn).toBeDefined()

      onAfterCloseHandlerFn()
      expect(mockAfterClose).toBeCalled()
    })
  })

  describe('onSuccessHandler', () => {
    it('should return a function when executing', () => {
      const mockOnSuccess = jest.fn()
      const onSuccessHandlerFn = onSuccessHandler(mockOnSuccess, spyDispatch)
      expect(onSuccessHandlerFn).toBeDefined()

      onSuccessHandlerFn()
      expect(mockOnSuccess).toBeCalled()
      expect(spyDispatch).toBeCalledWith(developerSetStatusSetInitFormState())
    })
  })

  describe('onConfirmButtonClick', () => {
    it('should run correctly', () => {
      const mockIsInactive = false
      const fn = onConfirmButtonClick(developerStub, spyDispatch, mockIsInactive)
      fn()
      expect(spyDispatch).toBeCalledWith(developerSetStatusRequest({ ...developerStub, isInactive: !mockIsInactive }))
    })
  })
})
