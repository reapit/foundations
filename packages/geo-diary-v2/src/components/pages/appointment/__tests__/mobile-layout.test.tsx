import React from 'react'
import { shallow } from 'enzyme'
import { handleChangeTab, generateTabConfig, MobileLayout } from '../mobile-layout'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { appointment } from '@/graphql/__mocks__/appointment'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('mobile-layout', () => {
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

  describe('MobileLayout', () => {
    it('should render correctly', () => {
      const mockProps = {
        appointments: [appointment],
      }
      const wrapper = shallow(<MobileLayout {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
