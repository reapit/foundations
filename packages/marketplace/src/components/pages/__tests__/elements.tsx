import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Elements from '../elements'

jest.mock('../../../core/store')

describe('Elements', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Elements />))).toMatchSnapshot()
  })
})
