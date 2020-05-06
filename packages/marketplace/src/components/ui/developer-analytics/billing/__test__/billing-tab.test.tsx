import * as React from 'react'
import { shallow } from 'enzyme'

import { BillingTab } from '../billing-tab'

describe('BillingTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<BillingTab />)).toMatchSnapshot()
  })
})
