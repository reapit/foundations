import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  AppInstallationsModal,
  handleAfterClose,
  handleUninstall,
  AppInstallationsModalProps
} from '../app-installations-modal'
import { installationStub } from '@/sagas/__stubs__/installation'

const props: AppInstallationsModalProps = {
  appId: '1',
  appName: '1',
  visible: true,
  afterClose: jest.fn(),
  onUninstallSuccess: jest.fn()
}

describe('AppInstallationsModal', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppInstallationsModal {...props} />))).toMatchSnapshot()
  })
  describe('handleAfterClose have afterClose', () => {
    it('should run correctly', () => {
      const afterClose = jest.fn()
      const setUninstallApp = jest.fn()
      handleAfterClose({ setUninstallApp, afterClose })()
      expect(afterClose).toBeCalled()
      expect(setUninstallApp).toBeCalled()
    })
  })
  describe('handleUninstall', () => {
    it('should run correctly', () => {
      const setUninstallApp = jest.fn()
      handleUninstall(setUninstallApp(installationStub))(installationStub)
      expect(setUninstallApp).toBeCalled()
    })
  })
})
