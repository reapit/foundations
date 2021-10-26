import React from 'react'
import { SPECIFIC_OFFICE_GROUPS, WHOLE_ORG } from '../app-installation-manager'
import { AppInstallationSection, handleModalOpen, handleOnCheckboxChange } from '../app-installation-section'
import { render } from '@testing-library/react'
import { mockInstallationsList } from '../../../../services/__stubs__/installations'

jest.mock('../../../../utils/use-org-id')

describe('AppInstallationSection', () => {
  it('should match a snapshot when WHOLE_ORG is selected', () => {
    const stubInstallations = mockInstallationsList.data ?? []
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = render(
      <AppInstallationSection
        initialAppInstallationType={WHOLE_ORG}
        appInstallationType={WHOLE_ORG}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={['SBOX']}
        officeGroupsToRemove={['SBOX-GWIT', 'SBOX-OTHER']}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={false}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when SPECIFIC_OFFICE_GROUPS is selected', () => {
    const stubInstallations = mockInstallationsList.data ?? []
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = render(
      <AppInstallationSection
        initialAppInstallationType={SPECIFIC_OFFICE_GROUPS}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={['SBOX']}
        officeGroupsToRemove={['SBOX-GWIT', 'SBOX-OTHER']}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={true}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleOnCheckboxChange', () => {
  it('should set the checkbox', () => {
    const installType = SPECIFIC_OFFICE_GROUPS
    const onCheckboxChange = jest.fn()
    const curried = handleOnCheckboxChange(installType, onCheckboxChange)

    curried()

    expect(onCheckboxChange).toHaveBeenCalledWith(SPECIFIC_OFFICE_GROUPS)
  })
})

describe('handleModalOpen', () => {
  it('should set the checkbox', () => {
    const isOpen = true
    const setShowConfirmModal = jest.fn()
    const curried = handleModalOpen(isOpen, setShowConfirmModal)

    curried()

    expect(setShowConfirmModal).toHaveBeenCalledWith(isOpen)
  })
})
