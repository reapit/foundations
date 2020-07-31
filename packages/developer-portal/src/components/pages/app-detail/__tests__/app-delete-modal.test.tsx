import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import {
  DeleteAppModal,
  AppDeleteProps,
  handleAfterClose,
  onDeleteButtonClick,
  handleDeleteAppSuccessCallback,
} from '../app-delete-modal'
import { deleteApp } from '@/actions/apps'

const mockProps: AppDeleteProps = {
  appId: 'test',
  appName: 'test',
  onDeleteSuccess: jest.fn(),
  visible: true,
  afterClose: jest.fn(),
  closeModal: jest.fn(),
}

describe('app-delete', () => {
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
        <DeleteAppModal {...mockProps} />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleAfterClose', () => {
    it('should call onDeleteSuccess', () => {
      const mockProps = {
        isSuccedded: true,
        onDeleteSuccess: jest.fn(),
        isLoading: true,
        afterClose: jest.fn(),
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.onDeleteSuccess).toBeCalled()
    })

    it('should call afterClose', () => {
      const mockProps = {
        isSuccedded: false,
        onDeleteSuccess: jest.fn(),
        isLoading: false,
        afterClose: jest.fn(),
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.afterClose).toBeCalled()
    })
  })

  describe('onDeleteButtonClick', () => {
    it('should run correctly', () => {
      const fn = onDeleteButtonClick(mockProps.appId, spyDispatch, jest.fn())
      fn()
      expect(spyDispatch).toBeCalledWith(
        deleteApp({
          id: mockProps.appId,
          successCallback: expect.any(Function),
        }),
      )
    })
  })

  describe('handleDeleteAppSuccessCallback', () => {
    it('should run correctly', () => {
      const mockSetIsSuccedded = jest.fn()
      const fn = handleDeleteAppSuccessCallback(mockSetIsSuccedded)
      fn()
      expect(mockSetIsSuccedded).toBeCalledWith(true)
    })
  })
})
