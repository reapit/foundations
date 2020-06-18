import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import AppConfirmInstallContent, {
  handleCloseModal,
  AppConfirmInstallContentProps,
  handleInstallSuccess,
  onConfirmButtonClick,
} from '../app-confirm-install'
import appState from '@/reducers/__stubs__/app-state'
import { setAppDetailModalStateBrowse, setAppDetailModalStateSuccess } from '@/actions/app-detail-modal'
import { appInstallationsRequestInstall } from '@/actions/app-installations'

const mockProps: AppConfirmInstallContentProps = {
  afterClose: jest.fn(),
}

describe('AppConfirmInstallContent', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <AppConfirmInstallContent {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleCloseModal', () => {
    it('should call afterClose and dispatch setAppDetailModalStateBrowse', () => {
      const afterClose = jest.fn()
      const fn = handleCloseModal(spyDispatch, afterClose)
      fn()
      expect(afterClose).toBeCalled()
      expect(spyDispatch).toBeCalledWith(setAppDetailModalStateBrowse())
      spyDispatch.mockClear()
    })
  })

  describe('handleInstallSuccess', () => {
    it('should dispatch setAppDetailModalStateSuccess', () => {
      const fn = handleInstallSuccess(true, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(setAppDetailModalStateSuccess())
      spyDispatch.mockClear()
    })
  })

  describe('handleInstallSuccess', () => {
    it('should not dispatch setAppDetailModalStateSuccess', () => {
      const fn = handleInstallSuccess(false, spyDispatch)
      fn()
      expect(spyDispatch).not.toBeCalledWith(setAppDetailModalStateSuccess())
      spyDispatch.mockClear()
    })
  })

  describe('onConfirmButtonClick', () => {
    it('should dispatch appInstallationsRequestInstall', () => {
      const fn = onConfirmButtonClick(spyDispatch, 'test')
      fn()
      expect(spyDispatch).toBeCalledWith(
        appInstallationsRequestInstall({
          appId: 'test',
        }),
      )
      spyDispatch.mockClear()
    })
  })

  describe('onConfirmButtonClick', () => {
    it('should not dispatch appInstallationsRequestInstall', () => {
      const fn = onConfirmButtonClick(spyDispatch, '')
      fn()
      expect(spyDispatch).not.toBeCalled()
    })
  })
})
