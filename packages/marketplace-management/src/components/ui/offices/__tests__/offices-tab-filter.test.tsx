import React from 'react'
import OfficeTabFilterForm, { OfficesFormProps } from '../offices-tab-filter'
import { render } from '@testing-library/react'

const filterProps = (): OfficesFormProps => ({
  filterValues: {
    name: 'Office Name',
  },
  onSearch: jest.fn(),
})

describe('OfficeTabFilterForm', () => {
  it('should match a snapshot', () => {
    expect(render(<OfficeTabFilterForm {...filterProps()} />)).toMatchSnapshot()
  })
})
