import React from 'react'
import { render } from '../../../tests/react-testing'
import * as Cards from '../card'

describe('Card', () => {
  Object.keys(Cards).forEach((cardKey) => {
    it('should match a snapshot and render children', () => {
      const Component = Cards[cardKey]
      const wrapper = render(
        <Component>
          <div>I am a child</div>
        </Component>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
