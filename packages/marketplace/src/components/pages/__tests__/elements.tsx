import * as React from 'react'
import { shallow } from 'enzyme'
import Elements from '../elements'

jest.mock('../../../core/store')

describe('Elements', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Elements />)).toMatchSnapshot()
  })
})
