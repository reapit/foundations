import React, { ChangeEvent } from 'react'
import { AppsSupportPage, handleSearch } from '../index'
import { render } from '../../../tests/react-testing'
import { useReapitGet } from '@reapit/utils-react'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/utils-react', () => ({
  ...jest.requireActual('@reapit/utils-react'),
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

    const curried = handleSearch(setSearch)

    curried(event)

    expect(setSearch).toHaveBeenCalledWith(event.target.value.toLowerCase())
  })
})
