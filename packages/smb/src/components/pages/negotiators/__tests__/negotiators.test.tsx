import * as React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import { Negotiators, NegotiatorsProps } from '../negotiators'

describe('Negotiators', () => {
  describe('Negotiators', () => {
    it('should match a snapshot', () => {
      const mockProps: NegotiatorsProps = {}
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[]} addTypename={true}>
            <Negotiators {...mockProps} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
