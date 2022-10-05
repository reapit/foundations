import React from 'react'
import { FilterForm } from '../filter-form'
import { render } from '../../../tests/react-testing'

describe('FilterForm', () => {
  it('should render component', () => {
    expect(render(<FilterForm setInstallationsFilters={jest.fn()} />)).toMatchSnapshot()
  })
})
