import * as React from 'react'
import { shallow } from 'enzyme'
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

    const wrapper = shallow(
      <AppInstallationPerOfficeGroup
        installations={stubInstallations}
        setOfficeGroupsToAdd={addOfficeGroupStub}
        setOfficeGroupsToRemove={removeOfficeGroupStub}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
