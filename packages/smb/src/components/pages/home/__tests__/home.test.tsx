import * as React from 'react'
import { shallow } from 'enzyme'

import Home from '../home'

describe('Home', () => {
  describe('Home', () => {
    it('should match a snapshot', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
