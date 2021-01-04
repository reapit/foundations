import React from 'react'
import { shallow } from 'enzyme'
import OfficeTabFilterForm, { OfficesFormProps } from '../offices-tab-filter'

const filterProps = (): OfficesFormProps => ({
  filterValues: {
    name: 'Office Name',
  },
  onSearch: jest.fn(),
})

describe('OfficeTabFilterForm', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficeTabFilterForm {...filterProps()} />)).toMatchSnapshot()
  })
})
