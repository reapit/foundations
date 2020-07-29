import * as React from 'react'
import { shallow } from 'enzyme'
import { PrivateRouteWrapper } from '../private-route-wrapper'

const locationMock = { pathname: '/test' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

describe('PrivateRouteWrapper', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<PrivateRouteWrapper path="/" />)
    expect(wrapper).toMatchSnapshot()
  })
})
