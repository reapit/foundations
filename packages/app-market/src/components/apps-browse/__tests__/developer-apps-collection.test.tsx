import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { DeveloperAppsCollection } from '../developer-apps-collection'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{}, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('DeveloperAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<DeveloperAppsCollection />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<DeveloperAppsCollection />)).toMatchSnapshot()
  })
})
