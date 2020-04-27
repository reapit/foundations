import * as React from 'react'
import { shallow } from 'enzyme'
import TransactionHistory from '../TransactionHistory'

describe('TransactionHistory', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TransactionHistory />)).toMatchSnapshot()
  })
})
