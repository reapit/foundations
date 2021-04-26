import React from 'react'
import { handleChangeTab, ListAndMapTab } from '../list-and-map-tab'
import { shallow } from 'enzyme'
import { AppTab } from '../../../../core/app-state'

describe('list-and-map-tab', () => {
  describe('handleChangeTab', () => {
    it('should run corerctly', () => {
      const mockParams = {
        setAppState: jest.fn(),
        tab: 'LIST' as AppTab,
      }
      const fn = handleChangeTab(mockParams)
      fn()
      // expect(mockParams.history.push).toBeCalled()
    })
  })

  describe('ListAndMapTab', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<ListAndMapTab />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
