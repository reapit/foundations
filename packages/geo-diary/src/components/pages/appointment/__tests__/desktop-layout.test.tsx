import React from 'react'
import { shallow } from 'enzyme'
import { DesktopLayout } from '../desktop-layout'
import { appointment } from '@/graphql/__mocks__/appointment'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Object),
  useLocation: jest.fn(() => locationMock),
}))

describe('mobile-layout', () => {
  describe('DesktopLayout', () => {
    it('should render correctly', () => {
      const mockProps = {
        appointments: [appointment],
        loading: false,
      }
      const wrapper = shallow(<DesktopLayout {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
