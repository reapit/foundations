import * as React from 'react'
import { shallow } from 'enzyme'
import Accounts from '../accounts'

describe('Accounts', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Accounts />)).toMatchSnapshot()
  })
})
