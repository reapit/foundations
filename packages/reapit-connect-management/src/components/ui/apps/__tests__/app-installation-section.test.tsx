import * as React from 'react'
import { mount } from 'enzyme'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS } from '../app-installation-manager'
import AppInstallationSection from '../app-installation-section'
import AppInstallationPerOfficeGroup from '../app-installation-per-office-group'
import { Button } from '@reapit/elements'

describe('AppInstallationSection', () => {
  it('should match a snapshot when WHOLE_ORG is selected', () => {
    const stubInstallations = {
      data: [],
    }
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = mount(
      <AppInstallationSection
        initialAppInstallationType={WHOLE_ORG}
        appInstallationType={WHOLE_ORG}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={[]}
        officeGroupsToRemove={[]}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={false}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should show a disabled button initially and then a non-disabled button when the appInstallationType is changed', () => {
    const stubInstallations = {
      data: [],
    }
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = mount(
      <AppInstallationSection
        initialAppInstallationType={SPECIFIC_OFFICE_GROUPS}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={[]}
        officeGroupsToRemove={[]}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={false}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(wrapper.findWhere(n => n.type() === Button && n.prop('variant') === 'primary').prop('disabled')).toBe(true)
    wrapper.setProps({ appInstallationType: WHOLE_ORG })
    expect(wrapper.findWhere(n => n.type() === Button && n.prop('variant') === 'primary').prop('disabled')).toBe(false)
  })

  it('should show the AppInstallationPerOfficeGroup component when required', () => {
    const stubInstallations = {
      data: [],
    }
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = mount(
      <AppInstallationSection
        initialAppInstallationType={SPECIFIC_OFFICE_GROUPS}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={[]}
        officeGroupsToRemove={[]}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={false}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(wrapper.find(AppInstallationPerOfficeGroup).length).toBe(1)
  })

  it('should show the AppInstallationPerOfficeGroup component when installations request is still validating', () => {
    const stubInstallations = {
      data: [],
    }
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = mount(
      <AppInstallationSection
        initialAppInstallationType={SPECIFIC_OFFICE_GROUPS}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={[]}
        officeGroupsToRemove={[]}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={true}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(wrapper.find(AppInstallationPerOfficeGroup).length).toBe(0)
  })

  it('should trigger the onCheckboxChangeSpy', () => {
    const stubInstallations = {
      data: [],
    }
    const onCheckboxChangeSpy = jest.fn()
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()
    const confirmModalSpy = jest.fn()

    const wrapper = mount(
      <AppInstallationSection
        initialAppInstallationType={SPECIFIC_OFFICE_GROUPS}
        appInstallationType={SPECIFIC_OFFICE_GROUPS}
        onCheckboxChange={onCheckboxChangeSpy}
        installations={stubInstallations}
        officeGroupsToAdd={[]}
        officeGroupsToRemove={[]}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
        installationsValidating={false}
        setShowConfirmModal={confirmModalSpy}
      />,
    )
    expect(onCheckboxChangeSpy).toHaveBeenCalledTimes(0)
    const checkbox = wrapper.find('input')
    checkbox.first().simulate('change')
    expect(onCheckboxChangeSpy).toHaveBeenCalledTimes(1)
    expect(onCheckboxChangeSpy).toHaveBeenCalledWith(WHOLE_ORG)
  })
})
