import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { DeveloperAppsCollection } from '../developer-apps-collection'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockAppSummaryModelPagedResult, false]),
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
