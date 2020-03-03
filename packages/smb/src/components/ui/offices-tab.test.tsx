import * as React from 'react'
import { mount } from 'enzyme'
import { OfficesTab, OfficesTabProps } from './offices-tab'

describe('OfficesTab', () => {
  describe('OfficesTab', () => {
    it('should match a snapshot', () => {
      const mockProps: OfficesTabProps = {}
      const wrapper = mount(<OfficesTab {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
