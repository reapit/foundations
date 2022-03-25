import { useReapitGet } from '@reapit/utils-react'
import React, { ChangeEvent } from 'react'
import { render } from '../../../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../../../tests/__stubs__/apps'
import { mockInstallationModelPagedResult } from '../../../../../tests/__stubs__/installations'
import { defaultAnalyticsFilterState } from '../../state/defaults'
import { Controls, handleFormChange, handleOnChipChange } from '../controls'

jest.mock('@reapit/utils-react')
jest.mock('../../state/use-analytics-state')

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Controls', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockAppSummaryModelPagedResult])
      .mockReturnValueOnce([mockInstallationModelPagedResult])

    expect(render(<Controls />)).toMatchSnapshot()
  })
})

describe('handleOnChipChange', () => {
  it('should handle selecting a chip', () => {
    const setAnalyticsFilterState = jest.fn()
    const event = {
      target: {
        value: 'week',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const curried = handleOnChipChange(setAnalyticsFilterState)

    curried(event)

    expect(setAnalyticsFilterState.mock.calls[0][0]({ dateRange: 'day' })).toEqual({
      dateRange: 'week',
    })
  })

  it('should handle deselecting a chip', () => {
    const setAnalyticsFilterState = jest.fn()
    const event = {
      target: {
        value: 'week',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const curried = handleOnChipChange(setAnalyticsFilterState)

    curried(event)

    expect(setAnalyticsFilterState.mock.calls[0][0]({ dateRange: 'week' })).toEqual({
      dateRange: null,
    })
  })
})

describe('handleFormChange', () => {
  it('should handle selecting a chip', () => {
    const setAnalyticsFilterState = jest.fn()
    const values = defaultAnalyticsFilterState
    const curried = handleFormChange(setAnalyticsFilterState)

    curried(values)

    expect(setAnalyticsFilterState.mock.calls[0][0]({ dateRange: 'day' })).toEqual({
      ...values,
      dateRange: 'day',
    })
  })
})
