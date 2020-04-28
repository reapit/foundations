import * as React from 'react'
import { mount } from 'enzyme'
import { AreasTab, AreasTabProps } from '../areas-tab'

describe('AreasTab', () => {
  describe('AreasTab', () => {
    it('should match a snapshot', () => {
      const mockProps: AreasTabProps = {}
      const wrapper = mount(<AreasTab {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
