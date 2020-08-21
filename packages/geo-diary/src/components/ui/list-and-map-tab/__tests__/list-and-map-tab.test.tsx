import React from 'react'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { handleChangeTab, generateTabConfig, ListAndMapTab } from '../list-and-map-tab'
import { shallow } from 'enzyme'

describe('list-and-map-tab', () => {
  describe('handleChangeTab', () => {
    it('should run corerctly', () => {
      const mockParams = {
        history: getMockRouterProps({ params: '', search: '' }).history,
        queryParams: {},
        tabName: 'list',
      }
      const fn = handleChangeTab(mockParams)
      fn()
      expect(mockParams.history.push).toBeCalled()
    })
  })

  describe('generateTabConfig', () => {
    it('should run correctly', () => {
      const mockParams = {
        history: getMockRouterProps({ params: '', search: '' }).history,
        queryParams: {},
      }
      const result = generateTabConfig(mockParams)
      expect(result).toHaveLength(2)
    })
  })
  describe('ListAndMapTab', () => {
    it('should match snapshot', () => {
      const mockProps = {
        queryParams: {},
        history: getMockRouterProps({ params: '', search: '' }).history,
      }
      const wrapper = shallow(<ListAndMapTab {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
