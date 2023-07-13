import React from 'react'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import {
  handleRefreshApps,
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
  it('should match a snapshot with apps', () => {
    expect(
      render(
        <ToggleConsumption appIdConsumption="MOCK_ID" apps={mockAppSummaryModelPagedResult} appsRefresh={jest.fn()} />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with no apps', () => {
    expect(
      render(<ToggleConsumption appIdConsumption="MOCK_ID" apps={null} appsRefresh={jest.fn()} />),
    ).toMatchSnapshot()
  })
})

describe('handleToggleConsumption', () => {
  it('handleToggleConsumption should correctly toggle an app consumtion charge', () => {
    const updateApp = jest.fn()
    const formValues = { fixedApiConsumptionCost: 'FREE' } as ToggleConsumptionForm

    const curried = handleToggleConsumption(updateApp)

    curried(formValues)

    expect(updateApp).toHaveBeenCalledWith({ fixedApiConsumptionCost: 0 })
  })
})

describe('handleRefreshApps', () => {
  it('handleRefreshApps should correctly refresh featured apps', () => {
    const appsRefresh = jest.fn()
    const shouldRefresh = true

    const curried = handleRefreshApps(appsRefresh, shouldRefresh)

    curried()

    expect(appsRefresh).toHaveBeenCalledTimes(1)
  })
})
