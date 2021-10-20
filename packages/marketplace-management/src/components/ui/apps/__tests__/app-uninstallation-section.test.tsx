import * as React from 'react'
import { mount } from 'enzyme'
import AppUninstallationSection from '../app-uninstallation-section'
import { Button } from '@reapit/elements'

describe('AppUninstallationSection', () => {
  it('should match a snapshot when theres no installations', () => {
    const stubInstallations = {
      data: [],
    }
    const stubClientId = 'SBOX-GWIT'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      mount(
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
    const stubInstallations = {
      data: [
        {
          client: 'SBOX',
        },
      ],
    }
    const stubClientId = 'SBOX-GWIT'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      mount(
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
    const stubInstallations = {
      data: [
        {
          client: 'SBOX-GWIT',
        },
      ],
    }
    const stubClientId = 'SBOX-TEST'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      mount(
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
    const stubInstallations = {
      data: [
        {
          client: 'SBOX-GWIT',
        },
        {
          client: 'SBOX-ABCT',
        },
      ],
    }
    const stubClientId = 'SBOX-TEST'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    expect(
      mount(
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
    const stubInstallations = {
      data: [
        {
          client: 'SBOX',
        },
      ],
    }
    const stubClientId = 'SBOX-TEST'
    const stubShowModal = jest.fn()
    const stubSetPerformCompleteUninstall = jest.fn()

    const wrapper = mount(
      <AppUninstallationSection
        installations={stubInstallations}
        clientId={stubClientId}
        setShowConfirmModal={stubShowModal}
        setPerformCompleteUninstall={stubSetPerformCompleteUninstall}
      />,
    )

    wrapper.find(Button).first().simulate('click')

    expect(stubShowModal).toHaveBeenCalledTimes(1)
    expect(stubSetPerformCompleteUninstall).toHaveBeenCalledTimes(1)
  })
})
