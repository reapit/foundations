import React from 'react'
import { FilterForm } from '../filter-form'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { render } from '../../../tests/react-testing'

describe('FilterForm', () => {
  it('should render component with no apps', () => {
    expect(render(<FilterForm setAppsFilters={jest.fn()} apps={null} />)).toMatchSnapshot()
  })

  it('should render component with apps', () => {
    expect(render(<FilterForm setAppsFilters={jest.fn()} apps={mockAppSummaryModelPagedResult} />)).toMatchSnapshot()
  })
})
