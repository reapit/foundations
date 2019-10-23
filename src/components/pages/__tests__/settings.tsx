import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Settings from '../settings'

jest.mock('../../../core/store')

describe('Settings', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Settings />))).toMatchSnapshot()
  })
})
