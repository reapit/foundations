import * as React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import { Users, UsersProps } from '../users'

describe('Users', () => {
  describe('Users', () => {
    it('should match a snapshot', () => {
      const mockProps: UsersProps = {}
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[]} addTypename={true}>
            <Users {...mockProps} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
