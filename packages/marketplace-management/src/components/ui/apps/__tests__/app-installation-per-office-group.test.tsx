import React, { ChangeEvent } from 'react'
import { render } from '@testing-library/react'
import AppInstallationPerOfficeGroup, {
  handleOnChange,
  handleSetOfficeGroupToggleType,
} from '../app-installation-per-office-group'
import { mockInstallationsList } from '../../../../services/__stubs__/installations'
import { mockOfficeGroups } from '../../../../services/__stubs__/office-groups'

jest.mock('swr', () =>
  jest.fn(() => ({
    data: mockOfficeGroups,
  })),
)

jest.mock('../../../../utils/use-org-id')

describe('AppInstallationPerOfficeGroup', () => {
  it('should match a snapshot', () => {
    const installations = mockInstallationsList.data ?? []
    const addOfficeGroupStub = jest.fn()
    const removeOfficeGroupStub = jest.fn()

    expect(
      render(
        <AppInstallationPerOfficeGroup
          installations={installations}
          setOfficeGroupsToAdd={addOfficeGroupStub}
          setOfficeGroupsToRemove={removeOfficeGroupStub}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleOnChange', () => {
  it('should set office groups to add and remove', () => {
    const officeGroups = mockOfficeGroups?._embedded ?? []
    const installations = mockInstallationsList.data ?? []
    const setOfficeGroupsToAdd = jest.fn()
    const setOfficeGroupsToRemove = jest.fn()
    const event = {
      target: {
        value: 'SBOX',
      },
    } as ChangeEvent<HTMLInputElement>

    const curried = handleOnChange(officeGroups, installations, setOfficeGroupsToAdd, setOfficeGroupsToRemove)

    curried(event)

    expect(setOfficeGroupsToAdd).toHaveBeenCalledWith(['SBOX'])
    expect(setOfficeGroupsToRemove).toHaveBeenCalledWith([])
  })
})

describe('handleSetOfficeGroupToggleType', () => {
  it('should set office groups to add and remove', () => {
    const officeGroupToggleType = 'all'
    const setOfficeGroupToggleType = jest.fn()

    const curried = handleSetOfficeGroupToggleType(officeGroupToggleType, setOfficeGroupToggleType)

    curried()

    expect(setOfficeGroupToggleType).toHaveBeenCalledWith('all')
  })
})
