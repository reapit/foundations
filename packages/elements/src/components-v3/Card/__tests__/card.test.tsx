import React from 'react'
import { shallow } from 'enzyme'
import * as Cards from '../card'

describe('Card', () => {
  Object.keys(Cards).forEach((cardKey) => {
    it('should match a snapshot and render children', () => {
      const Component = Cards[cardKey]
      const wrapper = shallow(
        <Component>
          <div>I am a child</div>
        </Component>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
