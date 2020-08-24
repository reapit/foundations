import React from 'react'
import { shallow } from 'enzyme'
import { MobileLayout } from '../mobile-layout'
import { appointment } from '@/graphql/__mocks__/appointment'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('mobile-layout', () => {
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
