import React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { DeleteAppModal, AppDeleteProps, handleAfterClose, onDeleteButtonClick, handleUseEffect } from '../app-delete'
import { requestDeleteApp } from '@/actions/app-delete'
import { setDeleteAppInitFormState } from '@/actions/app-delete'

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

  test('handleUseEffect should run correctly', () => {
    const dispatch = jest.fn()
    handleUseEffect(dispatch)()
    expect(dispatch).toHaveBeenCalledWith(setDeleteAppInitFormState())
  })

  it('should match snapshot', () => {
    const wrapper = render(
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
      const fn = onDeleteButtonClick(mockProps.appId, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(requestDeleteApp(mockProps.appId))
    })
  })
})
