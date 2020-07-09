import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { hideNotificationMessage } from '@/actions/notification-message'
import ToastMessage, { handleOnCloseToast } from '../toast-message'

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
        <ToastMessage />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleOnCloseToast', () => {
    it('should run correctly', () => {
      const fn = handleOnCloseToast(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(hideNotificationMessage(null))
    })
  })
})
