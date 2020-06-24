import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { errorClearedComponent, errorClearedServer } from '@/actions/error'
import Toast, { handleErrorClearedComponentCallback, handleErrorClearedServerCallback } from '../toast'

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
        <Toast />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleErrorClearedComponentCallback', () => {
    it('should run correctly', () => {
      const fn = handleErrorClearedComponentCallback(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(errorClearedComponent(null))
    })
  })

  describe('errorClearedServer', () => {
    it('should run correctly', () => {
      const fn = handleErrorClearedServerCallback(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(errorClearedServer(null))
    })
  })
})
