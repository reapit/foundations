import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Profile } from '../profile'

describe('Profile', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Profile />))).toMatchSnapshot()
  })
})
