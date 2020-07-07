import * as React from 'react'
import { shallow } from 'enzyme'
import AdminBilling from '../admin-billing'

describe('AdminBilling', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<AdminBilling />)).toMatchSnapshot()
  })
})
