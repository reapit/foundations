import * as React from 'react'
import { mount } from 'enzyme'
import { Offices, OfficesProps } from './offices'

describe('Offices', () => {
  describe('Offices', () => {
    it('should match a snapshot', () => {
      const mockProps: OfficesProps = {}
      const wrapper = mount(<Offices {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
