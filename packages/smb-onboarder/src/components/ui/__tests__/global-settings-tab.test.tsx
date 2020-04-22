import * as React from 'react'
import { mount } from 'enzyme'
import { GlobalSettingsTab, GlobalSettingsTabProps } from '../global-settings-tab'

describe('GlobalSettingsTab', () => {
  describe('GlobalSettingsTab', () => {
    it('should match a snapshot', () => {
      const mockProps: GlobalSettingsTabProps = {}
      const wrapper = mount(<GlobalSettingsTab {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
