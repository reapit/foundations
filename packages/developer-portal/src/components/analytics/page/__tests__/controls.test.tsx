import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockInstallationModelPagedResult } from '../../../../tests/__stubs__/installations'
import { defaultAnalyticsFilterState } from '../../state/defaults'
import { Controls, handleFormChange } from '../controls'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(),
}))
jest.mock('../../state/use-analytics-state')

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Controls', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValueOnce([mockInstallationModelPagedResult])

    expect(render(<Controls />)).toMatchSnapshot()
  })
})

describe('handleFormChange', () => {
  it('should handle selecting a chip', () => {
    const setAnalyticsFilterState = jest.fn()
    const values = defaultAnalyticsFilterState
    const curried = handleFormChange(setAnalyticsFilterState)

    curried(values)

    expect(setAnalyticsFilterState).toHaveBeenCalledWith(values)
  })
})
