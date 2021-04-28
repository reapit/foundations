import * as React from 'react'
import { shallow } from 'enzyme'
import OfficeListCell from '../office-list-cell'
import { data as officesStub } from '../__stubs__/offices'

describe('OfficeListCell', () => {
  it('should match a snapshot', () => {
    const cellProps = {
      value: officesStub._embedded ?? [],
    }
    expect(shallow(<OfficeListCell cell={cellProps} />)).toMatchSnapshot()
  })
})
