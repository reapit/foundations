import React, { ChangeEvent } from 'react'
import { AppsSupportPage, handleSearch } from '../index'
import { render } from '../../../tests/react-testing'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'

jest.mock('../../../core/analytics')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsSupportPage', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValue([{ ...mockAppSummaryModelPagedResult }])

    expect(render(<AppsSupportPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])

    expect(render(<AppsSupportPage />)).toMatchSnapshot()
  })
})

describe('handleSearch', () => {
  it('should handle setting search', () => {
    const setSearch = jest.fn()
    const event = {
      target: {
        value: 'MOCK_SEARCH',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const search = event.target.value.toLowerCase()

    const curried = handleSearch(setSearch)

    curried(event)

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.SearchSupport, true, { searchTerm: search })
    expect(setSearch).toHaveBeenCalledWith(search)
  })
})
