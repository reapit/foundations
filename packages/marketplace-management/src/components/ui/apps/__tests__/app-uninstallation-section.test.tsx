import * as React from 'react'
import AppUninstallationSection from '../app-uninstallation-section'
import { render } from '../../../../tests/react-testing'

describe('AppUninstallationSection', () => {
  it('should match a snapshot when theres no installations', () => {
    const stubInstallations = []
    const stubClientId = 'SBOX-GWIT'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      render(
        <AppUninstallationSection
          installations={stubInstallations}
          clientId={stubClientId}
          setShowConfirmModal={stubShowModal}
          setPerformCompleteUninstall={stubSetPerformCompleteUninstall}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot, for an all orgs installation', () => {
    const stubInstallations = [
      {
        client: 'SBOX',
      },
    ]
    const stubClientId = 'SBOX-GWIT'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      render(
        <AppUninstallationSection
          installations={stubInstallations}
          clientId={stubClientId}
          setShowConfirmModal={stubShowModal}
          setPerformCompleteUninstall={stubSetPerformCompleteUninstall}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot, for a group installation', () => {
    const stubInstallations = [
      {
        client: 'SBOX-GWIT',
      },
    ]
    const stubClientId = 'SBOX-TEST'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      render(
        <AppUninstallationSection
          installations={stubInstallations}
          clientId={stubClientId}
          setShowConfirmModal={stubShowModal}
          setPerformCompleteUninstall={stubSetPerformCompleteUninstall}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot, for multiple group installations', () => {
    const stubInstallations = [
      {
        client: 'SBOX-GWIT',
      },
      {
        client: 'SBOX-ABCT',
      },
    ]
    const stubClientId = 'SBOX-TEST'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      render(
        <AppUninstallationSection
          installations={stubInstallations}
          clientId={stubClientId}
          setShowConfirmModal={stubShowModal}
          setPerformCompleteUninstall={stubSetPerformCompleteUninstall}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should call the spys when the uninstall button is clicked', () => {
    const stubInstallations = [
      {
        client: 'SBOX',
      },
    ]
    const stubClientId = 'SBOX-TEST'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    const wrapper = render(
      <AppUninstallationSection
        installations={stubInstallations}
        clientId={stubClientId}
        setShowConfirmModal={stubShowModal}
        setPerformCompleteUninstall={stubSetPerformCompleteUninstall}
      />,
    )

    wrapper.getByText('Uninstall').click()

    expect(stubShowModal).toHaveBeenCalledTimes(1)
    expect(stubSetPerformCompleteUninstall).toHaveBeenCalledTimes(1)
  })
})
