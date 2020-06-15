import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperDesktopPage } from '../developer-desktop'

describe('DeveloperDesktopPage', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperDesktopPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
