import * as React from 'react'
import { mount } from 'enzyme'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS } from '../app-installation-manager'
import AppInstallationConfirmationModal from '../app-installation-confirmation-modal'
import { Button } from '@reapit/elements'

describe('AppInstallationConfirmationModal', () => {
  it('should match a snapshot when the install type is WHOLE_ORG', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = mount(
      <AppInstallationConfirmationModal
        app={stubApp}
        visible={true}
        installFor={[]}
        uninstallFor={[]}
        appInstallationType={WHOLE_ORG}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={false}
      />,
    )
    expect(wrapper.find('[data-test="modal-content"]')).toMatchSnapshot()
  })

  it('should match a snapshot when the install type is SPECIFIC_OFFICE_GROUPS', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = mount(
      <AppInstallationConfirmationModal
        app={stubApp}
        visible={true}
        installFor={['SBOX-TEST']}
        uninstallFor={['SBOX-GWIT']}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={false}
      />,
    )
    expect(wrapper.find('[data-test="modal-content"]')).toMatchSnapshot()
  })

  it('should match a snapshot when an uninstallation is requested', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = mount(
      <AppInstallationConfirmationModal
        app={stubApp}
        visible={true}
        installFor={[]}
        uninstallFor={['']}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={true}
      />,
    )
    expect(wrapper.find('[data-test="modal-content"]')).toMatchSnapshot()
  })

  it('should call the spy when a modal is closed', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = mount(
      <AppInstallationConfirmationModal
        app={stubApp}
        visible={true}
        installFor={[]}
        uninstallFor={['']}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={true}
      />,
    )
    const cancelButton = wrapper.find(Button).first()
    cancelButton.simulate('click')
    expect(stubOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call the spy when a confirm button is clicked', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = mount(
      <AppInstallationConfirmationModal
        app={stubApp}
        visible={true}
        installFor={[]}
        uninstallFor={['']}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={true}
      />,
    )
    const confirmButton = wrapper.find(Button).at(1)
    confirmButton.simulate('click')
    expect(stubOnConfirm).toHaveBeenCalledTimes(1)
  })
})
