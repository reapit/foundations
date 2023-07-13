import React from 'react'
import { mockInstallationModelPagedResult } from '../../../tests/__stubs__/installations'
import {
  handleRefreshInstallations,
  handleToggleConsumption,
  ToggleConsumption,
  ToggleConsumptionForm,
} from '../toggle-consumption'
import { render } from '../../../tests/react-testing'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn(), false]),
}))

describe('ToggleConsumption', () => {
  it('should match a snapshot with installations', () => {
    expect(
      render(
        <ToggleConsumption
          installIdConsumption="MOCK_ID"
          installations={mockInstallationModelPagedResult}
          installationsRefresh={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with no installations', () => {
    expect(
      render(
        <ToggleConsumption installIdConsumption="MOCK_ID" installations={null} installationsRefresh={jest.fn()} />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleToggleConsumption', () => {
  it('handleToggleConsumption should correctly toggle an installation consumtion charge', () => {
    const updateApp = jest.fn()
    const formValues = { fixedApiConsumptionCost: 'FREE' } as ToggleConsumptionForm

    const curried = handleToggleConsumption(updateApp)

    curried(formValues)

    expect(updateApp).toHaveBeenCalledWith({ fixedApiConsumptionCost: 0 })
  })
})

describe('handleRefreshInstallations', () => {
  it('handleRefreshInstallations should correctly refresh featured installations', () => {
    const installationsRefresh = jest.fn()
    const shouldRefresh = true

    const curried = handleRefreshInstallations(installationsRefresh, shouldRefresh)

    curried()

    expect(installationsRefresh).toHaveBeenCalledTimes(1)
  })
})
