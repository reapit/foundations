import * as React from 'react'
import { mount } from 'enzyme'
import AppInstallationPerOfficeGroup from '../app-installation-per-office-group'

jest.mock('swr', () =>
  jest.fn(() => ({
    data: { name: 'Reapit' },
  })),
)

describe('AppInstallationPerOfficeGroup', () => {
  it('should match a snapshot', () => {
    const stubInstallations = {
      data: [],
    }
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()

    const wrapper = mount(
      <AppInstallationPerOfficeGroup
        installations={stubInstallations}
        officeGroupsToAdd={[]}
        officeGroupsToRemove={[]}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
