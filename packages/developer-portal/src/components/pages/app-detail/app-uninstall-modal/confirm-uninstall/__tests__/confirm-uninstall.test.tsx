import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import ConfirmUninstall, { ConfirmUninstallProps, handleSuccessUninstall, handleSubmit } from '../confirm-uninstall'
import { installationStub } from '@/sagas/__stubs__/installation'
import {
  appInstallationsSetFormState,
  UninstallParams,
  appInstallationsRequestUninstall,
} from '@/actions/app-installations'
import { setAppDetailStale } from '@/actions/app-detail'

const props: ConfirmUninstallProps = {
  appName: '1',
  afterClose: jest.fn(),
  installationDetail: installationStub,
  onUninstallSuccess: jest.fn(),
}

describe('ConfirmUninstall', () => {
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
          <ConfirmUninstall {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleSuccessUninstall', () => {
    it('should run correctly', () => {
      const onUninstallSuccess = jest.fn()
      const isSetAppDetailStaleAfterUninstallSuccess = true
      const fn = handleSuccessUninstall(onUninstallSuccess, spyDispatch, isSetAppDetailStaleAfterUninstallSuccess)
      fn()
      expect(onUninstallSuccess).toBeCalled()
      expect(spyDispatch).toBeCalledWith(appInstallationsSetFormState('PENDING'))
      expect(spyDispatch).toBeCalledWith(setAppDetailStale(true))
      spyDispatch.mockClear()
    })
  })

  describe('handleSuccessUninstall', () => {
    it('should run correctly', () => {
      const onUninstallSuccess = jest.fn()
      const isSetAppDetailStaleAfterUninstallSuccess = false
      const fn = handleSuccessUninstall(onUninstallSuccess, spyDispatch, isSetAppDetailStaleAfterUninstallSuccess)
      fn()
      expect(onUninstallSuccess).toBeCalled()
      expect(spyDispatch).toBeCalledWith(appInstallationsSetFormState('PENDING'))
      expect(spyDispatch).not.toBeCalledWith(setAppDetailStale(true))
    })
  })

  describe('handleSubmit', () => {
    it('should run correctly', () => {
      const { id = '', appId = '' } = props.installationDetail || {}
      const formValues = {
        terminatedReason: 'testtttttt',
      }
      const fn = handleSubmit(spyDispatch, props.installationDetail)
      fn(formValues)
      const params: UninstallParams = {
        installationId: id,
        appId: appId,
        terminatedReason: formValues.terminatedReason,
      }
      expect(spyDispatch).toBeCalledWith(appInstallationsRequestUninstall(params))
    })
  })
})
