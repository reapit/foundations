import React from 'react'
import { FilterForm } from '../filter-form'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { mockInstallationModelPagedResult } from '../../../tests/__stubs__/installations'

describe('FilterForm', () => {
  it('should render component with no data', () => {
    expect(render(<FilterForm setUsageFilters={jest.fn()} apps={null} installations={null} />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    expect(
      render(
        <FilterForm
          setUsageFilters={jest.fn()}
          apps={mockAppSummaryModelPagedResult}
          installations={mockInstallationModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })
})
