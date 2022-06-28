import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { FilteredAppsCollection } from '../filtered-apps'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{}, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('FilteredAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<FilteredAppsCollection />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<FilteredAppsCollection />)).toMatchSnapshot()
  })
})
