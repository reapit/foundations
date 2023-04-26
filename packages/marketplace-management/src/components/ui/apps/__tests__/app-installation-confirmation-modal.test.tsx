import * as React from 'react'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS } from '../app-installation-manager'
import AppInstallationConfirmationModal from '../app-installation-confirmation-modal'
import { render } from '../../../../tests/react-testing'

describe('AppInstallationConfirmationModal', () => {
  it('should match a snapshot when the install type is WHOLE_ORG', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    expect(
      render(
        <AppInstallationConfirmationModal
          app={stubApp}
          installFor={[]}
          uninstallFor={[]}
          appInstallationType={WHOLE_ORG}
          onConfirm={stubOnConfirm}
          onClose={stubOnClose}
          performCompleteUninstall={false}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when the install type is SPECIFIC_OFFICE_GROUPS', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    expect(
      render(
        <AppInstallationConfirmationModal
          app={stubApp}
          installFor={['SBOX-TEST']}
          uninstallFor={['SBOX-GWIT']}
          appInstallationType={SPECIFIC_OFFICE_GROUPS}
          onConfirm={stubOnConfirm}
          onClose={stubOnClose}
          performCompleteUninstall={false}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when an uninstallation is requested', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    expect(
      render(
        <AppInstallationConfirmationModal
          app={stubApp}
          installFor={[]}
          uninstallFor={['']}
          appInstallationType={SPECIFIC_OFFICE_GROUPS}
          onConfirm={stubOnConfirm}
          onClose={stubOnClose}
          performCompleteUninstall={true}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should call the spy when a modal is closed', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = render(
      <AppInstallationConfirmationModal
        app={stubApp}
        installFor={[]}
        uninstallFor={['']}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={true}
      />,
    )

    wrapper.getByText('Cancel').click()

    expect(stubOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call the spy when a confirm button is clicked', () => {
    const stubApp = {
      name: 'TEST APP',
    }
    const stubOnConfirm = jest.fn()
    const stubOnClose = jest.fn()

    const wrapper = render(
      <AppInstallationConfirmationModal
        app={stubApp}
        installFor={[]}
        uninstallFor={['']}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onConfirm={stubOnConfirm}
        onClose={stubOnClose}
        performCompleteUninstall={true}
      />,
    )
    wrapper.getByText('Confirm').click()

    expect(stubOnConfirm).toHaveBeenCalledTimes(1)
  })
})
