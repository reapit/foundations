import React from 'react'
import { FilterForm } from '../filter-form'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { render } from '../../../tests/react-testing'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockCategoryModelPagedResult } from '../../../tests/__stubs__/categories'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, true, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('FilterForm', () => {
  it('should render component with no apps or categories', () => {
    expect(render(<FilterForm setAppsFilters={jest.fn()} apps={null} />)).toMatchSnapshot()
  })

  it('should render component with apps and categories', () => {
    mockUseReapitGet.mockReturnValueOnce([mockCategoryModelPagedResult, false, null, jest.fn()])
    expect(render(<FilterForm setAppsFilters={jest.fn()} apps={mockAppSummaryModelPagedResult} />)).toMatchSnapshot()
  })
})
