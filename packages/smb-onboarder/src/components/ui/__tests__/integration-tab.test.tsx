import * as React from 'react'
import { mount } from 'enzyme'
import { IntegrationsTab, IntegrationsTabProps } from '../integration-tab'

describe('IntegrationsTab', () => {
  describe('IntegrationsTab', () => {
    it('should match a snapshot', () => {
      const mockProps: IntegrationsTabProps = {}
      const wrapper = mount(<IntegrationsTab {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
