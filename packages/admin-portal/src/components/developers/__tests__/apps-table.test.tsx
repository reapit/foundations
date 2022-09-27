import React from 'react'
import { AppsTable } from '../apps-table'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { useReapitGet } from '@reapit/utils-react'

jest.mock('@reapit/utils-react', () => ({
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  objectToQuery: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsTable', () => {
  it('should render component with no apps and not loading', () => {
    expect(render(<AppsTable devIdApps="MOCK_ID" />)).toMatchSnapshot()
  })

  it('should render component with no apps and loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<AppsTable devIdApps="MOCK_ID" />)).toMatchSnapshot()
  })

  it('should render component with apps', () => {
    mockUseReapitGet.mockReturnValue([mockAppSummaryModelPagedResult, false])
    expect(render(<AppsTable devIdApps="MOCK_ID" />)).toMatchSnapshot()
  })
})
