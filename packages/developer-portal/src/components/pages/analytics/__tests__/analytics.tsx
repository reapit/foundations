import * as React from 'react'
import { shallow } from 'enzyme'

import { AnalyticsTab, handleUseEffectToSetCurrentTab, renderTabContent, tabConfigs } from '../analytics'
import AnalyticsPage from '../analytics'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({ replace: jest.fn() }),
  useParams: () => ({
    activeTab: null,
  }),
}))

describe('AnalyticsPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AnalyticsPage />)).toMatchSnapshot()
  })
  describe('tabConfigs', () => {
    it('should run correctly in all envs', () => {
      const mockCurrentTab = 'detailed'
      const history = {
        push: jest.fn(),
      }
      const result = tabConfigs({ currentTab: mockCurrentTab, history })
      expect(result).toHaveLength(2)
    })
  })
  describe('handleUseEffectToSetCurrentTab', () => {
    it('should run correctly', () => {
      const mockSetCurrentTab = jest.fn()
      const fn1 = handleUseEffectToSetCurrentTab(AnalyticsTab.DETAILED, mockSetCurrentTab)
      fn1()
      expect(mockSetCurrentTab).toBeCalledWith(AnalyticsTab.DETAILED)

      const fn2 = handleUseEffectToSetCurrentTab(AnalyticsTab.COST_EXPLORER, mockSetCurrentTab)
      fn2()
      expect(mockSetCurrentTab).toBeCalledWith(AnalyticsTab.COST_EXPLORER)

      const fn3 = handleUseEffectToSetCurrentTab(null, mockSetCurrentTab)
      fn3()
      expect(mockSetCurrentTab).toBeCalledWith(AnalyticsTab.DETAILED)

      const fn4 = handleUseEffectToSetCurrentTab(undefined, mockSetCurrentTab)
      fn4()
      expect(mockSetCurrentTab).toBeCalledWith(AnalyticsTab.DETAILED)
    })
  })
  describe('renderTabContent', () => {
    it('should render Detailed Tab', () => {
      const result = renderTabContent(AnalyticsTab.DETAILED)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render Billing Tab', () => {
      const result = renderTabContent(AnalyticsTab.COST_EXPLORER)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
