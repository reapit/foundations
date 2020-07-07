import React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import AppConfirmUninstall, {
  AppConfirmUninstallProps,
  handleUninstallSuccess,
  generateUninstallParams,
  onAgreeButtonClick,
  onDisagreeButtonClick,
} from '../app-confirm-uninstall'
import appState from '@/reducers/__stubs__/app-state'
import { setAppDetailModalStateSuccess, setAppDetailModalStateBrowse } from '@/actions/app-detail-modal'
import { UninstallParams, appInstallationsRequestUninstall } from '@/actions/app-installations'
import { setAppDetailStale } from '@/actions/app-detail'

const mockProps: AppConfirmUninstallProps = {
  afterClose: jest.fn(),
}

describe('AppConfirmUninstall', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('render correctly', () => {
    const wrapper = mount(
      <ReactRedux.Provider store={store}>
        <AppConfirmUninstall {...mockProps} />
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleUninstallSuccess', () => {
    it('should dispatch setAppDetailModalStateSuccess', () => {
      const fn = handleUninstallSuccess(true, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(setAppDetailModalStateSuccess())
      spyDispatch.mockClear()
    })
  })

  describe('handleUninstallSuccess', () => {
    it('should not dispatch setAppDetailModalStateSuccess', () => {
      const fn = handleUninstallSuccess(false, spyDispatch)
      fn()
      expect(spyDispatch).not.toBeCalled()
    })
  })

  describe('generateUninstallParams', () => {
    it('should run correctly', () => {
      const fn = generateUninstallParams({
        id: 'testId',
        installationId: 'testInstallation',
      })
      const result: UninstallParams = fn()
      const expectedResult: UninstallParams = {
        appId: result.appId,
        installationId: result.installationId,
        terminatedReason: 'User uninstall',
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('onAgreeButtonClick', () => {
    it('should run correctly', () => {
      const mockUninstallParams: UninstallParams = {
        appId: 'test',
        installationId: 'test',
      }
      const fn = onAgreeButtonClick(mockUninstallParams, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(appInstallationsRequestUninstall(mockUninstallParams))
      expect(spyDispatch).toBeCalledWith(setAppDetailStale(true))
      spyDispatch.mockClear()
    })
  })

  describe('onDisagreeButtonClick', () => {
    it('should call mockAfterClose and dispatch setAppDetailModalStateBrowse', () => {
      const mockAfterClose = jest.fn()
      const fn = onDisagreeButtonClick(spyDispatch, mockAfterClose)
      fn()
      expect(mockAfterClose).toBeCalled()
      expect(spyDispatch).toBeCalledWith(setAppDetailModalStateBrowse())
      spyDispatch.mockClear()
    })
  })

  describe('onDisagreeButtonClick', () => {
    it('should only dispatch setAppDetailModalStateBrowse', () => {
      const fn = onDisagreeButtonClick(spyDispatch, undefined)
      fn()
      expect(spyDispatch).toBeCalledWith(setAppDetailModalStateBrowse())
      spyDispatch.mockClear()
    })
  })
})
