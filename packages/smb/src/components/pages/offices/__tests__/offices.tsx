import * as React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { Offices, OfficesProps } from '../offices'

describe('Offices', () => {
  describe('Offices', () => {
    it('should match a snapshot', () => {
      const mockProps: OfficesProps = {}
      const wrapper = mount(
        <MockedProvider mocks={[]} addTypename={true}>
          <Offices {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
